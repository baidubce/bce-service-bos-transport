/**
 * azeroth - 日志记录器
 *
 * @file logger.js
 * @author mudio(job.zhanghao@gmail.com)
 */

function logger(type, message, ...args) {
    process.send({category: 'log', message: {type, message, pid: process.pid}}, ...args);
}

export const info = (msg, ...args) => logger('info', msg, ...args);
export const warn = (msg, ...args) => logger('warn', msg, ...args);
export const debug = (msg, ...args) => logger('debug', msg, ...args);
export const error = (msg, ...args) => logger('error', msg, ...args);

