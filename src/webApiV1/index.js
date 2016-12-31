import Generator from 'yeoman-generator';
import { randomBytes } from 'crypto';

module.exports = Generator.extend({
  initializing() {
  },

  prompting() {
  },

  configuring() {
  },

  default() {
  },

  writing() {
    const secret = randomBytes(32);
    this.fs.write(this.destinationPath('./config/api-v1-secret.dat'), secret);

    this.fs.extendJSON(this.destinationPath('package.json'), {
      dependencies: {
        'u-wave-api-v1': '^1.0.0',
      },
    });
  },

  install() {
  },
});
