var path = require('path')
var webpack = require('webpack')
var universalWebpack = require('universal-webpack')
var settings = require('./universal-webpack-settings.js')
var configuration = require('./webpack.base.config.js')

configuration.module.loaders.push(
  { test: /\.css$/, loader: "style!css!postcss" },
  { test: /\.pcss$/, loader: 'style!css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]!postcss' }
)
configuration.plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify("production"),
      'APP_ENV': JSON.stringify("production")
    }
  }),
  new webpack.EnvironmentPlugin([
    "API_URL",
    "CLIENT_URL"
  ])
)

module.exports = universalWebpack.serverConfiguration(configuration, settings)
