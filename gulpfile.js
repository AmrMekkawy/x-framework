// Gulp for beginners: https://goo.gl/ZVJvBt

// define locations of used directories
var dirs = {
    src: {
        scss: 'src/scss',
        js: 'src/js',
        img: 'src/img'
    },
    dist: {
        css: 'dist/css',
        js: 'dist/js',
        img: 'dist/img'
    }
};

// The require statement tells Node to look into the node_modules folder
// for a package named gulp. Once the package is found, 
// we assign its contents to the variable gulp. more info: https://goo.gl/ZVJvBt
var gulp = require('gulp');

// gulp-sass: converts Sass to CSS
var sass = require('gulp-sass');

// gulp-concat: helps concatinating files
var concat = require('gulp-concat');

// gulp-cssnano: helps minifing css code
var cssnano = require('gulp-cssnano');

// gulp-rename: helps renaming files
var rename = require('gulp-rename');

// run-sequence: helps run a series of dependent gulp tasks in order https://goo.gl/24fhj4
var runSequence = require('run-sequence')

// gulp-clean: helps removing files and folders https://goo.gl/2eLLuk
var clean = require('gulp-clean');

// gulp-newer: A Gulp plugin for passing through only those source files that are 
// newer than corresponding destination files. more info: https://goo.gl/16jiiw
var newer = require('gulp-newer');

// gulp-imagemin: helps minify PNG, JPEG, GIF and SVG images
// more info: https://goo.gl/uFVm8v
var imagemin = require('gulp-imagemin');

// --------------------------------------------------------------------

// Converts Sass to CSS with gulp-sass plugin
// more info about gulp-sass plugin see: https://goo.gl/XSwgu9
gulp.task('sass', function() {
    return gulp.src([
            // dirs.src.scss + '/x-framework.scss',
            dirs.src.scss + '/test-1.scss',
            dirs.src.scss + '/test-2.scss'
        ])
        .pipe(sass({
                outputStyle: 'compact' // available values: nested, expanded, compact, compressed
            })
            .on('error', sass.logError)
        )
        .pipe(gulp.dest(dirs.dist.css));
});

// --------------------------------------------------------------------

// more info about gulp-concat plugin see: https://goo.gl/N1dbLD

/*
// concatinating javascript files
gulp.task('concatJS', function() {
    return gulp.src([
            dirs.src.js + '/file1.js',
            dirs.src.js + '/file2.js',
            dirs.src.js + '/file3.js'
        ])
        .pipe(concat('build.js'))
        .pipe(gulp.dest(dirs.dist.js));
});
*/

// concatinating css files
gulp.task('concatCSS', function() {
    return gulp.src([
            // dirs.dist.css + '/x-framework.css',
            dirs.dist.css + '/test-1.css',
            dirs.dist.css + '/test-2.css'
        ])
        .pipe(concat('build.css'))
        .pipe(gulp.dest(dirs.dist.css));
});

// --------------------------------------------------------------------

// more info see: https://goo.gl/yhYoKc & https://goo.gl/qWA4T6
gulp.task('minifyCSS', function() {
    return gulp.src(dirs.dist.css + '/*.css')
        .pipe(cssnano())
        .pipe(rename(function(path) {
            path.dirname += '';
            path.basename += '.min';
            path.extname = '.css';
        }))
        .pipe(gulp.dest(dirs.dist.css));
});

// --------------------------------------------------------------------

gulp.task('clean', function() {
    return gulp.src(dirs.dist.css, { read: false })
        .pipe(clean());
});

// --------------------------------------------------------------------

// Minify any new images
gulp.task('minifyImages', function() {
    return gulp.src(dirs.src.img + '/**/*')
        .pipe(newer(dirs.dist.img))
        // .pipe(imagemin({ optimizationLevel: 5 }))
        .pipe(imagemin())
        .pipe(gulp.dest(dirs.dist.img));
});

// --------------------------------------------------------------------


gulp.task('build', function(callback) {
    runSequence('clean', 'sass', 'concatCSS', 'minifyCSS', callback);
});

// --------------------------------------------------------------------

gulp.task('default', function(callback) {
    runSequence('clean', 'sass', 'concatCSS', 'minifyCSS', callback);
});

// --------------------------------------------------------------------

gulp.task('watch', ['build'], function() {
    // apply sass and concatCSS tasks when any file ending with .scss changes in dirs.src.scss dir and sub dirs
    gulp.watch(dirs.src.scss + '/**/*.scss', ['build']);

    gulp.watch(dirs.src.img + '/**/*', ['minifyImages']);

    // apply concatJS task when any file ending with .js changes in dirs.src.js dir and sub dirs
    // gulp.watch(dirs.src.js + '/**/*.js', ['concatJS']);
});