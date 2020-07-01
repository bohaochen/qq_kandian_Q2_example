const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.config');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

process.env.NODE_ENV = 'production';

const entryfile = './src/index.js';


common.plugins.push(
  new OptimizeCSSAssetsPlugin({
    assetNameRegExp: /\.css\.*(?!.*map)/g,
    cssProcessor: require('cssnano'),
    cssProcessorOptions: {
      discardComments: { removeAll: true },
      safe: true,
      autoprefixer: false,
    },
    canPrint: true,
  }),
)


const prod = {
  mode: 'production',
  entry: entryfile,
  output: {
    filename: '[name].bundle.[hash].js',
    path: path.resolve(__dirname, ''),
    chunkFilename: '[name].bundle.[hash].js',
    publicPath: '/',
  },
  performance: {
    hints: false,
  },
};
module.exports = merge(prod, common);
