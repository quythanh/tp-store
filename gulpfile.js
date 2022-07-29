// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass')(require('sass'));
var concat = require('gulp-concat');
var minifyCss = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps')

// var path
const appDir = '.';
const assetsDir = `${appDir}/assets`;
const jsDir = `${assetsDir}/js`;
const cssDir = `${assetsDir}/css`;
const sassDir = `${assetsDir}/sass`;

// Compile Our Sass
gulp.task('sass', function () {
    return gulp.src(`${sassDir}/**/*.scss`)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(minifyCss())
        .pipe(concat('all.min.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(cssDir))
        .pipe(browserSync.stream());
});

// Server
gulp.task('server', function () {
    
    browserSync.init({
        server: {
            baseDir: `${appDir}/`
        }
    });

    gulp.watch([`${sassDir}/**/*.scss`], gulp.series('sass'));
    gulp.watch("./*.html").on('change', browserSync.reload);
    gulp.watch(`${jsDir}/**/*.js`).on('change', browserSync.reload);
    gulp.watch(`${cssDir}/all.min.css`).on('change', browserSync.reload);
});

// Default Task
gulp.task('default', gulp.series('server'));