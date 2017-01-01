import Generator from 'yeoman-generator';
import emojiPacks from './emojiPacks.json';

module.exports = Generator.extend({
  initializing() {
  },

  async prompting() {
    this.props = await this.prompt({
      type: 'list',
      name: 'emoji',
      message: 'Which emoji pack do you want to use?',
      choices: emojiPacks,
    });
  },

  configuring() {
  },

  default() {
  },

  writing: {
    pkg() {
      const pk = {
        dependencies: {
          'u-wave-web': 'latest',
        },
      };

      if (this.props.emoji) {
        pk.dependencies[this.props.emoji] = '^1.0.0';
      }

      this.fs.extendJSON(this.destinationPath('package.json'), pk);
    },
  },

  install() {
  },
});
