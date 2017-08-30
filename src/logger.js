/**
 * azeroth - 日志记录器
 *
 * @file logger.js
 * @author mudio(job.zhanghao@gmail.com)
 */

function logger(type, message) {
    process.send({category: 'log', message: {type, message}});
}

export const debug = msg => logger('debug', msg);
export const info = msg => logger('info', msg);
export const warn = msg => logger('warn', msg);
export const error = msg => logger('error', msg);

