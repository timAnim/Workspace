const gulp = require('gulp');
const svgstore = require('gulp-svgstore');
const inject = require('gulp-inject');
gulp.task('default', function () { console.log('hello world'); });
return false
gulp.task('svgstore', () => {
    const svgs = gulp
        .src('test/src/*.svg')
        .pipe(svgstore({ inlineSvg: true }));

    function fileContents(filePath, file) {
        return file.contents.toString();
    }

    return gulp
        .src('test/src/inline-svg.html')
        .pipe(inject(svgs, { transform: fileContents }))
        .pipe(gulp.dest('test/dest'));
});