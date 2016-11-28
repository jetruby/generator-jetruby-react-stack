var path = require('path')
var webpack = require('webpack')
var universalWebpack = require('universal-webpack')
var settings = require('./universal-webpack-settings.js')
var configuration = require('./webpack.base.config.js')
var ExtractTextPlugin = require("extract-text-webpack-plugin")

configuration.module.loaders.push(
  { test: /\.css$/, loader: ExtractTextPlugin.extract(
      'style-loader',
      'css-loader',
      'postcss-loader'
    )
  },
  { test: /\.pcss$/, loader: ExtractTextPlugin.extract(
      'style-loader',
      'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
      'postcss-loader'
    )
  }
)
configuration.plugins.push(
  new ExtractTextPlugin("styles.css"),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify("production"),
      'APP_ENV': JSON.stringify("production")
    }
  })
)

module.exports = universalWebpack.clientConfiguration(configuration, settings)
