// Gulp for beginners: https://goo.gl/ZVJvBt

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
var rename = require("gulp-rename");

// --------------------------------------------------------------------

// Converts Sass to CSS with gulp-sass plugin
// more info about gulp-sass plugin see: https://goo.gl/XSwgu9
gulp.task('sass', function() {
    return gulp.src([
            // 'src/scss/x-framework.scss',
            'src/scss/test-1.scss',
            'src/scss/test-2.scss'
        ])
        .pipe(sass({
                outputStyle: 'compact' // available values: nested, expanded, compact, compressed
            })
            .on('error', sass.logError)
        )
        .pipe(gulp.dest('dist/css'));
});

// --------------------------------------------------------------------

// more info about gulp-concat plugin see: https://goo.gl/N1dbLD

/*
// concatinating javascript files
gulp.task('concatJS', function() {
    return gulp.src([
            'src/js/file1.js',
            'src/js/file2.js',
            'src/js/file3.js'
        ])
        .pipe(concat('build.js'))
        .pipe(gulp.dest('dist/js'));
});
*/

// concatinating css files
gulp.task('concatCSS', function() {
    return gulp.src([
            // 'src/css/x-framework.css',
            'dist/css/test-1.css',
            'dist/css/test-2.css'
        ])
        .pipe(concat('build.css'))
        .pipe(gulp.dest('dist/css'));
});

// --------------------------------------------------------------------


// more info see: https://goo.gl/yhYoKc & https://goo.gl/qWA4T6
gulp.task('minifyCSS', function() {
    return gulp.src('dist/css/*.css')
        .pipe(cssnano())
        .pipe(rename(function(path) {
            path.dirname += "";
            path.basename += ".min";
            path.extname = ".css";
        }))
        .pipe(gulp.dest('dist/css'));
});

// --------------------------------------------------------------------

// It'll be cumbersome to open up two command line windows and run gulp browserSync 
// and gulp watch separately, so let's get Gulp to run them together by telling the 
// watch task that browserSync must be completed before watch is allowed to run.
gulp.task('watch', ['sass', 'concatCSS', 'minifyCSS'], function() {
    // apply sass and concatCSS tasks when any file ending with .scss changes in src/scss dir and sub dirs
    gulp.watch('src/scss/**/*.scss', ['sass', 'concatCSS', 'minifyCSS']);
    // gulp.watch('dist/css/**/*.css', ['concatCSS', 'minifyCSS']);

    // apply concatJS task when any file ending with .js changes in src/js dir and sub dirs
    // gulp.watch('src/js/**/*.js', ['concatJS']);
});