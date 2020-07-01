const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    chunkFilename: '[name].bundle.js',
  },
  resolve: {
    alias: {
      "common": require('path').resolve(__dirname, '../src/common'),
      "@routes": path.resolve(__dirname, "../src/routes"),
      "@constants": path.resolve(__dirname, "../src/constants.js"),
      "@utils": path.resolve(__dirname, "../src/utils"),
      "@components": path.resolve(__dirname, "../src/components"),
      "@models": path.resolve(__dirname, "../src/models"),
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Output Management',
      filename: 'index.html',
      favicon: 'template/favicon.ico',
      template: 'template/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash].css',
      chunkFilename: '[id].[chunkhash].css',
    }),
    new CopyWebpackPlugin([
      {
          from: path.resolve(__dirname, '../src/assets/media'),
          to: path.resolve(__dirname, '../dist/media'),
          ignore: ['.*']
      }
  ])
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: ['es2015', 'stage-0', 'react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'px2rem-loader'],
      },
      {
        test: /\.css$/,
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
          config: {
            path: 'postcss.config.js',

          },
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'px2rem-loader', 'sass-loader'],
      },
      // 编译less
      {
        test: /\.less$/,
        include: [
          path.join(process.cwd(), './src'),
        ],
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, {
          loader: 'css-loader',
          options: {
            importLoaders: 2,
            modules: { localIdentName: '[local]__[hash:base64:5]' }
          },
        }, 'px2rem-loader', 'less-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif|mp3)$/,
        use: [{
          loader: 'file-loader',
          options: {
            esModule: false, // 默认值是 true，需要手动改成 false
          }
        }],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
    ],
  },
};
