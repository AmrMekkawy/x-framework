// Gulp for beginners: https://goo.gl/ZVJvBt

// The require statement tells Node to look into the node_modules folder
// for a package named gulp. Once the package is found, 
// we assign its contents to the variable gulp. more info: https://goo.gl/ZVJvBt
var gulp = require('gulp');

// gulp-sass: converts Sass to CSS
var sass = require('gulp-sass');

// gulp-concat: helps concatinating files
var concat = require('gulp-concat');

// --------------------------------------------------------------------

// Converts Sass to CSS with gulp-sass plugin
// more info about gulp-sass plugin see: https://goo.gl/XSwgu9
gulp.task('sass', function() {
    return gulp.src([
            'src/scss/test.scss',
            'src/scss/x-framework.scss'
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
gulp.task('concatJS', function() {
    return gulp.src([
            'src/js/file1.js',
            'src/js/file2.js',
            'src/js/file3.js'
        ])
        .pipe(concat('build.js'))
        .pipe(gulp.dest('dist/js'));
});

// --------------------------------------------------------------------

// It'll be cumbersome to open up two command line windows and run gulp browserSync 
// and gulp watch separately, so let's get Gulp to run them together by telling the 
// watch task that browserSync must be completed before watch is allowed to run.
gulp.task('watch', function() {
    // apply sass task when any file ending with .scss changes in src/scss dir and sub dirs
    gulp.watch('src/scss/**/*.scss', ['sass']);
    // apply concatJS task when any file ending with .js changes in src/js dir and sub dirs
    gulp.watch('src/js/**/*.js', ['concatJS']);
});