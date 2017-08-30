/**
 * Base webpack config used across other specific configs
 */

import path from 'path';

export default {
    target: 'node',

    entry: {
        downloader: './src/downloader/index',
        uploader: './src/uploader/index',
        index: './src/index',
    },

    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        // https://github.com/webpack/webpack/issues/1114
        libraryTarget: 'commonjs2',
    },

    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }],
    },
};
