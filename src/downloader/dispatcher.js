/**
 * 文件下载模块
 *
 * @file src/downloader/dispatcher.js
 * @author mudio(job.zhanghao@gmail.com)
 */

import path from 'path';
import queue from 'async/queue';
import isFunction from 'lodash.isfunction';

import {debug} from '../logger';
import Transport from './transport';
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

    _invoke(transport, done) {
        transport.on('rate', msg => this._send(NotifyProgress, msg));

        transport.on('pause', (msg) => {
            this._send(NotifyPaused, msg);
            done();
        });
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

        this._send(NotifyStart, {uuid: transport._uuid});

        transport.start();
    }

    _send(command, message = {}) {
        process.send({category: 'cmd', message: Object.assign({command}, message)});

        debug(`invoke ${command}, config = ${JSON.stringify(message)}`);
    }

    dispatch({category, config, endpoint}) {
        if (isFunction(this[category])) {
            this[category](config, endpoint);
        }

        debug(`invoke ${category}, config = ${JSON.stringify(config)}`);
    }

    addItem(config = {}, endpoint) {
        const uuid = config.uuid;

        if (uuid) {
            if (!this._transportCache[uuid]) {
                this._transportCache[uuid] = new Transport(
                    {endpoint, credentials: this._credentials},
                    config,
                );
            }

            this.resumeItem({uuid});
        }
    }

    addPatch({uuid, bucketName, prefix, objectKeys = [], localPath, totalSize}) {
        objectKeys.forEach(item => this.addItem({
            uuid,
            bucketName,
            totalSize,
            objectKey: path.posix.join(prefix, item),
            localPath: path.join(localPath, item),
        }));
    }

    pauseItem({uuid}) {
        if (uuid in this._transportCache) {
            this._transportCache[uuid].pause();
        } else {
            this._send(NotifyPaused, {uuid});
        }
    }

    pauseAll() {
        this._queue.remove((item) => {
            item.data.pause();
            return true;
        });
    }

    resumeItem({uuid}) {
        if (uuid in this._transportCache) {
            if (this._transportCache[uuid].isPaused()) {
                this._queue.unshift(this._transportCache[uuid]);
            }
        }
    }
}
