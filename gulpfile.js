var gulp = require('gulp'),
	zip = require("gulp-zip"),
	rename = require("gulp-rename"),
    cssnano = require('gulp-cssnano'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    del = require('del');

gulp.task('styles', function() {
  return gulp.src('src/css/**/*.css')
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(cssnano())
	.pipe(concat('main.min.css'))
    .pipe(gulp.dest('dist/assets/css'));
});

gulp.task('scripts', function() {
  return gulp.src('src/scripts/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/assets/js'));
});

gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('dist/assets/img'));
});

gulp.task('clean', function() {
    return del(['dist/assets/css', 'dist/assets/js', 'dist/assets/img']);
});

gulp.task('compress', ['styles', 'scripts', 'images', 'copy-html'], function() {
  return gulp.src(['dist/**'])
    .pipe(zip('dist.zip'))
    .pipe(gulp.dest('.'));
});

gulp.task('copy-html', function() {
    gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
	gulp.watch('src/css/**/*.css', ['styles']);
	gulp.watch('src/scripts/**/*.js', ['scripts']);
	gulp.watch('src/images/**/*', ['images']);
});

gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images', 'copy-html', 'compress');
});

