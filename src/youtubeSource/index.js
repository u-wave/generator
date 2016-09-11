import SourceGenerator from '../SourceGenerator';
import validateApiKey from './validateApiKey';

module.exports = SourceGenerator.extend({
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
        message: 'YouTube API key',
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

  writing: {
    pkg() {
      this.fs.extendJSON(this.destinationPath('package.json'), {
        dependencies: {
          'u-wave-source-youtube': '^1.0.0',
        },
      });
    },

    sourceConfig() {
      this.fs.copyTpl(
        this.templatePath('youtube.js'),
        this.destinationPath('src/sources/youtube.js'),
        {
          sourceType: this.options['source-type'],
          options: this.props,
        }
      );
    },
  },
});
