/**
 * 文件下载模块
 *
 * @file src/downloader/Transport.js
 * @author 523317421@qq.com
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
        this._paused = true;
    }

    /**
     * 重新下载文件
     *
     * @memberof Transport
     */
    start(start = 0) {
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
        this._outputStream = fs.createWriteStream(this._localPath, {flags: start ? 'a' : 'w'});
        const outputStream = this._outputStream;

        /**
         * 保证`WriteStream`一定可以被close掉
         */
        const _checkAlive = debounce(() => this.pause(), this._timeout);

        /**
         * 通知节流
         */
        const _notifyRate = throttle(
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

            _notifyRate(rate, outputStream.bytesWritten + start);

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
                Range: start ? util.format('bytes=%s-%s', start, this._totalSize) : '',
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
            /**
             * 没有办法比对本地与BOS上文件是否一致，只能检查文件大小了
             */
            const size = fs.statSync(this._localPath).size;

            if (size > this._totalSize) {
                /**
                 * 文件不一致，重新下载
                 */
                this.start();
            } else if (size < this._totalSize) {
                /**
                 * 文件续传
                 */
                this.start(size);
            } else {
                /**
                 * 大小一致，认为完成了
                 */
                this.emit('finish', {uuid: this._uuid, objectKey: this._objectKey});
            }
        }
    }

    isPaused() {
        return this._paused;
    }
}
