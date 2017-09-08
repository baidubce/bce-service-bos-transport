/**
 * 文件下载模块
 *
 * @file src/downloader/Transport.js
 * @author mudio(job.zhanghao@gmail.com)
 */

import fs from 'fs';
import path from 'path';
import util from 'util';
import mkdirp from 'mkdirp';
import {EventEmitter} from 'events';
import {BosClient} from 'bce-sdk-js';
import debounce from 'lodash.debounce';
import throttle from 'lodash.throttle';

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
     * 获取Meta数据
     *
     * @param {string} bucketName
     * @param {string} key
     * @returns {Promise}
     * @memberof Transport
     */
    _fetchMetadata(bucketName, key) {
        return this._client.getObjectMetadata(bucketName, key);
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

        this.emit('finish', {uuid: this._uuid, objectKey: this._objectKey});
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

    _onTimeout() {
        if (this._outputStream) {
            this._outputStream.emit('error', new Error('网络连接超时'));
            this._outputStream.end();
        }
    }

    /**
     * 重新下载文件
     *
     * @memberof Transport
     */
    resume(begin = 0, end = 0) {
        /**
         * 如果指定了范围，那么使用文件追加
         */
        this._outputStream = fs.createWriteStream(this._localPath, {flags: begin ? 'a' : 'w'});
        const outputStream = this._outputStream;

        /**
         * 保证`WriteStream`一定可以被close掉
         */
        const _checkAlive = debounce(() => this._onTimeout(), this._timeout);

        /**
         * 通知节流
         */
        const _notifyProgress = throttle(
            (rate, bytesWritten) => this.emit('rate', {
                uuid: this._uuid,
                objectKey: this._objectKey,
                rate,
                bytesWritten,
            }),
            500,
        );

        /**
         * 统计速率、检查是否沦为僵尸
         */
        const startDate = Date.now();
        outputStream.on('drain', () => {
            const rangeTime = Date.now() - startDate;
            const rate = outputStream.bytesWritten / rangeTime; // kb/s

            _notifyProgress(rate, outputStream.bytesWritten + begin);

            _checkAlive();
        });

        /**
         * Promise的状态不可预期
         */
        this._client.sendRequest('GET', {
            bucketName: this._bucketName,
            key: this._objectKey,
            outputStream,
            headers: {
                Range: begin ? util.format('bytes=%s-%s', begin, end) : '',
            },
        }).then(
            () => this._checkFinish(),
            err => this._checkError(err),
        );
    }

    /**
     * 暂停下载，必须使用`resume`恢复
     *
     * @memberof Transport
     */
    pause() {
        this._paused = true;

        if (this._outputStream) {
            this._outputStream.end();
        } else {
            this.emit('pause', {uuid: this._uuid});
        }
    }

    /**
     * 恢复暂停后的下载任务
     *
     * @memberof Transport
     */
    start() {
        /**
         * 重置状态
         */
        this._paused = false;

        /**
         * 文件不存在则重新开始
         */
        const isExist = fs.existsSync(this._localPath);
        if (!isExist) {
            /**
             * 目录不存在则创建
             */
            try {
                mkdirp.sync(path.dirname(this._localPath));
                this.resume();
            } catch (ex) {
                this._checkError(ex);
            }
            return;
        }

        /**
         * 没有办法比对本地与BOS上文件是否一致，只能检查文件大小了
         */
        const begin = fs.statSync(this._localPath).size;
        this._fetchMetadata(this._bucketName, this._objectKey).then(
            ({http_headers}) => {
                const totalSize = http_headers['content-length'];

                if (begin > totalSize) {
                    /**
                     * 文件不一致，重新下载
                     */
                    return this.resume();
                } else if (begin < totalSize) {
                    /**
                     * 文件续传
                     */
                    return this.resume(begin, totalSize);
                }

                /**
                 * 大小一致，认为完成了
                 */
                return this._checkFinish();
            },
            err => this._checkError(err),
        );
    }

    isPaused() {
        return this._paused;
    }
}
