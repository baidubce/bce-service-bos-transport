/**
 * 文件下载模块
 *
 * @file src/downloader/Transport.js
 * @author 523317421@qq.com
 */

import isFunction from 'lodash.isfunction';

import Dispatcher from './dispatcher';
import {info, error} from '../logger';

// 不能作为独立进程运行
if (!isFunction(process.send)) {
    process.exit();
} else {
    info(`start downloader transport pid = ${process.pid}`);
}

const {BCE_AK, BCE_SK, BCE_BOS_ENDPOINT} = process.env;

if (!BCE_AK || !BCE_SK || !BCE_BOS_ENDPOINT) {
    error('Not found `BCE_AK`,`BCE_SK`, `BCE_BOS_ENDPOINT` env.');
    process.exit();
}

const _dispatcher = new Dispatcher({
    endpoint: BCE_BOS_ENDPOINT,
    credentials: {ak: BCE_AK, sk: BCE_SK},
});

process.on('message', msg => _dispatcher.dispatch(msg));
