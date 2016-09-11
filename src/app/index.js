import { Base } from 'yeoman-generator';
import validateRedis from './validateRedis';
import validateMongoose from './validateMongoose';
import jsesc from 'jsesc';

module.exports = Base.extend({
  initializing() {
  },

  prompting() {
    return this.prompt([
      {
        type: 'input',
        name: 'redis',
        message: 'Redis URI, port, or socket',
        default: 'redis://localhost:6379',
        filter: jsesc,
        async validate(url) {
          try {
            await validateRedis(url);
            return true;
          } catch (e) {
            return e.message;
          }
        },
      },
      {
        type: 'input',
        name: 'mongo',
        message: 'MongDB URI, port, or socket',
        default: 'mongodb://localhost:27017/uwave',
        filter: jsesc,
        async validate(url) {
          try {
            await validateMongoose(url);
            return true;
          } catch (e) {
            return e.message;
          }
        },
      },
    ]).then(config => {
      this.config = config;
    });
  },

  configuring() {
    const pkg = this.fs.readJSON(this.templatePath('_package.json'));
    this.fs.writeJSON(this.destinationPath('package.json'), pkg);
  },

  _run(name) {
    this.composeWith(`uwave:${name}`, {}, {
      local: require.resolve(`../${name}`),
    });
  },

  default() {
    this._run('webApiV1');
    this._run('webClient');
    this._run('sources');
  },

  writing() {
    this.fs.copyTpl(
      this.templatePath('server.js'),
      this.destinationPath('src/server.js'),
      this.config
    );
  },

  install() {
    this.npmInstall([], { save: true });
  },
});
