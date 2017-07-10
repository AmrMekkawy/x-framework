// define locations of the used directories
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

// "require" statement tells Node to look into the node_modules folder
// for the specified package. Once the package is found, we assign its
// contents to a variable so that we can use it later in the code
var gulp = require('gulp');

// gulp-sass: a plugin that converts sass to css
// more info: https://goo.gl/XSwgu9
var sass = require('gulp-sass');

// gulp-concat: a plugin that helps concatinating files
// more info: https://goo.gl/N1dbLD
var concat = require('gulp-concat');

// gulp-cssnano: a plugin that helps minifing css code
// more info: https://goo.gl/yhYoKc
var cssnano = require('gulp-cssnano');

// gulp-rename: a plugin that helps renaming files
// more info: https://goo.gl/qWA4T6
var rename = require('gulp-rename');

// run-sequence: a plugin that helps run a series of dependent gulp 
// tasks in order. more info: https://goo.gl/24fhj4
var runSequence = require('run-sequence')

// gulp-clean: a plugin that helps removing/deleting files and folders
// more info: https://goo.gl/2eLLuk
var clean = require('gulp-clean');

// gulp-newer: a plugin that passing through only those source files
// that are newer than corresponding destination files
// more info: https://goo.gl/16jiiw
var newer = require('gulp-newer');

// gulp-imagemin: a plugin that help minify png, jpeg, gif & svg images
// more info: https://goo.gl/uFVm8v
var imagemin = require('gulp-imagemin');

// --------------------------------------------------------------------

// converting sass to css 
gulp.task('sass', function() {
    return gulp.src([
            // dirs.src.scss + '/test-1.scss',
            // dirs.src.scss + '/test-2.scss',
            dirs.src.scss + '/x-framework.scss'
        ])
        .pipe(sass({
                // available values: nested, expanded, compact, compressed
                outputStyle: 'compact'
            })
            .on('error', sass.logError)
        )
        .pipe(gulp.dest(dirs.dist.css));
});

// --------------------------------------------------------------------

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
            // dirs.dist.css + '/test-1.css',
            // dirs.dist.css + '/test-2.css',
            dirs.dist.css + '/x-framework.css'
        ])
        // .pipe(concat('build.css'))
        .pipe(concat('x-framework.css'))
        .pipe(gulp.dest(dirs.dist.css));
});

// --------------------------------------------------------------------

// minifying and renaming css
gulp.task('minifyCSS', function() {
    return gulp.src([dirs.dist.css + '/**/*.css'])
        .pipe(cssnano())
        .pipe(rename(function(path) {
            path.dirname += '';
            path.basename += '.min';
            path.extname = '.css';
        }))
        .pipe(gulp.dest(dirs.dist.css));
});

// --------------------------------------------------------------------

// removing/deleting existing css files
gulp.task('deleteCSS', function() {
    return gulp.src([
            dirs.dist.css + '/**/*.css',
            dirs.dist.css + '/**/*.map'
        ], { read: false })
        .pipe(clean());
});

// --------------------------------------------------------------------

// a task that run some other tasks in sequence for building css files
gulp.task('buildCSS', function(callback) {
    // running tasks in sequance
    runSequence('deleteCSS', 'sass', 'concatCSS', 'minifyCSS', callback);
});

// --------------------------------------------------------------------

// minifying new images
gulp.task('minifyImages', function() {
    return gulp.src(dirs.src.img + '/**/*')
        .pipe(newer(dirs.dist.img))
        // .pipe(imagemin())
        .pipe(imagemin({ optimizationLevel: 5 }))
        .pipe(gulp.dest(dirs.dist.img));
});

// --------------------------------------------------------------------

gulp.task('watch', ['buildCSS', 'minifyImages'], function() {
    // apply buildCSS task when any file ending with .scss changes
    // in dirs.src.scss directory and sub directories
    gulp.watch(dirs.src.scss + '/**/*.scss', ['buildCSS']);

    // apply minifyImages task when any new image is being added
    // to dirs.src.img directory and sub directories
    gulp.watch(dirs.src.img + '/**/*', ['minifyImages']);

    // apply buildJS task when any file ending with .js changes 
    // in dirs.src.js directory and sub directories
    // gulp.watch(dirs.src.js + '/**/*.js', ['buildJS']);
});

// --------------------------------------------------------------------

// the default task that should be executed if we type the command 
// "gulp" in the terminal
gulp.task('default', function(callback) {
    // running tasks in sequance
    runSequence('buildCSS', 'minifyImages', 'watch', callback);
});