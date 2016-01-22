// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del'),
    htmlmin = require('gulp-htmlmin'),
    imageResize = require('gulp-image-resize');

// Styles
gulp.task('styles', function() {
  return sass('css/sass/screen.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('css/build'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cssnano())
    .pipe(gulp.dest('css/build'))
    .pipe(notify({ message: 'Styles task complete' }));
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src('js/resumebuilder.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(gulp.dest('js/build'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('js/build'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// Clean images
gulp.task('clean-images', function() {
  return del(['dist/images'])
})

// Resize images
gulp.task('images', ['clean-images'], function() {
  gulp.src('images/**/*')
    .pipe(imageResize({
      width: 400
    }))
    .pipe(gulp.dest('dist/images'))
    .pipe(notify({ message: 'Resize (no minification) task complete' }));
});

// Clean
gulp.task('clean', function() {
  return del(['dist/images']);
});

// Main task
gulp.task('main', ['clean'], function() {
  gulp.start('styles', 'scripts', 'images');
});

// Default
gulp.task('default', function() {
  gulp.start('main', 'minify-html');
})

// Minify HTML
gulp.task('minify-html', function() {
  return gulp.src('src/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('.'))
});

// Watch
gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('css/sass/**/*.scss', ['styles']);

  // Watch .js files
  gulp.watch('js/resumebuilder.js', ['scripts']);

});
