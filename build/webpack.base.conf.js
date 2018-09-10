
'use strict'

const preLoadWebpackPlugin = require('preload-webpack-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
const utils = require('./utils')


const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  entry: utils.pathRoot('src/index.ts'),
  output: {
    path: utils.pathRoot('dist'),
    filename: 'js/[name]-[hash:6].js',
    // publicPath: '/'
  },
  resolve: {
    alias: {
      '@': utils.pathRoot('src'),
      'style': 'src/style'
    },
    extensions: ['.js', '.ts',],
    modules: ['node_modules'],
  },
  module: {
    rules: [{
      test: /\.ts$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader'
      },
      {
        loader: 'ts-loader',
      }
      ]
    },
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'img/[name][hash:7].[ext]'
      }
    },
    {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'media/[name].[hash:7].[ext]'
      }
    },
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'fonts/[name].[hash:7].[ext]'
      }
    }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      // favicon: 'public/favicon.ico',
      minify: {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        removeComments: true
      }
    }),
    new preLoadWebpackPlugin({
      rel: 'preload',
      include: 'initial',
    }),
    new preLoadWebpackPlugin({
      rel: 'prefetch',
      include: 'asyncChunks'
    }),
  ]
}
