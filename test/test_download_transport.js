

import Transport from '../src/downloader/transport';

const {ENDPOINT, AK, SK} = process.env;

const _transport = new Transport(
    {
        endpoint: ENDPOINT,
        credentials: {ak: AK, sk: SK},
    },
    {
        uuid: 'test_uuid',
        bucketName: 'bce-bos-client',
        objectKey: 'releases/v0.3.5/bce-client-0.3.5-nsis.exe',
        localPath: '/Users/mudio/Desktop/a',
    },
);

_transport.on('start', msg => console.log(`start => ${JSON.stringify(msg)}`));

_transport.on('pause', msg => console.log(`pause => ${JSON.stringify(msg)}`));

_transport.on('rate', msg => console.log(`progress => ${JSON.stringify(msg)}`));

_transport.on('finish', msg => console.log(`finish => ${JSON.stringify(msg)}`));

_transport.on('error', msg => console.log(`error => ${JSON.stringify(msg)}`));

_transport.start();
