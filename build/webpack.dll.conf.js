// Made by JackDan
const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        vendor: ['vue/dist/vue.common.js', 'vue-router', 'babel-polyfill', 'qs', 'vuex', 'zrender', 'axios']
    },
    output: {
        path: path.join(__dirname, '../static/js'),
        filename: '[name].dll.js',
        library: '[name]_library'
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, '.', '[name]-manifest.json'),
            name: '[name]_library'
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            show_copyright: false,
            comments: false,
            compress: {
                warnings: false,
                drop_console: true,
                pure_funcs: ['console.log']
            }
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.DefinePlugin({
            'process.dev': {
                NODE_ENV: '"production"'
            }
        })
    ]
};