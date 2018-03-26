/**
 * Transport 基类
 *
 * @file src/uploader/Transport.js
 * @author mudio(job.zhanghao@gmail.com)
 */

import fs from 'fs';
import {EventEmitter} from 'events';
import {BosClient} from 'bce-sdk-js';
import crypto from 'bce-sdk-js/src/crypto';

import '../fake_client';
import {TransportOrigin, Meta, TransportStatus} from '../headers';

export default class Transport extends EventEmitter {
    constructor(credentials, config) {
        super();

        const {uuid, bucketName, objectKey, localPath, uploadId} = config;

        this._uuid = uuid;
        this._uploadId = uploadId;
        this._objectKey = objectKey;
        this._localPath = localPath;
        this._bucketName = bucketName;
        this._client = new BosClient(credentials);

        this._state = TransportStatus.UnStarted;
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
     * 完成上传，设置Meta
     *
     * @memberof Transport
     */
    async _completeUpload() {
        const {parts} = await this._fetchParts();
        // 排下序
        const orderedPartList = parts.sort((lhs, rhs) => lhs.partNumber - rhs.partNumber);
        const md5sum = await this._computedFileMD5();

        await this._client.completeMultipartUpload(
            this._bucketName, this._objectKey, this._uploadId, orderedPartList,
            {
                [Meta.xMetaFrom]: TransportOrigin,
                [Meta.xMetaMD5]: md5sum,
            },
        );
    }

    /**
     * 检查任务是否完成
     *
     * @returns
     * @memberof Transport
     */
    _checkFinish() {
        if (!this.isRunning()) {
            return;
        }

        this._state = TransportStatus.Finished;

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
        if (!this.isRunning()) {
            return;
        }

        this._state = TransportStatus.Error;

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

        const {xMetaSize, xMetaOrigin, xMetaModifiedTime, xMetaMD5} = _meta;
        /**
         * 如果源来自client且拥有md5，则检查md5
         */
        if (xMetaOrigin === TransportOrigin && xMetaMD5) {
            const md5sum = await this._computedFileMD5();
            // 如果MD5存在则验证MD5
            if (xMetaMD5 !== md5sum) {
                return false;
            }
            return true;
        }

        /**
         * 标准检查逻辑，文件大小相等且文件修改时间小于bos文件修改时间
         */
        if (size === xMetaSize && mtime.getTime() < xMetaModifiedTime) {
            return true;
        }

        return false;
    }

    /**
     * 获取Meta数据
     *
     * @returns {Promise}
     * @memberof MultiTransport
     */
    _fetchMetadata() {
        return this._client.getObjectMetadata(this._bucketName, this._objectKey).then((res) => {
            const xMetaSize = +res.http_headers['content-length'];
            const lastModified = new Date(res.http_headers['last-modified']);
            const xMetaMD5 = res.http_headers[Meta.xMetaMD5];
            const xMetaOrigin = res.http_headers[Meta.xMetaOrigin];

            const xMetaModifiedTime = lastModified.getTime();

            return {xMetaSize, xMetaOrigin, xMetaModifiedTime, xMetaMD5};
        });
    }

    /**
     * 暂停上传
     *
     * @memberof Transport
     */
    pause() {
        this._state = TransportStatus.Paused;

        if (this._stream) {
            this._stream.emit('abort');
        } else {
            this.emit('pause', {uuid: this._uuid});
        }
    }

    isRunning() {
        return this._state === TransportStatus.Running;
    }

    isUnStarted() {
        return this._state === TransportStatus.UnStarted;
    }
}
