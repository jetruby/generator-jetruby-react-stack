var generators = require('yeoman-generator');
var chalk      = require('chalk');
var fs         = require('fs');
var path       = require('path');


module.exports = generators.Base.extend({
  initializing: function() {
    this.conflicter.force = true
  },
  prompting: function() {
    var done = this.async();

    var prompts = [{
      type: 'list',
      name: 'graphql',
      message: 'Do you want to use GraphQl?',
      choices: [
        'Yes',
        'No'
      ]
    }];

    this.prompt(prompts, function(answers) {
      this.props = answers;
      done();
    }.bind(this));
  },
  writing: function() {
    if (this.props.graphql === 'No'|| !this.props.graphql) return;

    this.composeWith('jetruby-react-stack1:graphql-mock-server', { options: { rjs: true } });

    var baseTemplatePath = this.templatePath('react-apollo-graphql-skeleton');

    // Get all files in our repo and copy the ones we should
    fs.readdir(baseTemplatePath, (err, items) => {
      for(var item of items) {
        var fullPath = path.join(baseTemplatePath, item);

        // Copy all items to our root
        if(fs.lstatSync(fullPath).isDirectory()) {
          this.bulkDirectory(path.join('react-apollo-graphql-skeleton', item), item);
        } else {
          this.copy(path.join('react-apollo-graphql-skeleton', item), item);
        }
      }
    });
  },
  install: function() {
    if (this.props.graphql === 'No'|| !this.props.graphql) return;

    var dependencies = [
      'react-apollo',
      'apollo-client',
      'graphql-tag'
    ];

    this.npmInstall(dependencies, { 'save': true });
  }
});