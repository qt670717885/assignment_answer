
const merge = require('webpack-merge')
const common = require('./webpack.common.js');
const StyleLintPlugin = require('stylelint-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = merge(common, {
    mode: 'production',
    devtool: 'none',
    optimization: {
        usedExports: true, // 只导出外部使用的成员
        minimize: true, // 压缩代码, 去除空行, 死代码等
        concatenateModules: true, // 尽可能将所有模块合并到一个输出函数中
        splitChunks: {
            chunks: 'all',
        }
    },
    plugins: [
        new StyleLintPlugin({
            files: ['**/*.{vue,htm,html,css,sss,less,scss,sass}'],
        }),
        new CopyWebpackPlugin({
            patterns: [{
                from: 'public/**/*.ico'
            }]
        }),
    ]
});