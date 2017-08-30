/**
 * 文件下载模块
 *
 * @file src/downloader/Transport.js
 * @author 523317421@qq.com
 */

import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import util from 'util';
import mkdirp from 'mkdirp';
import {EventEmitter} from 'events';
import {BosClient} from 'bce-sdk-js';

export default class Transport extends EventEmitter {
    constructor(config) {
        super();

        const {uuid, bucketName, objectKey, localPath, totalSize, credentials} = config;

        this._uuid = uuid;
        this._objectKey = objectKey;
        this._localPath = localPath;
        this._bucketName = bucketName;
        this._totalSize = totalSize;
        this._client = new BosClient(credentials);

        this._timeout = 10e3; // 10s
    }

    /**
     * 重新下载文件
     *
     * @memberof Transport
     */
    start(range) {
        /**
         * 重置状态
         */
        this._paused = false;

        /**
         * 目录不存在则创建
         */
        const isExist = fs.existsSync(this._localPath);
        if (!isExist) {
            mkdirp.sync(path.dirname(this._localPath));
        }

        /**
         * 如果指定了范围，那么使用文件追加
         */
        this._outputStream = fs.createWriteStream(this._localPath, {flags: range ? 'a' : 'w'});
        const outputStream = this._outputStream;

        /**
         * 保证`WriteStream`一定可以被close掉
         */
        const _checkAlive = _.debounce(() => outputStream.end(), this._timeout);

        /**
         * 通知节流
         */
        const _notifyRate = _.throttle(
            rate => this.emit('rate', {uuid: this._uuid, objectKey: this._objectKey, rate}),
            500,
        );

        /**
         * 统计速率、检查是否沦为僵尸
         */
        const startDate = Date.now();
        outputStream.on('drain', () => {
            const rangeTime = Date.now() - startDate;
            const rate = outputStream.bytesWritten / rangeTime; // kb/s

            _notifyRate(rate);

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
                Range: range ? util.format('bytes=%s', range) : '',
            },
        }).then(
            () => {
                if (this._paused) {
                    return this.emit('pause', {uuid: this._uuid});
                }

                this.emit('finish', {uuid: this._uuid, objectKey: this._objectKey});
            },
            (err) => {
                /**
                 * 暂停后，有可能报错`wirte after end`
                 */
                if (this._paused) {
                    return this.emit('pause', {uuid: this._uuid});
                }

                this.emit('error', {uuid: this._uuid, error: err});
            },
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
    resume() {
        /**
         * 文件不存在则重新开始
         */
        const isExist = fs.existsSync(this._localPath);
        if (!isExist) {
            this.start();
        } else {
            const size = fs.statSync(this._localPath).size;
            this.start(`${size}-${this._totalSize}`);
        }
    }

    isPaused() {
        return !!this._paused;
    }
}
