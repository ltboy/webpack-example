'use strict'

const WebpackBaseConf = require('./webpack.base.conf')
const WebpackMerge = require('webpack-merge')
const cleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const utils = require('./utils')

module.exports = WebpackMerge(WebpackBaseConf, {
  mode: 'production',
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader', 'postcss-loader']
    },
    {
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
    },
    ]
  },
  optimization: {
    splitChunks: {

    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new cleanWebpackPlugin('dist', {
      dry: false,
      root: utils.pathRoot('')
    })
  ]
})
