

import MultiTransport from '../src/uploader/multi_transport';

const _transport = new MultiTransport({
    uuid: 'test_uuid',
    bucketName: 'bce-bos-client',
    objectKey: 'v0.3.0-beta/bce-client-0.3.0-beta-nsis.exe',
    localPath: '/Users/mudio/Desktop/v0.3.0-beta/bce-client-0.3.0-beta-nsis.exe',
    credentials: {
        endpoint: 'http://bos.qasandbox.bcetest.baidu.com',
        credentials: {
            ak: 'fdd8f61810764eed9bcd6cc1e2296006',
            sk: '479e1f33e5514dd3981fedb8ee9f67e4',
        },
    },
});

_transport.on('start', msg => console.log(`start => ${JSON.stringify(msg)}`));

_transport.on('pause', msg => console.log(`pause => ${JSON.stringify(msg)}`));

_transport.on('progress', msg => console.log(`progress => ${JSON.stringify(msg)}`));

_transport.on('finish', msg => console.log(`finish => ${JSON.stringify(msg)}`));

_transport.on('error', msg => console.log(`error => ${JSON.stringify(msg)}`));

_transport.start();

setTimeout(() => _transport.pause(), 4000);
