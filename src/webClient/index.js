import Generator from 'yeoman-generator';
import emojiPacks from './emojiPacks.json';

module.exports = Generator.extend({
  initializing() {
  },

  prompting() {
    return this.prompt({
      type: 'list',
      name: 'emoji',
      message: 'Which emoji pack do you want to use?',
      choices: emojiPacks,
    }).then((props) => {
      this.props = props;
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
