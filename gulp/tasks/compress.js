var gulp = require('gulp')
var replace = require('gulp-replace')


gulp.task('compress:set', function () {
    global.isProduction = true
})

gulp.task('compress:build', ['compress:set', 'build'], function () {
    var timestamp = (new Date() / 1E3 | 0)
    gulp.src('./assets/updated.txt')
        .pipe(replace(/\n/g, ''))
        .pipe(replace(/(.+|)/g, ''))
        .pipe(replace(/(.+|)$/, timestamp))
        .pipe(gulp.dest('./assets'))
})

gulp.task('compress', ['compress:set', 'compress:build'])
