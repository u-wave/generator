import { Base } from 'yeoman-generator';

module.exports = Base.extend({
  initializing() {
  },

  prompting() {
  },

  default() {
  },

  writing() {
    const pkg = this.fs.readJSON(this.templatePath('_package.json'));
    this.fs.writeJSON(this.destinationPath('package.json'), pkg);
  },
});
