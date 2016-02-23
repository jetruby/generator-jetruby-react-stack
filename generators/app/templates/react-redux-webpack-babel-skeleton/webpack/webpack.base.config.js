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
    root: [
            path.join(__dirname, "../js"),
            path.join(__dirname, "../styles"),
            path.join(__dirname, "../images")
          ],
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
