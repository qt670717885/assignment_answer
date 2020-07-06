## 1、Webpack 的构建流程主要有哪些环节？如果可以请尽可能详尽的描述 Webpack 打包的整个过程。

答案 ： 

​	webpack构建运行在node.js环境下，它的配置文件遵循CommonJS规范，webpack.config.js导出一个Object‘对象。webpack会根据配置找到入口文件，一班是JS文件，根据这个文件中出现的import或者require去判断文件所依赖的模块，再去解析模块，这样就形成一个依赖树。webpack会去递归这个依赖树，找到每个节点对应的依赖，然后达到到出口文件。其中loader是webpack的核心。Loader是用于对模块文件进行编译转换和加载处理。配合plugin扩展webpack的功能。



## 2、Loader 和 Plugin 有哪些不同？请描述一下开发 Loader 和 Plugin 的思路。

答案：

​	loader用于对模块源码的转换，webpack本身只处理js代码，loader可以处理其他非js文件，包括css，ts等。loader还可以对一些资源文件做一些处理，比如file-loader

​	plugin是做loader无法处理的事情，增强webpack的功能，比如生成html文件，压缩代码等。

​	开发loader



### 3编程题

## 使用 Webpack 实现 Vue 项目打包任务



#### 1. 安装

安装webpack以及webpack-cli

```js
yarn add webpack webpack-cli --dev
```



#### 2. 配置webpack.common.js

入口路径

```
entry: {
   main: path.resolve(__dirname, './src/main.js')
},
```

出口路径，在生产环境中使用conenthash,优化缓存问题

```
output: {
    path: path.resolve(__dirname, 'dist'),
	filename: '[name]-[contenthash:8].bundle.js',
},
```

使用loader

- vue-loader ： 解析和转换 .vue 文件，提取出其中的逻辑代码 script、样式代码 style、以及 HTML 模版 template，再分别把它们交给对应的 Loader 去处理

```
//安装
yarn add vue-loader vue-template-compiler --dev
```

- babel-loader： 处理ES6+语法编译,这里除了babel-loader还需要额外安装@babel/core 与 @babel/preset-env 

```
//安装
yarn add babel-loader @babel/core @babel/preset-env --dev
```

- vue-style-loader: 处理vue中css样式，配合css-loader使用

- css-loader ：处理css文件
- less-loader：处理less文件
- url-loader：处理资源文件

使用plugins

- clean-webpack-plugin： 用于删除/清理构建文件夹，原因是每次打包并不能清理之前打包的文件
- html-webpack-plugin：帮助我们在打包文件中自动生成一个HTML文件
- vue-loader/lib/plugin：将定义过的其它规则复制并应用到 `.vue` 文件里相应语言的块
- copy-webpack-plugin： 将单个文件或整个目录复制到构建目录
- webpack.definPlugin: 为代码注入全局常量或者代码片段，注入到代码中

```js
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
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
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
            test: /\.(png|jpe?g|gif|svg|ico)/,
            loader: 'file-loader'
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
```



#### 3.配置webpack.dev.js

使用webpack-merge合并基础配置，这里遇到一个小坑，最新webpack-merge最少需要node12.0.0我的node为10.15.3所以安装不成功，我升级了node版本，问题解决

```
//报错信息
error webpack-merge@5.0.3: The engine "node" is incompatible with this module. Expected version ">=12.0.0". Got "10.15.3"
error Found incompatible module.
```

使用Source Map,生成Source Map文件

```
const path = require('path');
const webpackMerge = require('webpack-merge');
const commonWebpackConfig = require('./webpack.common');

module.exports = webpackMerge(commonWebpackConfig, {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'dist')
    }
});
```

#### 4. 配置webpack.pro.js

- 使用webpack-merge合并配置
- stylelint-webpack-plugin ： 整理了样式文件
- copy-webpack-plugin ： 复制资源文件

#### 5.配置package.json中的命令



