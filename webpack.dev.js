// 引入nodejs path 包
const path = require('path');
const { resolve } = require('path');

module.exports = {
  watch: true,
  watchOptions: {
    ignored: /node_modules/,
  },
  // 入口文件
  entry: './src/index.js',
  // 输出打包文件配置
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'getFileInfo.js',
    library: 'getFileInfo', // 对外暴露对象名称
    libraryTarget: 'umd',
    clean: true
  },
  // 打包环境
  mode: 'production',
  // 开启source-map 方便生成调试。
};
