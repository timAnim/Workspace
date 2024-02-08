const gulp = require('gulp');

const svgstore = require('gulp-svgstore');
const svgmin = require('gulp-svgmin');
const path = require('path');

gulp.task('svgstore', () => {
    
    console.log(gulp.task)
    return gulp
        .src('test/src/*.svg')
        .pipe(svgmin((file) => {
            const prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            }
        }))
        .pipe(svgstore())
        .pipe(gulp.dest('test/dest'));
});