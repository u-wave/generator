const gulp = require('gulp');
const plumber = require('gulp-plumber');
const newer = require('gulp-newer');
const babel = require('gulp-babel');
const watch = require('gulp-watch');
const colors = require('gulp-util').colors;
const log = require('gulp-util').log;
const relative = require('path').relative;
const through = require('through2');
const gulpif = require('gulp-if');

const src = 'src/**/*.js';
const dest = 'generators/';

const shouldCompile = file =>
  /\.js$/.test(file.path) && !/templates/.test(file.path);

gulp.task('build', () =>
  gulp.src(src)
    .pipe(plumber())
    .pipe(newer(dest))
    .pipe(gulpif(shouldCompile, through.obj((file, enc, cb) => {
      const path = relative(__dirname, file.path);
      log(`Compiling '${colors.cyan(path)}'...`);
      cb(null, file);
    })))
    .pipe(gulpif(shouldCompile, babel()))
    .pipe(gulp.dest(dest))
);

gulp.task('watch', ['build'], () =>
  watch(src, () => gulp.start('build'))
);

gulp.task('default', ['build']);
