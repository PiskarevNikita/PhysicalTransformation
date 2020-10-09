'use strict';

const gulp = require('gulp');
const del = require('del');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const rigger = require('gulp-rigger');
const autoprefixer = require('gulp-autoprefixer');

sass.compiler = require('node-sass');

function style() {
  return gulp.src('./src/sass/index.sass')
    .pipe(sass())
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(gulp.dest('./app/css'))
    .pipe(browserSync.stream())
}

function html() {
  return gulp.src('./src/templates/pages/*.html')
    .pipe(rigger())
    .pipe(gulp.dest('./app/'))
    .pipe(browserSync.stream())
}

function js() {
  return gulp.src('./src/js/*.js')
    .pipe(gulp.dest('./app/js'))
    .pipe(browserSync.stream())
}

function img() {
  return gulp.src('./src/img/**/*.*')
    .pipe(gulp.dest('./app/img'))
    .pipe(browserSync.stream())
}

function fonts() {
  return gulp.src('./src/fonts/**/*.*')
    .pipe(gulp.dest('./app/fonts'))
    .pipe(browserSync.stream())
}

function mobileStyle() {
  return gulp.src('./src/sass/mobile.sass')
    .pipe(sass())
    .pipe(gulp.dest('./app/css'))
    .pipe(browserSync.stream())
}

function watch() {
  browserSync.init({
    server: {
      baseDir: './app'
    }
  })
  gulp.watch('./src/sass/**/*.sass', style).on('error', sass.logError);
  gulp.watch('./src/**/*.html', html).on('change', browserSync.reload);
  gulp.watch('./src/js/*.js', js).on('change', browserSync.reload);
  gulp.watch('./src/img/**/*.*', img).on('change', browserSync.reload);
  gulp.watch('./src/fonts/**/*.*', fonts).on('change', browserSync.reload);
}

gulp.task('clean', function() {
  return del('./app/**/*.*');
});

exports.style = style;
exports.mobileStyle = mobileStyle;
exports.html = html;
exports.js = js;
exports.img = img;
exports.fonts = fonts;
exports.watch = watch;

