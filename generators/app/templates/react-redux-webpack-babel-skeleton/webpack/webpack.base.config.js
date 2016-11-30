// Common webpack configuration used by other webpack configurations

var path    = require("path");
var webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: {
    main: [
      "../js/index"
    ]
  },

  resolve: {
    alias: {
      styles:      path.resolve(__dirname, '../styles'),
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
      src:         path.resolve(__dirname, '../js')
    },

    extensions: [
      "",
      ".webpack.js",
      ".web.js",
      ".js",
      ".jsx",
      ".css",
      ".scss",
      "config.js"
    ]
  },

  module: {
    loaders: []
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],

  // Omit libraries that are not intended to be used inside a browser
  node: {
    net: "empty",
    dns: "empty"
  }
};
