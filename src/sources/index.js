import { Base } from 'yeoman-generator';
import pify from 'pify';

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

  _availableSources() {
    return this.sources.filter(source => (
      this.options.usedSources.indexOf(source.value) === -1
    ));
  },

  _addUsedSource(sourceType) {
    return this.options.usedSources.concat([ sourceType ]);
  },

  async configuringSources() {
    const run = pify(this.env.run.bind(this.env));

    const { sourceType } = await this.prompt([
      {
        type: 'list',
        name: 'sourceType',
        message: 'Do you want to configure a media source?',
        choices: this._availableSources().concat([
          { value: null, name: 'No' },
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
      this.fs.copyTpl(
        this.templatePath('index.js'),
        this.destinationPath('src/sources/index.js'),
        { usedSources: this.options.usedSources }
      );
    }
  },
});
