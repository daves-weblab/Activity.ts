var gulp = require('gulp');
var typescript = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');

var project = typescript.createProject({
    target: 'ES5',
    module: 'commonjs',
    moduleResolution: 'node'
});

gulp.task('build', function() {
    var result = gulp.src('test/*.ts')
        .pipe(sourcemaps.init())
        .pipe(typescript(project));

    return result.js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'));
});