var config = require('../config')
var del = require('del')
var fs = require('fs')
var gulp = require('gulp')
var gulpif = require('gulp-if')
var orderedMergeStream = require('ordered-merge-stream')
var rename = require('gulp-rename')
var handleErrors = require('../util/handleErrors')
var modernizr = require('modernizr')
var modernizrConfig = require('../modernizr.config.json')


gulp.task('clean:dependencies', function () {
    var cleanDependency = function (dependency) {
        del.sync([dependency + '/**'], { force: true })
        fs.mkdir(dependency)
    }

    config.clean.forEach(cleanDependency)
})

gulp.task('static:dependencies', ['clean:dependencies'], function () {
    var depStreams = []

    var processDependency = function (dependency, index, array) {
        var dependencyRenameCheck = typeof dependency.rename !== 'undefined'
        var dependencySource = './node_modules/' + dependency.name

        if (typeof dependency.path !== 'undefined') {
            dependencySource = dependencySource + dependency.path
        }

        if (typeof dependency.dest === 'object') {
            var depSourcesLength = dependency.dest.length
            for (var i = 0; i < depSourcesLength; i++) {
                var dependencySourceItem = dependencySource + dependency.dest[i].path
                depStreams.push(gulp.src(dependencySourceItem)
                    .on('error', handleErrors)
                    .pipe(gulp.dest(dependency.dest[i].dest))
                )
            }
        }
        else {
            depStreams.push(gulp.src(dependencySource)
                .pipe(gulpif(dependencyRenameCheck, rename(dependency.rename)))
                .on('error', handleErrors)
                .pipe(gulp.dest(dependency.dest))
            )
        }

        if (index === (array.length - 1)) {
            return orderedMergeStream(depStreams)
        }
    }

    config.staticDependencies.packages.forEach(processDependency)
})

gulp.task('build:dependencies', ['static:dependencies'], function () {
    modernizr.build(modernizrConfig, function (result) {
        fs.writeFile(config.buildDependencies.modernizr.dest + '/modernizr.js', result)
    })
})

gulp.task('dependencies', ['build:dependencies'])
