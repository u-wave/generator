import Generator from 'yeoman-generator';

module.exports = Generator.extend({
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
