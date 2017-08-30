/**
 * 文件下载模块
 *
 * @file src/downloader/Transport.js
 * @author 523317421@qq.com
 */

import _ from 'lodash';
import Dispatcher from './dispatcher';

// 不能作为独立进程运行
if (!_.isFunction(process.send)) {
    process.exit(0);
} else {
    process.send('start downloader transport');
}

const ak = process.env.BCE_AK || 'fdd8f61810764eed9bcd6cc1e2296006';
const sk = process.env.BCE_SK || '479e1f33e5514dd3981fedb8ee9f67e4';
const endpoint = process.env.BCE_BOS_ENDPOINT || 'http://bos.qasandbox.bcetest.baidu.com';

const _dispatcher = new Dispatcher({endpoint, credentials: {ak, sk}});

process.on('message', msg => _dispatcher.dispatch(msg));
