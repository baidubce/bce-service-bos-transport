/**
 * 文件下载模块
 *
 * @file src/uploader/Transport.js
 * @author mudio(job.zhanghao@gmail.com)
 */

import fs from 'fs';
import path from 'path';
import {EventEmitter} from 'events';
import debounce from 'lodash.debounce';
import crypto from 'bce-sdk-js/src/crypto';
import {BosClient, MimeType} from 'bce-sdk-js';
import {CONTENT_LENGTH, CONTENT_TYPE} from 'bce-sdk-js/src/headers';

import '../fake_client';
import {TransportOrigin, Meta} from '../headers';

export default class Transport extends EventEmitter {
    constructor(credentials, config) {
        super();

        const {uuid, bucketName, objectKey, localPath} = config;

        this._uuid = uuid;
        this._objectKey = objectKey;
        this._localPath = localPath;
        this._bucketName = bucketName;
        this._client = new BosClient(credentials);

        this._timeout = 10e3; // 10s
        this._paused = true;
    }

    /**
     * 检查任务是否完成
     *
     * @returns
     * @memberof Transport
     */
    _checkFinish() {
        if (this._paused) {
            return this.emit('pause', {uuid: this._uuid});
        }

        this._paused = true;

        this.emit('finish', {uuid: this._uuid, localPath: this._localPath});
    }

    /**
     * 处理错误
     *
     * @param {Error} err
     * @returns
     * @memberof Transport
     */
    _checkError(err) {
        if (this._paused) {
            return this.emit('pause', {uuid: this._uuid});
        }

        this._paused = true;

        if (typeof err === 'string') {
            this.emit('error', {uuid: this._uuid, error: err});
        } else if (err instanceof Error || typeof err.message === 'string') {
            this.emit('error', {uuid: this._uuid, error: err.message});
        } else if ('status_code' in err) {
            this.emit('error', {uuid: this._uuid, error: `Server code = ${err.status_code}`});
        } else {
            this.emit('error', {uuid: this._uuid, error: '未知错误'});
        }
    }

    async _computedFileMD5() {
        const {size} = fs.statSync(this._localPath);

        // 如果文件小于4G,则算下md5
        if (!this._md5sum && !size < 4 * 1024 * 1024 * 1024) {
            const fp = fs.createReadStream(this._localPath);
            this._md5sum = await crypto.md5stream(fp);
        }

        return this._md5sum;
    }

    /**
     * 检查文件一致性
     *
     * 1. 非客户端上传的文件只检查文件大小
     * 2. 客户端上传的文件优先检查`MD5`
     * 3. 大文件考虑到计算性能的问题，只检查`mtime`
     *
     * @returns {boolean}
     * @memberof Transport
     */
    async _checkConsistency() {
        let _meta = null;
        const {mtime, size} = fs.statSync(this._localPath);

        try {
            _meta = await this._fetchMetadata();
        } catch (ex) {
            if (ex.status_code === 404) {
                return false;
            }

            throw ex;
        }

        const {xMetaSize, xMetaFrom, xMetaModifiedTime, xMetaMD5} = _meta;

        if (size === xMetaSize) {
            if (xMetaFrom === TransportOrigin) {
                if (xMetaMD5) {
                    const md5sum = await this._computedFileMD5();
                    // 如果MD5存在则验证MD5
                    if (xMetaMD5 !== md5sum) {
                        return false;
                    }
                }
                // 如果MD5不存在，则验证`mtimeMs`
                if (!xMetaMD5 && mtime.getTime() !== xMetaModifiedTime) {
                    return false;
                }
            }
            return true;
        }

        return false;
    }

    /**
     * 获取Meta数据
     *
     * @param {string} bucketName
     * @param {string} key
     * @returns {Promise}
     * @memberof MultiTransport
     */
    _fetchMetadata() {
        return this._client.getObjectMetadata(this._bucketName, this._objectKey).then((res) => {
            const xMetaSize = +res.http_headers['content-length'];
            const xMetaMD5 = res.http_headers[Meta.xMetaMD5];
            const xMetaFrom = res.http_headers[Meta.xMetaFrom];
            const xMetaModifiedTime = +res.http_headers[Meta.xMetaMTime];

            return {xMetaSize, xMetaFrom, xMetaModifiedTime, xMetaMD5};
        });
    }

    _onTimeout() {
        if (this._stream) {
            this._stream.emit('abort');
        }
    }

    /**
     * 重新下载文件
     *
     * @memberof Transport
     */
    async resume() {
        const options = {};

        /**
         * 读取文件大小
         */
        const {mtime, size} = fs.statSync(this._localPath);
        const md5sum = await this._computedFileMD5();

        /**
         * 设置`Content-Length`
         */
        options[CONTENT_LENGTH] = size;
        options[CONTENT_TYPE] = MimeType.guess(path.extname(this._localPath));
        options[Meta.xMetaFrom] = TransportOrigin;
        options[Meta.xMetaMTime] = mtime.getTime();
        options[Meta.xMetaMD5] = md5sum;

        /**
         * 读取流
         */
        this._stream = fs.createReadStream(this._localPath);

        /**
         * 检查超时
         */
        const _checkAlive = debounce(() => this._onTimeout(), this._timeout);

        /**
         * 通知进度
         */
        this._stream.on('progress', ({rate, bytesWritten}) => {
            _checkAlive();

            this.emit('progress', {rate, bytesWritten, uuid: this._uuid});
        });

        return this._client.putObject(this._bucketName, this._objectKey, this._stream, options);
    }

    /**
     * 暂停下载，必须使用`resume`恢复
     *
     * @memberof Transport
     */
    pause() {
        this._paused = true;

        if (this._stream) {
            this._stream.emit('abort');
        } else {
            this.emit('pause', {uuid: this._uuid});
        }
    }

    /**
     * 恢复暂停后的下载任务
     *
     * @memberof Transport
     */
    async start() {
        /**
         * 重置状态
         */
        this._paused = false;

        /**
         * 文件不存在还玩个蛋
         */
        const isExist = fs.existsSync(this._localPath);
        if (!isExist) {
            return this._checkError(new Error(`file not found ${this.localPath}`));
        }

        try {
            // 先检查如果文件已经在bos上了，则忽略
            if (await this._checkConsistency()) {
                return this._checkFinish();
            }

            this.emit('start', {uuid: this._uuid});

            await this.resume();

            this._checkFinish();
        } catch (ex) {
            this._checkError(ex);
        }
    }

    isPaused() {
        return this._paused;
    }
}
