const del = require('del');
const gulp = require('gulp');
const connect = require('gulp-connect-php');
const cssnano = require('gulp-cssnano');
const postcss = require('gulp-postcss');
const watch = require('gulp-watch');
var cssnext = require('postcss-cssnext');
const precss = require('precss');

gulp.task('css', () => {
  del.sync(['css']);
  return gulp
    .src('src/*.css')
    .pipe(postcss([cssnext({browsers: ['last 1 version']}), precss, require('postcss-font-magician'), cssnano]))
    .pipe(gulp.dest('css'));
});

gulp.task('js', () => {
  del.sync(['js']);
  return gulp
    .src('src/*.js')
    .pipe(gulp.dest('js'));
});

gulp.task('default', ['css', 'js'], () => {
  gulp.watch(['src/*.*'], ['css']);
});

gulp.task('connect', () => {
  connect.server({port: 8080, base: '../..'});
});