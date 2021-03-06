var generators = require('yeoman-generator');
var chalk      = require('chalk');
var fs         = require('fs');
var path       = require('path');

var routerDependencies = {
  'No routing':   [],
  'React Router': ['react-router', 'react-router-redux'],
  'Router5':      ['router5', 'redux-router5', 'react-router5', 'router5-history', 'router5-listeners']
}

module.exports = generators.Base.extend({
  initializing: function() {
    this.log(chalk.bold.green('--------------------------------------------------------------------------------'));
    this.log(chalk.bold.green('|                        Welcome to JetReact starter-kit                       |'));
    this.log(chalk.bold.green('--------------------------------------------------------------------------------\n'));
    this.log(chalk.bold.yellow('This generator will walk you through installing a Babel, React, Redux, Webpack, GraphQl application.\n'));

    this.composeWith('jetruby-react-stack:react-apollo-graphql', { options: { rjs: true } });
  },
  prompting: function() {
    var done = this.async();

    var prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        default: this.appname
      },
      // {
      //   type: 'list',
      //   name: 'router',
      //   message: 'Which Router do you want to use?',
      //   choices: [
      //     'No routing',
      //     'React Router',
      //     'Router5'
      //   ]
      // },
      {
        type: 'list',
        name: 'flexbox',
        message: 'Do you want to use Flexbox?',
        choices: [
          'Yes',
          'No'
        ]
      },
      {
        type: 'list',
        name: 'bootstrap',
        message: 'Do you want to use Twitter Bootstrap?',
        choices: [
          'Yes',
          'No'
        ]
      },
      {
        type: 'list',
        name: 'time',
        message: 'Which time/date library would you like to use?',
        choices: [
          'moment',
          'fecha'
        ]
      }
    ];

    this.prompt(prompts, function(answers) {
      this.props = answers;
      done();
    }.bind(this));
  },
  configuring: function() {
    // Generate our package.json. Make sure to also include the required dependencies for styles
    var scripts = {
      "analyze:production": "NODE_ENV=production webpack --config webpack/webpack.production.config.js --json | analyze-bundle-size",
      "analyze:staging": "webpack --config webpack/webpack.staging.config.js --json | analyze-bundle-size",
      "test": "APP_ENV=test NODE_PATH=./js babel-node test/index.js | tap-spec",
      "dev-build-client": "webpack-dev-server --hot --inline --config webpack/webpack.client.development.config.js --port 3001 --colors --display-error-details --history-api-fallback",
      "dev-build-server": "webpack --watch --config webpack/webpack.server.development.config.js --colors",
      "dev-build": "npm-run-all --parallel dev-build-client dev-build-server",
      "dev-serve": "nodemon ./start-server --watch ./dist/server",
      "prepare-dev-build-server": "universal-webpack --settings ./universal-webpack-settings.js prepare",
      "dev": "nf start",
      "production-build-client": "webpack --config webpack/webpack.client.production.config.js --colors --display-error-details",
      "production-build-server": "webpack --config webpack/webpack.server.production.config.js --colors --display-error-details",
      "production-build": "npm-run-all --parallel production-build-client production-build-server",
      "production": "node ./start-server",
      "graphql-mock-server": "node ./graphql-mock-server/server.js",
      "browsersync": "browser-sync start --proxy 'localhost:3000' --port 3002 --ui-port 3003"
    };

    var packageSettings = {
      name: this.appName,
      private: true,
      version: '0.1.0',
      description: 'Generated by generator-jetreact',
      main: 'main.js',
      scripts: scripts,
      repository: '',
      keywords: [],
      author: 'Alex Khrustalev'
    };

    this.fs.writeJSON(this.destinationPath('package.json'), packageSettings);
  },
  writing: function() {
    var baseTemplatePath = this.templatePath('react-redux-webpack-babel-skeleton');

    // Get all files in our repo and copy the ones we should
    fs.readdir(baseTemplatePath, (err, items) => {
      for(var item of items) {
        var fullPath = path.join(baseTemplatePath, item);

        // Copy all items to our root
        if(fs.lstatSync(fullPath).isDirectory()) {
          this.bulkDirectory(path.join('react-redux-webpack-babel-skeleton', item), item);
        } else {
          this.copy(path.join('react-redux-webpack-babel-skeleton', item), item);
        }
      }
    });
  },
  install: function() {
    this.log(chalk.bold.yellow('Installing dependencies...\n'));
    var dependencies = [
      'npm-run-all',
      'extract-text-webpack-plugin',
      'universal-webpack',
      'nodemon',
      'express',
      'node-localstorage',
      'cookie-parser',
      'foreman',
      'react',
      'react-dom',
      'redux',
      'redux-saga',
      'redux-thunk',
      'redux-form', 
      'redux-actions',
      'redux-logger',
      'react-redux',
      'react-css-modules',
      'ramda',
      'isomorphic-fetch',
      'serialize-javascript',
      'normalizr',
      'classnames',
      'cuid',
      'path-parser',
      'humps',
      'jquery-param',
      'pluralize',
      'repoint',
      'precss'
    ];

    var cssDependencies = [];

    if (this.props.bootstrap === 'Yes') {
      cssDependencies.push('bootstrap')
    }

    if (this.props.flexbox === 'Yes') {
      cssDependencies.push('flexboxgrid')
    }

    dependencies = dependencies.concat([this.props.time])
                               .concat(cssDependencies)
                               .concat(routerDependencies['React Router']);

    this.npmInstall(dependencies, { 'save': true });

    var devDependencies = [
      'browser-sync',
      'webpack',
      'webpack-dev-server',
      'babel-core',
      'babel-loader',
      'babel-plugin-transform-es2015-destructuring',
      'babel-plugin-transform-object-rest-spread',
      'babel-polyfill',
      'babel-preset-es2015',
      'babel-preset-react',
      'babel-preset-stage-0',
      'postcss-loader',
      'autoprefixer',
      'style-loader',
      'css-loader',
      'normalize.css',
      'url-loader',
      'file-loader',
      'worker-loader',
      'expose-loader',
      'assets-webpack-plugin',
      'clean-webpack-plugin',
      'babel-polyfill',
      'eslint@^3.8.1',
      'eslint-config-airbnb@^12.0.0',
      'eslint-loader@^1.6.0',
      'eslint-plugin-import@^1.16.0',
      'eslint-plugin-jsx-a11y@^2.2.3',
      'eslint-plugin-react@^6.4.1',
      'redux-devtools',
      'redux-devtools-dispatch',
      'redux-devtools-dock-monitor',
      'redux-devtools-instrument',
      'redux-devtools-log-monitor',
      'redux-devtools-multiple-monitors'
    ];

    var testDependencies = [
      'tape',
      'tap-spec',
      'enzyme',
      'sinon'
    ];

    devDependencies = devDependencies.concat(testDependencies);

    this.npmInstall(devDependencies, { 'saveDev': true });
  }
});
