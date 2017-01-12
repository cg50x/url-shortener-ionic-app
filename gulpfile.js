var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var babel = require('gulp-babel');
var plumber = require('gulp-plumber');
var runSequence = require('run-sequence');

var paths = {
  src: './src',
  lib: './src/lib',
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['babel', 'sass']);

gulp.task('build-www', function (done) {
  runSequence('copy-to-www', 'babel', 'sass', done);
});

gulp.task('copy-to-www', function () {
  return gulp.src([
    paths.src + '/**/*',
    '!' + paths.src + '/**/*.scss',
    '!' + paths.styles])
    .pipe(gulp.dest('www'));
});

gulp.task('html', function () {
  return gulp.src('./src/**/*.html')
    .pipe(gulp.dest('www'));
});

gulp.task('babel', function () {
  return gulp.src([
    paths.src + '/**/*.js',
    '!' + paths.lib + '/**/*'])
    .pipe(plumber())
    .pipe(babel({presets: ['es2015']}))
    .pipe(gulp.dest('www'));
});

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', ['build-www'], function() {
  gulp.watch(paths.src + '/**/*.html', ['html']);
  gulp.watch(paths.src + '/**/*.js', ['babel']);
  gulp.watch(paths.src + '/**/*.scss', ['sass']);
});

gulp.task('serve:before', ['watch']);

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
