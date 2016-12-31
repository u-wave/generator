import Generator from 'yeoman-generator';
import jsesc from 'jsesc';
import stripIndent from 'strip-indent';
import ejs from 'ejs';

module.exports = Generator.extend({
  _addPluginsScript(sourceFile, data = {}) {
    const pluginsScriptFile = this.destinationPath('.partial/webPlugins.js');
    const script = this.fs.read(pluginsScriptFile, { defaults: '' });

    const template = this.fs.read(sourceFile);
    const newCode = ejs.render(template, Object.assign(
      { sourceType: jsesc(this.options['source-type']) },
      data
    ));

    this.fs.write(
      pluginsScriptFile,
      `${script}${stripIndent(newCode).trim()}\n`
    );
  },

  _addPluginsStyle(sourceFile, data = {}) {
    const pluginsStyleFile = this.destinationPath('.partial/webPlugins.css');
    const style = this.fs.read(pluginsStyleFile, { defaults: '' });

    const template = this.fs.read(sourceFile);
    const newCss = ejs.render(template, Object.assign(
      { sourceType: jsesc(this.options['source-type']) },
      data
    ));

    this.fs.write(
      pluginsStyleFile,
      `${style}${stripIndent(newCss).trim()}\n`
    );
  },

  initializing() {
    this.option('source-type', {
      type: String,
      required: true,
    });
  },
});
