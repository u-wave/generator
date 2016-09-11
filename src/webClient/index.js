import { Base } from 'yeoman-generator';

module.exports = Base.extend({
  initializing() {
  },

  prompting() {
  },

  configuring() {
  },

  default() {
  },

  writing() {
    this.fs.extendJSON(this.destinationPath('package.json'), {
      dependencies: {
        'u-wave-web': '^1.0.0',
      },
    });
  },

  install() {
  },
});
