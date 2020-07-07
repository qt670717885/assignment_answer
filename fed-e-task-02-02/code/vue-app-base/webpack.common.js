const path = require('path')
const webpack = require('webpack');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/main.js')
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [{
            test: /\.vue$/,
            use: 'vue-loader',
            include: path.resolve(__dirname, 'src'),
            exclude: path.resolve(__dirname, 'src/assets')
        }, {
            test: /\.js$/,
            use: 'babel-loader',
            include: path.resolve(__dirname, 'src'),
            exclude: /(node_modules)/
        }, {
            test: /\.css$/,
            use: ['vue-style-loader', 'css-loader']
        }, {
            test: /\.less$/,
            use: ['vue-style-loader', 'css-loader', 'less-loader']
        }, {
            test: /\.(jpg|png|bmp|gif|svg|ico)/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 4096,
                    esModule: false
                }
            }]
        }]
    },
    plugins: [
        // 请确保引入这个插件！
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            title: 'vue-project',
            template: path.resolve(__dirname, 'public/index.html'),
        }),
        new webpack.DefinePlugin({
            BASE_URL: JSON.stringify('./public/')
        }),
        new CopyWebpackPlugin({
            patterns: [{
                from: './public',
                to: 'public'
            }]
        })

    ]
}