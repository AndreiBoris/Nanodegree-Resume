'use strict';

// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    del = require('del'),
    htmlmin = require('gulp-htmlmin'),
    imageResize = require('gulp-image-resize'),
    livereload = require('gulp-livereload');

// Styles
gulp.task('styles', function() {
    return sass('src/styles/**/*.scss', {
            style: 'expanded'
        })
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest('dist/styles/'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(cssnano())
        .pipe(gulp.dest('dist/styles/'))
        .pipe(livereload())
        .pipe(notify({
            message: 'Styles task complete'
        }));
});

// Scripts
gulp.task('scripts', function() {
    return gulp.src(['src/scripts/helper.js', 'src/scripts/resumebuilder.js',
                    'src/scripts/styleadder.js'])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/scripts'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'))
        .pipe(notify({
            message: 'Scripts task complete'
        }));
});

// Clean images
gulp.task('clean-images', function() {
    return del(['dist/images']);
});

// Resize images
gulp.task('images', ['clean-images'], function() {
    gulp.src('src/images/**/*')
        .pipe(imageResize({
            width: 500
        }))
        .pipe(gulp.dest('dist/images'))
        .pipe(notify({
            message: 'Resize (no minification) task complete'
        }));
});

// Clean
gulp.task('clean', function() {
    return del(['dist/styles', 'dist/scripts', 'dist/images', './index.html']);
});


// Default
gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images', 'minify-html');
});

// Minify HTML
gulp.task('minify-html', function() {
    return gulp.src('src/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest('.'));
});

// Lint gulpfile.js
gulp.task('gulpfile-lint', function() {
    return gulp.src('gulpfile.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(notify({
            message: 'Gulpfile-lint task complete'
        }));
});

// Watch
gulp.task('watch', function() {
    livereload.listen();
    // Watch .scss files
    gulp.watch('src/styles/**/*.scss', ['styles']);

    // Watch .js files
    gulp.watch('src/scripts/**/*.js', ['scripts']);

    // Watch image files
    gulp.watch('src/images/**/*', ['images']);

    // Watch src/index.html
    gulp.watch('src/*.html', ['minify-html']);

    // Watch this file
    gulp.watch('gulpfile.js', ['gulpfile-lint']);
});
