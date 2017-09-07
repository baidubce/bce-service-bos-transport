/**
 * 文件下载模块
 *
 * @file src/uploader/dispatcher.js
 * @author mudio(job.zhanghao@gmail.com)
 */

import fs from 'fs';
import queue from 'async/queue';
import isFunction from 'lodash.isfunction';

import {debug} from '../logger';
import Transport from './transport';
import MultiTransport from './multi_transport';

import {
    NotifyStart, NotifyPaused,
    NotifyFinished, NotifyError, NotifyProgress,
} from './command';

export default class Dispatcher {
    constructor(credentials) {
        this._credentials = credentials;
        this._transportCache = {};
        // 运行队列
        this._queue = queue((...args) => this._invoke(...args), 5);
    }

    /**
     * 属性检查
     *
     *  - uuid
     *  - bucketName
     *  - objectKey
     *  - localPath
     *  - uploadId (option)
     *
     * @param {Object} [command={}]
     * @memberof Dispatcher
     */
    _checkProps(command = {}) {
        if (process.env.DEBUG) {
            const {uuid, bucketName, objectKey, localPath} = command;

            if (!uuid) {
                throw new TypeError('`uuid` should not be empty');
            }
            if (!bucketName) {
                throw new TypeError('`bucketName` should not be empty');
            }
            if (!objectKey) {
                throw new TypeError('`objectKey` should not be empty');
            }
            if (!localPath) {
                throw new TypeError('`localPath` should not be empty');
            }
        }
    }

    _invoke(transport, done) {
        transport.on('start', msg => this._send(NotifyStart, msg));

        transport.on('pause', (msg) => {
            this._send(NotifyPaused, msg);
            done();
        });

        transport.on('progress', msg => this._send(NotifyProgress, msg));

        transport.on('finish', (msg) => {
            this._send(NotifyFinished, msg);
            // 如果已经完成的任务，则清理掉资源
            delete this._transportCache[msg.uuid];
            done();
        });

        transport.on('error', (msg) => {
            this._send(NotifyError, msg);
            done();
        });

        transport.start();
    }

    _send(command, message = {}) {
        process.send({category: 'cmd', message: Object.assign({command}, message)});
    }

    dispatch({category, config, endpoint}) {
        this._checkProps(config);

        if (isFunction(this[category])) {
            this[category](config, endpoint);
        }

        debug(`invoke ${category}, config = ${JSON.stringify(config)}`);
    }

    addItem(config = {}, endpoint) {
        const {uuid, localPath} = config;

        if (!uuid) {
            return;
        }

        const fileSize = fs.statSync(localPath).size;
        if (!this._transportCache[uuid]) {
            // 文件大于20mb则分片上传
            const _ClassType = fileSize > 20 * 1024 * 1024 ? MultiTransport : Transport;

            this._transportCache[uuid] = new _ClassType(
                {endpoint, credentials: this._credentials},
                config,
            );
        }

        this.resumeItem({uuid});
    }

    pauseItem({uuid}) {
        if (uuid in this._transportCache) {
            this._transportCache[uuid].pause();
        } else {
            this._send(NotifyPaused, {uuid});
        }
    }

    resumeItem({uuid}) {
        if (uuid in this._transportCache) {
            if (this._transportCache[uuid].isPaused()) {
                this._queue.unshift(this._transportCache[uuid]);
            }
        }
    }
}
