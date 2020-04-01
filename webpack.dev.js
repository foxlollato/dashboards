const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const webpack = require('webpack');

const PUBLIC_DIR = 'public';

module.exports = merge(common, {
    devServer: {
        contentBase: path.join(__dirname, PUBLIC_DIR),
        hot: true,
        port:8080
    },    
    mode: 'development',    
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
});