// Common webpack configuration used by other webpack configurations

const path         = require('path')
const webpack      = require('webpack')
const autoprefixer = require('autoprefixer')
const precss       = require('precss')

module.exports = {
  context: __dirname,
  entry: {
    main: [
      'babel-polyfill',
      '../js/index'
    ]
  },

  resolve: {
    alias: {
      styles:      path.resolve(__dirname, '../public/styles'),
      reducers:    path.resolve(__dirname, '../js/reducers'),
      store:       path.resolve(__dirname, '../js/store'),
      constants:   path.resolve(__dirname, '../js/constants'),
      middlewares: path.resolve(__dirname, '../js/middlewares'),
      components:  path.resolve(__dirname, '../js/components'),
      containers:  path.resolve(__dirname, '../js/containers'),
      pages:       path.resolve(__dirname, '../js/pages'),
      sagas:       path.resolve(__dirname, '../js/sagas'),
      services:    path.resolve(__dirname, '../js/services'),
      utils:       path.resolve(__dirname, '../js/utils'),
      apollo:      path.resolve(__dirname, '../js/apollo'),
      src:         path.resolve(__dirname, '../js')
    },
    extensions: [
      '',
      '.webpack.js',
      '.web.js',
      '.js',
      '.jsx',
      '.css',
      '.scss',
      'config.js'
    ]
  },

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name]_bundle.js'
  },

  devServer: {
    stats: { chunks: false }
  },

  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.js?$/, exclude: /node_modules/, loader: 'babel' },

      { test: /\.png$/, loader: 'url-loader?limit=100000&mimetype=image/png' },
      { test: /\.jpg$/, loader: 'file-loader' },

      { test: /\.woff/, loader: 'url-loader?limit=10000&minetype=application/font-woff' },
      { test: /\.woff2/, loader: 'url-loader?limit=10000&minetype=application/font-woff' },
      { test: /\.ttf/, loader: 'file-loader' },
      { test: /\.eot/, loader: 'file-loader' },
      { test: /\.svg/, loader: 'file-loader' },
      { test: /\.gif/, loader: 'file-loader' }
    ]
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.optimize.OccurenceOrderPlugin()
  ],

  postcss: () => [precss, autoprefixer],

  // Omit libraries that are not intended to be used inside a browser
  node: {
    net: 'empty',
    dns: 'empty'
  }
}
