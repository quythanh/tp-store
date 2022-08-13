// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass')(require('sass'));
var concat = require('gulp-concat');
var cssnano = require('cssnano');
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');

// var path
const appDir = '.';
const assetsDir = `${appDir}/assets`;
const jsDir = `${assetsDir}/js`;
const cssDir = `${assetsDir}/css`;
const scssDir = `${assetsDir}/scss`;

// Compile Our Sass
gulp.task('sass', function () {
    var plugins = [
        cssnano({
            preset: [
                'advanced',
                {"discardUnused": {"fontFace": false, "keyframes": false}}
            ]
        }),
    ];

    return gulp.src(`${scssDir}/**/*.scss`)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss(plugins))
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

    gulp.watch([`${scssDir}/**/*.scss`], gulp.series('sass'));
    gulp.watch("./*.html").on('change', browserSync.reload);
    gulp.watch(`${jsDir}/**/*.js`).on('change', browserSync.reload);
    gulp.watch(`${cssDir}/all.min.css`).on('change', browserSync.reload);
});

// Default Task
gulp.task('default', gulp.series('server'));