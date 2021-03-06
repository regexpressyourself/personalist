
var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-csso');
const autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
var browserify  = require('browserify');
var babelify    = require('babelify');
const cleanCSS = require('gulp-clean-css');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var uglify      = require('gulp-uglify');
var livereload  = require('gulp-livereload');
const debug = require('gulp-debug');
var dest = require('gulp-dest');
var gutil = require('gulp-util');

gulp.task('js', function(){
  return gulp.src(['client/src/static/js/**/*.js', '!client/src/static/js/min/*'])
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/env'
      ]
    }))
    .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('client/src/static/js/min'))
});

gulp.task('css', function(){
  return gulp.src('client/src/static/css/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(cleanCSS({
      compatibility: 'ie11'
    }))
    .pipe(gulp.dest('client/src/static/css/min'));
});
gulp.task('watch', ['css', 'js'], function () {
  gulp.watch('client/src/static/css/**/*.scss', ['css']);
  gulp.watch('client/src/static/js/**/*.js', ['js']);
});


gulp.task('default', [ 'css', 'js', 'watch']);
