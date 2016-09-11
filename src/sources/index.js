import { Base } from 'yeoman-generator';
import pify from 'pify';
import { Separator } from 'inquirer';
import * as messages from '../messages';

/**
 * Recursive generator that keeps asking for media source configuration.
 */
module.exports = Base.extend({
  initializing() {
    this.option('usedSources', {
      type: Array,
      defaults: [],
    });

    this.sources = [
      { value: 'dailymotion', name: 'Dailymotion' },
      { value: 'youtube', name: 'YouTube' },
      { value: 'soundcloud', name: 'Soundcloud' },
    ];
  },

  configuring() {
    this.fs.write(this.destinationPath('.partial/webPlugins.js'), '');
    this.fs.write(this.destinationPath('.partial/webPlugins.css'), '');
  },

  async configuringSources() {
    const run = pify(this.env.run.bind(this.env));

    if (this._isFirstRun()) {
      this.log(messages.sourcesHelp);
    }

    const { sourceType } = await this.prompt([
      {
        type: 'list',
        name: 'sourceType',
        message: this._isFirstRun()
          ? 'Do you want to configure another media source?'
          : 'Which media source do you want to add?',
        choices: this._availableSources().concat([
          new Separator(),
          { value: null, name: 'No, continue with the installation' },
        ]),
      },
    ]);

    if (sourceType) {
      const options = await this.prompt([
        {
          type: 'input',
          name: 'source-type',
          message: 'sourceType name',
          default: sourceType,
        },
      ]);

      this.composeWith(`uwave:${sourceType}Source`, { options }, {
        local: require.resolve(`../${sourceType}Source`),
      });
      // re-run
      this.composeWith('uwave:sources', {
        options: {
          // Remove from available sources, so we don't ask again.
          usedSources: this._addUsedSource(sourceType),
        },
      }, {
        local: require.resolve('./'),
      });
    } else {
      this._makePluginFiles = true;

      if (this._isFirstRun()) {
        this.log(messages.noMediaSourcesConfigured);
      }
    }
  },

  writing() {
    if (!this._makePluginFiles) return;

    this.fs.copyTpl(
      this.templatePath('index.js'),
      this.destinationPath('src/sources/index.js'),
      { usedSources: this.options.usedSources }
    );

    this.fs.move(
      this.destinationPath('.partial/webPlugins.js'),
      this.destinationPath('src/webPlugins.js')
    );
    this.fs.move(
      this.destinationPath('.partial/webPlugins.css'),
      this.destinationPath('src/webPlugins.css')
    );
  },

  _availableSources() {
    return this.sources.filter(source => (
      this.options.usedSources.indexOf(source.value) === -1
    ));
  },

  _addUsedSource(sourceType) {
    return this.options.usedSources.concat([sourceType]);
  },

  _isFirstRun() {
    return this.options.usedSources.length === 0;
  },
});
