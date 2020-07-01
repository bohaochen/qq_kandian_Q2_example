const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.config');
const px2rem = require('postcss-px2rem');


const ip = '0.0.0.0';

const port = '7777';

process.env.NODE_ENV = 'development';


common.plugins.push(new CleanWebpackPlugin());

common.plugins.push(new webpack.HotModuleReplacementPlugin());



const dev = {
  mode: 'development',
  entry: {
    index: [`webpack-dev-server/client?http://${ip}:${port}`, './src/index.js'],
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, '../'),
    hot: true,
    inline: true,
    historyApiFallback: true,
    host: ip,
    disableHostCheck: true,
    // 跳过本地检查host，便于使用
    port: port,
    useLocalIp:true,//使用本地Ip
    proxy: {
      '/api': {
        target: 'http://116.62.197.100:1337', // 测试
        host: '116.62.197.100:1337',
        changeOrigin: true,
        pathRewrite: { '^/api': '/' },
      },
      // '/wechat': {
      //   target: 'https://wxapi.dadi01.net', // 测试
      //   host: 'wxapi.dadi01.net/',
      //   changeOrigin: true,
      //   pathRewrite: { '^/wechat/wechat': '/' },
      // },
    },
  },
};

module.exports = merge(common, dev);
