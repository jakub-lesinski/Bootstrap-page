const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const fileinclude = require('gulp-file-include');

gulp.task('browsersync', function () {
  return browserSync.init({
    server: {
      baseDir: './'
    },
  });
})

gulp.task('sass', function () {
  return gulp.src('./scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' })
      .on('error', sass.logError)
    )
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream());
});

gulp.task('default', ['browsersync', 'sass'], function () {
  gulp.watch('./scss/**/*.scss', ['sass']);
  gulp.watch('./html/*.html', ['fileinclude']);
  gulp.watch('./js/**/*.js', browserSync.reload);
});
