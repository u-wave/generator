import { Base } from 'yeoman-generator';
import validateSecret from './validateSecret';

module.exports = Base.extend({
  prompting() {
    return this.prompt([
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
    ]).then(props => {
      this.recaptcha = {
        secret: props.secret,
        key: props.key,
      };
    });
  },

  configuring() {
    this.fs.writeJSON(
      this.destinationPath('config/recaptcha.json'),
      this.recaptcha
    );
  },
});
