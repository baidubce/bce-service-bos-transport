/**
 * 文件下载模块
 *
 * @file src/uploader/Transport.js
 * @author mudio(job.zhanghao@gmail.com)
 */

import fs from 'fs';
import path from 'path';
import debounce from 'lodash.debounce';
import {MimeType} from 'bce-sdk-js';
import {CONTENT_LENGTH, CONTENT_TYPE} from 'bce-sdk-js/src/headers';

import Transport from './transport';
import {TransportOrigin, Meta, TransportStatus} from '../headers';

export default class SingleTransport extends Transport {
    constructor(...args) {
        super(...args);

        this._timeout = 10e3;
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
        const {size} = fs.statSync(this._localPath);
        const md5sum = await this._computedFileMD5();

        /**
         * 设置`Content-Length`
         */
        options[CONTENT_LENGTH] = size;
        options[CONTENT_TYPE] = MimeType.guess(path.extname(this._localPath));
        options[Meta.xMetaFrom] = TransportOrigin;
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
     * 恢复暂停后的下载任务
     *
     * @memberof Transport
     */
    async start() {
        /**
         * 重置状态
         */
        this._state = TransportStatus.Running;

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
}
