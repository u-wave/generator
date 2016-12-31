import Generator from 'yeoman-generator';
import validateRedis from './validateRedis';
import validateMongoose from './validateMongoose';
import {
  validateEmail,
  validateUsername,
  validatePassword,
} from './validateUser';
import jsesc from 'jsesc';
import requireRelative from 'require-relative';
import * as messages from '../messages';

module.exports = Generator.extend({
  initializing() {
    this.props = {};
  },

  prompting: {
    intro() {
      this.log(messages.banner);

      return this.prompt({
        type: 'confirm',
        name: 'start',
        message: 'Begin üWave setup',
        default: true,
      }).then(x => {
        if (!x.start) {
          process.exit(0);
        }
      });
    },

    mongodb() {
      this.log(messages.mongodbHelp);

      return this.prompt({
        type: 'input',
        name: 'mongo',
        message: 'MongDB URI, port, or socket',
        default: 'mongodb://localhost:27017/uwave',
        filter: jsesc,
        validate: validateMongoose,
      }).then((props) => {
        Object.assign(this.props, props);
      });
    },

    redis() {
      this.log(messages.redisHelp);

      return this.prompt({
        type: 'input',
        name: 'redis',
        message: 'Redis URI, port, or socket',
        default: 'redis://localhost:6379',
        filter: jsesc,
        validate: validateRedis,
      }).then((props) => {
        Object.assign(this.props, props);
      });
    },

    adminUser() {
      return this.prompt([
        {
          type: 'input',
          name: 'email',
          message: 'Admin e-mail address',
          validate: validateEmail,
        },
        {
          type: 'input',
          name: 'username',
          message: 'Admin username',
          default: 'Admin',
          validate: validateUsername,
        },
        {
          type: 'password',
          name: 'password',
          message: 'Admin password',
          validate: validatePassword,
        },
      ]).then((user) => {
        this.adminUser = user;
      });
    },

    recaptcha() {
      return this.prompt({
        type: 'confirm',
        name: 'useReCaptcha',
        message: 'Enable ReCaptcha on signup',
        default: true,
      }).then((props) => {
        Object.assign(this.props, props);
      });
    },
  },

  configuring() {
    const pkg = this.fs.readJSON(this.templatePath('_package.json'));
    this.fs.writeJSON(this.destinationPath('package.json'), pkg);
  },

  default() {
    if (this.props.useReCaptcha) {
      this.composeWith(require.resolve('../recaptcha'));
    }
    this.composeWith(require.resolve('../webApiV1'));
    this.composeWith(require.resolve('../webClient'));
    this.composeWith(require.resolve('../sources'));
  },

  writing() {
    this.fs.copyTpl(
      this.templatePath('server.js'),
      this.destinationPath('src/server.js'),
      this.props
    );
  },

  install: {
    npm() {
      this.npmInstall([], { save: true });
    },
    async adminUser() {
      const uwave = requireRelative('u-wave-core', this.destinationRoot());
      const uw = uwave({
        redis: this.props.redis,
        mongo: this.props.mongo,
      });
      const user = await uw.createUser(this.adminUser);
      // numerical role, for now
      user.role = 4;
      await user.save();
      // future:
      // await user.allow('admin');
      await uw.stop();
    },
  },
});
