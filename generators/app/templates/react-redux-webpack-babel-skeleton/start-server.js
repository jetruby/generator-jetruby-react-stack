require("babel-core/register");
require("babel-polyfill");
var universalWebpack = require('universal-webpack')
var settings = require('./webpack/universal-webpack-settings.js')
// `configuration.context` and `configuration.output.path` are used
var configuration = require('./webpack/webpack.base.config.js')

module.exports = universalWebpack.server(configuration, settings)
