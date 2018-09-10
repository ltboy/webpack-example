
'use strict'

const webpackBaseConf = require('./webpack.base.conf')
const webpackMerge = require('webpack-merge')
const webpack = require('webpack')
const friendlyErrorPlugin = require('friendly-errors-webpack-plugin')
const { transformer, formatter } = require('./utils')
const PORT = 8088
const HOST = 'localhost'
module.exports = webpackMerge(webpackBaseConf, {
  mode: 'development',
  module: {
    rules: [{
      test: /\.ts$/,
      loader: 'tslint-loader',
      enforce: 'pre',
      exclude: /node_modules/,
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader', 'postcss-loader'],
    },
    {
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
    },
    ]
  },
  // server
  devServer: {
    hot: true,
    // 配置webpack编译好的静态文件
    publicPath: '/',
    compress: true,
    host: '0.0.0.0',
    port: PORT,
    // open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    quiet: true,
    watchOptions: {
      poll: true
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new friendlyErrorPlugin({
      compilationSuccessInfo: {
        // notes: ['additionnal'],
        messages: [
          `项目启动成功：http://${HOST}:${PORT}`
        ],
      },
      clearConsole: true,
      additionalFormatters: [formatter],
      additionalTransformers: [transformer]
    })
  ]
})
