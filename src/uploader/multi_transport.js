/**
 * 文件下载模块
 *
 * @file src/uploader/Transport.js
 * @author mudio(job.zhanghao@gmail.com)
 */

import fs from 'fs';
import queue from 'async/queue';
import {EventEmitter} from 'events';
import debounce from 'lodash.debounce';
import {BosClient} from 'bce-sdk-js';
import {CONTENT_LENGTH, CONTENT_TYPE} from 'bce-sdk-js/src/headers';

import '../fake_client';

const kPartSize = 20 * 1024 * 1024;

export default class MultiTransport extends EventEmitter {
    constructor(credentials, config) {
        super();

        const {uuid, bucketName, objectKey, localPath, uploadId} = config;

        this._uuid = uuid;
        this._uploadId = uploadId;
        this._objectKey = objectKey;
        this._localPath = localPath;
        this._bucketName = bucketName;
        this._client = new BosClient(credentials);

        this._paused = true;
        this._queue = null;
    }

    /**
     * 获取uploadId
     *
     * @returns
     * @memberof MultiTransport
     */
    _initUploadId() {
        return this._client.initiateMultipartUpload(this._bucketName, this._objectKey)
            .then(res => res.body);
    }

    /**
     * 根据`UploadId`获取已上传`Parts`
     *
     * @returns {Promise}
     * @memberof MultiTransport
     */
    _fetchParts() {
        return this._client.listParts(this._bucketName, this._objectKey, this._uploadId)
            .then(res => res.body);
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

    // 最多分片1000片，除了最后一片其他片大小相等且大于等于UploadConfig.PartSize
    _decompose(orderedParts, maxParts, uploadSize, totalSize) {
        const minPartSize = Math.ceil(totalSize / (maxParts - orderedParts.length));
        const averagePartSize = Math.max(kPartSize, minPartSize);

        // 余下分片
        const remainParts = [];

        let leftSize = totalSize - uploadSize;
        let offset = uploadSize;
        let partNumber = orderedParts.length + 1;

        while (leftSize > 0) {
            const partSize = Math.min(leftSize, averagePartSize);

            remainParts.push({partNumber, partSize, start: offset});

            leftSize -= partSize;
            offset += partSize;
            partNumber += 1;
        }

        return remainParts;
    }

    _checkAlive = debounce(() => this._stream.emit('abort'), 10e3);

    _invoke({partNumber, partSize, start}, done) {
        /**
         * 读取流
         */
        this._stream = fs.createReadStream(this._localPath, {
            start,
            end: start + partSize - 1, // eslint-disable-line no-mixed-operators
        });

        /**
         * 通知进度
         */
        this._stream.on('progress', ({rate, bytesWritten}) => {
            this._checkAlive();

            this.emit('progress', {rate, bytesWritten: this._uploadedSize + bytesWritten, uuid: this._uuid});
        });

        const headers = {};
        headers[CONTENT_LENGTH] = partSize;
        headers[CONTENT_TYPE] = 'application/octet-stream';
        const options = this._client._checkOptions(headers);

        return this._client.sendRequest('PUT', {
            bucketName: this._bucketName,
            key: this._objectKey,
            body: this._stream,
            headers: options.headers,
            params: {partNumber, uploadId: this._uploadId},
            config: options.config,
        }).then(
            () => {
                this._uploadedSize += partSize;
                done();
            },
            err => done(err),
        );
    }

    _completeUpload({size}) {
        return this._fetchParts().then(({parts}) => {
            const totalSize = parts.reduce((pre, cur) => pre + cur.size, 0);

            if (size !== totalSize) {
                return Promise.reject(new Error('文件签名不一致'));
            }

            return this._client.completeMultipartUpload(
                this._bucketName, this._objectKey, this._uploadId, parts,
            );
        });
    }

    /**
     * 重新下载文件
     *
     * @memberof Transport
     */
    resume(remainParts = []) {
        return new Promise((resolve, reject) => {
            this._queue = queue((...args) => this._invoke(...args), 1);

            this._queue.error = (err) => {
                this._queue.kill();
                reject(err);
            };

            this._queue.drain = () => resolve();

            this._queue.push(remainParts);
        });
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
            const totalSize = fs.statSync(this._localPath).size;
            // 如果文件大于阈值并且没有uploadId，则获取一次
            if (!this._uploadId) {
                const {uploadId} = await this._initUploadId();
                this._uploadId = uploadId;
            }
            // 获取已上传到分片
            const {parts, maxParts} = await this._fetchParts();
            // 重新分片
            const orderedParts = parts.sort((lhs, rhs) => lhs.partNumber - rhs.partNumber);
            this._uploadedSize = parts.reduce((pre, cur) => pre + cur.size, 0);
            const remainParts = this._decompose(orderedParts, maxParts, this._uploadedSize, totalSize);
            // 上传遗留的分片
            if (remainParts.length > 0) {
                this.emit('start', {
                    uuid: this._uuid,
                    uploadId: this._uploadId,
                    localPath: this._localPath,
                });
                await this.resume(remainParts);
            }
            // 完成任务,用文件大小来效验文件一致性
            await this._completeUpload({size: totalSize});
            // 检查任务完成状态
            this._checkFinish();
        } catch (ex) {
            this._checkError(ex);
        }
    }

    isPaused() {
        return this._paused;
    }
}
