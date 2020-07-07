module.exports = {
    env: {
        browser: true,
        es2020: true
    },
    extends: [
        'plugin:vue/essential',
        'standard'
    ],
    parserOptions: {
        ecmaVersion: 11,
        sourceType: 'module'
    },
    plugins: [
        'vue' //插件，此插件用于识别文件中的js代码，没有MIME类型标识没有script标签也可以识别到，因此拿来识别.vue文件中的js代码
    ],
    rules: {}

}