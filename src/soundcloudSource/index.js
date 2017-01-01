import SourceGenerator from '../SourceGenerator';
import validateApiKey from './validateApiKey';

module.exports = SourceGenerator.extend({
  initializing() {
    this.option('source-type', {
      type: String,
      required: true,
    });
  },

  async prompting() {
    this.props = await this.prompt({
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
    });
  },

  writing: {
    pkg() {
      this.fs.extendJSON(this.destinationPath('package.json'), {
        dependencies: {
          'u-wave-source-soundcloud': '^1.0.0',
        },
      });
    },

    sourceConfig() {
      this.fs.copyTpl(
        this.templatePath('soundcloud.js'),
        this.destinationPath('src/sources/soundcloud.js'),
        {
          sourceType: this.options['source-type'],
          options: this.props,
        }
      );
    },
  },
});
