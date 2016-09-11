import SourceGenerator from '../SourceGenerator';
import jsesc from 'jsesc';

module.exports = SourceGenerator.extend({
  writing: {
    pkg() {
      this.fs.extendJSON(this.destinationPath('package.json'), {
        dependencies: {
          'u-wave-source-dailymotion': '^1.0.0',
          'u-wave-web-dailymotion': '^1.0.0',
        },
      });
    },

    webPluginsScript() {
      this._addPluginsScript(this.templatePath('webPlugins.js'));
    },

    webPluginsStyle() {
      this._addPluginsStyle(this.templatePath('webPlugins.css'));
    },

    sourceConfig() {
      this.fs.copyTpl(
        this.templatePath('dailymotion.js'),
        this.destinationPath('src/sources/dailymotion.js'),
        {
          sourceType: this.options['source-type'],
          options: {},
        }
      );
    },
  },

  install() {
  },
});
