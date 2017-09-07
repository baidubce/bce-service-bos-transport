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
import {BosClient, MimeType} from 'bce-sdk-js';
import {CONTENT_LENGTH, CONTENT_TYPE} from 'bce-sdk-js/src/headers';

import '../fake_client';

export default class Transport extends EventEmitter {
    constructor(config) {
        super();

        const {uuid, bucketName, objectKey, localPath, credentials} = config;

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

        this.emit('error', {uuid: this._uuid, error: err.message});
    }

    /**
     * 重新下载文件
     *
     * @memberof Transport
     */
    resume() {
        const options = {};

        /**
         * 读取文件大小
         */
        const contentLength = fs.statSync(this._localPath).size;

        /**
         * 设置`Content-Length`
         */
        options[CONTENT_LENGTH] = contentLength;
        options[CONTENT_TYPE] = MimeType.guess(path.extname(this._localPath));

        /**
         * 读取流
         */
        this._stream = fs.createReadStream(this._localPath, {
            start: 0,
            end: Math.max(0, contentLength - 1),
        });

        /**
         * 检查超时
         */
        const _checkAlive = debounce(() => this.pause(), this._timeout);

        /**
         * 通知进度
         */
        this._stream.on('progress', ({rate, bytesWritten}) => {
            _checkAlive();

            this.emit('progress', {rate, bytesWritten, uuid: this._uuid});
        });

        return this._client.putObject(this._bucketName, this._objectKey, this._stream, options).then(
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
    start() {
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
            this.emit('start', {uuid: this._uuid});
            this.resume();
        } catch (ex) {
            this._checkError(ex);
        }
    }

    isPaused() {
        return this._paused;
    }
}
