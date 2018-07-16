var gulp = require('gulp')
var imagemin = require('gulp-imagemin')
var newer = require('gulp-newer')

var config = require('../config')
var handleErrors = require('../util/handleErrors')


gulp.task('images', function () {
    return gulp.src(config.src + '/images/**/*')
        .pipe(newer(config.dist + '/images'))
        .pipe(imagemin())
        .on('error', handleErrors)
        .pipe(gulp.dest(config.dist + '/images'))
})
