

import SingleTransport from '../src/uploader/single_transport';
import MultiTransport from '../src/uploader/multi_transport';

const {ENDPOINT, AK, SK} = process.env;

const _transport = new MultiTransport(
    {
        endpoint: ENDPOINT,
        credentials: {ak: AK, sk: SK},
    },
    {
        uuid: 'test_uuid',
        bucketName: 'bce-bos-client',
        objectKey: '100m',
        localPath: '/Users/mudio/Desktop/tmp/100m',
    },
);

_transport.on('start', msg => console.log(`start => ${JSON.stringify(msg)}`));

_transport.on('pause', msg => console.log(`pause => ${JSON.stringify(msg)}`));

_transport.on('progress', msg => console.log(`progress => ${JSON.stringify(msg)}`));

_transport.on('finish', msg => console.log(`finish => ${JSON.stringify(msg)}`));

_transport.on('error', msg => console.log(`error => ${JSON.stringify(msg)}`));

_transport.start();
