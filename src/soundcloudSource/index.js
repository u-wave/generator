import { Base } from 'yeoman-generator';
import validateApiKey from './validateApiKey';

module.exports = Base.extend({
  initializing() {
    this.option('source-type', {
      type: String,
      required: true,
    });
  },

  prompting() {
    return this.prompt([
      {
        type: 'input',
        name: 'key',
        message: 'SoundCloud API key',
        async validate(key) {
          try {
            await validateApiKey(key);
            return true;
          } catch (e) {
            return e.message;
          }
        },
      },
    ], props => {
      this.props = props;
    });
  },

  writing() {
    this.fs.extendJSON(this.destinationPath('package.json'), {
      dependencies: {
        'u-wave-source-soundcloud': '^1.0.0',
      },
    });

    this.fs.copyTpl(
      this.templatePath('soundcloud.js'),
      this.destinationPath('src/sources/soundcloud.js'),
      {
        sourceType: this.options['source-type'],
        options: this.props,
      }
    );
  },
});
