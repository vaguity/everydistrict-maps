var config = require('../config')
var gulp = require('gulp')
var gulpif = require('gulp-if')
var gulpWebpack = require('webpack-stream')
var handleErrors = require('../util/handleErrors')
var livereload = require('gulp-livereload')
var webpack = require('webpack')


gulp.task('build', function () {
    global.isProduction = typeof global.isProduction !== 'undefined' ? global.isProduction : undefined

    var webpackConfig = require('../webpack.config.js')
    var watchCheck = typeof isWatching !== 'undefined'

    return gulp.src(config.src + '/main.js')
        .pipe(gulpWebpack(webpackConfig, webpack))
        .on('error', handleErrors)
        .pipe(gulp.dest(webpackConfig.output.path))
        .pipe(gulpif(watchCheck, livereload()))
})
