var config = require('../config')
var gulp = require('gulp')
var livereload = require('gulp-livereload')

gulp.task('watch:set', function () {
    global.isWatching = true
})

gulp.task('watch:build', ['watch:set', 'build'])

gulp.task('watch:refresh', function () {
    livereload.reload()
})

gulp.task('watch', ['watch:set', 'watch:build'], function () {
    livereload.listen()
    gulp.watch(config.sass.src, ['build'])
    gulp.watch(config.js.src, ['build'])
    gulp.watch(config.watch.bundles, ['build'])
    gulp.watch(config.watch.templates, ['watch:refresh'])
})
