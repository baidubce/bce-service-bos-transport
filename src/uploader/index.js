/**
 * 上传入口
 *
 * @file src/uploader/index.js
 * @author mudio(job.zhanghao@gmail.com)
 */

import isFunction from 'lodash.isfunction';

import Dispatcher from './dispatcher';
import {info, error} from '../logger';

// 不能作为独立进程运行
if (!isFunction(process.send)) {
    process.exit();
} else {
    info(`start uploader transport pid = ${process.pid}`);
}

const {BCE_AK, BCE_SK} = process.env;

if (!BCE_AK || !BCE_SK) {
    error('Not found `BCE_AK`,`BCE_SK` env.');
    process.exit();
}

const _dispatcher = new Dispatcher({
    ak: BCE_AK, sk: BCE_SK,
});

process.on('message', msg => _dispatcher.dispatch(msg));
