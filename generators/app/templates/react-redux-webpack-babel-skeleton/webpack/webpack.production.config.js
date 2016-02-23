// Run like this:
// cd client && webpack --config webpack.production.config.js

var config = require("./webpack.base.config");
var webpack = require("webpack");
var path = require("path");
var autoprefixer = require('autoprefixer');
var AssetsPlugin = require('assets-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var assetsPluginInstance = new AssetsPlugin({
  filename: 'manifest.json',
  path: "./dist",
  metadata: { timestamp: new Date().toUTCString() }
})

config.output = {
  path: "./dist",
  filename: "[hash].[name]_webpack_bundle.js",
};

config.module.loaders.push(
  { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel' },
  { test: /\.js?$/, exclude: /node_modules/, loader: 'babel' },
  { test: /\.css$/, loader: "style!css!postcss" },
  { test: /\.scss$/, loader: "style!css!postcss!sass?outputStyle=expanded&includePaths[]=" + path.resolve(__dirname, "../styles")},

  { test: /\.png$/, loader: "url-loader?limit=100000&mimetype=image/png" },
  { test: /\.jpg$/, loader: "file-loader" },

  { test: /\.woff/,  loader: "url-loader?limit=10000&minetype=application/font-woff" },
  { test: /\.woff2/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
  { test: /\.ttf/,   loader: "file-loader" },
  { test: /\.eot/,   loader: "file-loader" },
  { test: /\.svg/,   loader: "file-loader" }
);

config.postcss = function () {
  return [autoprefixer];
}

config.plugins.push(
  new CleanWebpackPlugin(['dist'], {
    root: path.resolve(__dirname, '..'),
    verbose: true,
    dry: false
  }),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify("production")
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: false, // Babel 6 throws error on source-map generation ( see https://github.com/babel/babel/issues/2864 )
    compress: {
      warnings: false
    }
  }),
  assetsPluginInstance
)

module.exports = config;
