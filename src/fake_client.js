/**
 * BosClient
 *
 * @file src/bos_client.js
 * @author mudio(job.zhanghao@gmail.com)
 */

import stream from 'stream';
import {HttpClient} from 'bce-sdk-js';
import throttle from 'lodash.throttle';

HttpClient.prototype._sendRequest = (req, readStream = '') => {
    if (!readStream) {
        return req.end();
    }

    if (Buffer.isBuffer(readStream) || typeof readStream === 'string') {
        req.write(readStream);
        req.end();
    } else if (readStream instanceof stream.Readable) {
        if (!readStream.readable) {
            throw new Error('stream is not readable');
        }

        /**
         * 通知节流
         */
        const _notifyProgress = throttle(msg => readStream.emit('progress', msg), 500);

        const startDate = Date.now();
        readStream.on('data', (chunk) => {
            const flushed = req.write(chunk);

            if (!flushed) {
                readStream.pause();

                req.once('drain', () => {
                    const bytesWritten = req.socket.bytesWritten;
                    const rangeTime = Date.now() - startDate;
                    const rate = bytesWritten / rangeTime; // kb/s

                    _notifyProgress({rate, bytesWritten});

                    readStream.resume();
                });
            }
        });

        /**
         * 提供取消上传的功能
         */
        readStream.on('abort', () => req.abort());
        readStream.on('end', () => req.end());
    } else {
        throw new Error(`Invalid body type = ${typeof readStream}`);
    }
};
