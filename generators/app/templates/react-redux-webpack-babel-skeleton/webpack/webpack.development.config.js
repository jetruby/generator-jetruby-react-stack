// Run like this:
// cd client && webpack-dev-server --config webpack.development.config.js --hot --colors --progress --inline

var config       = require("./webpack.base.config");
var webpack      = require("webpack");
var path         = require("path");
var autoprefixer = require('autoprefixer');

config.debug = true;
config.displayErrorDetails = true;

config.entry.main.push(
  'webpack/hot/dev-server'
);

config.output = {
  path: "../dist",
  filename: "[name]_webpack_bundle.js",
  publicPath: 'http://localhost:8080/js/'
};

config.module.loaders.push(
  { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel' },
  { test: /\.js?$/, exclude: /node_modules/, loader: 'babel' },
  { test: /\.js$/, exclude: /node_modules/, loader: "eslint-loader" },
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
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify("development"),
      'APP_ENV': JSON.stringify("development")
    }
  })
)

module.exports = config;
