// Gulp for beginners: https://goo.gl/ZVJvBt

// The require statement tells Node to look into the node_modules folder
// for a package named gulp. Once the package is found, 
// we assign its contents to the variable gulp. more info: https://goo.gl/ZVJvBt
var gulp = require('gulp');

// --------------------------------------------------------------------

// Requires the gulp-sass plugin
var gulpSass = require('gulp-sass');

// --------------------------------------------------------------------

/*
// As you can see, a real task takes in two additional gulp methods — gulp.src and gulp.dest.
// gulp.src tells the Gulp task what files to use for the task, 
// while gulp.dest tells Gulp where to output the files once the task is completed.
gulp.task('task-name', function() {
    return gulp.src('source-files') // Get source files with gulp.src
        .pipe(aGulpPlugin()) // Sends it through a gulp plugin
        .pipe(gulp.dest('destination')); // Outputs the file in the destination folder
});

// We can now begin to write a gulp task with this gulp variable.
gulp.task('hello', function() {
    console.log('Hello Zell');
});
*/

// --------------------------------------------------------------------

// Converts Sass to CSS with gulp-sass plugin
gulp.task('sass', function() {
    return gulp.src([
            'src/scss/test.scss',
            'src/scss/x-framework.scss'
        ])
        .pipe(gulpSass({
                outputStyle: 'compact' // nested, expanded, compact, compressed
            })
            .on('error', gulpSass.logError)
        )
        .pipe(gulp.dest('dist/css'));
});

// --------------------------------------------------------------------

// Watch files for changes
gulp.task('watch', function() {
    // Gets all files ending with .scss in src/scss and children dirs
    gulp.watch(['src/scss/**/*.scss'], ['sass']);

    // Other watchers
});