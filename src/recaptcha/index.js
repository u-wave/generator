import Generator from 'yeoman-generator';
import validateSecret from './validateSecret';

module.exports = Generator.extend({
  async prompting() {
    this.recaptcha = await this.prompt([
      {
        type: 'input',
        name: 'secret',
        message: 'ReCaptcha secret',
        async validate(secret) {
          try {
            await validateSecret(secret);
            return true;
          } catch (e) {
            return e.message;
          }
        },
      },
      {
        type: 'input',
        name: 'key',
        message: 'ReCaptcha site key',
      },
    ]);
  },

  configuring() {
    this.fs.writeJSON(
      this.destinationPath('config/recaptcha.json'),
      this.recaptcha
    );
  },
});
