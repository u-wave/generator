import { Base } from 'yeoman-generator';

module.exports = Base.extend({
  initializing() {
    this.option('source-type', {
      type: String,
      required: true,
    });
  },

  prompting() {
  },

  writing() {
    this.fs.extendJSON(this.destinationPath('package.json'), {
      dependencies: {
        'u-wave-source-dailymotion': '^1.0.0',
      },
    });

    this.fs.copyTpl(
      this.templatePath('dailymotion.js'),
      this.destinationPath('src/sources/dailymotion.js'),
      {
        sourceType: this.options['source-type'],
        options: {},
      }
    );
  },
});
