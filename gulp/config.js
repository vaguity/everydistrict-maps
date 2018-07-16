var src = './src'
var dist = './dist'

var packageType = {
    cssLib: src + '/scss/lib',
    jsLib: src + '/js/lib',
    cssPartial: src + '/scss/lib/reset',
}

var config = {
    src: src,
    dist: dist,
    clean: [
        packageType.cssLib,
        packageType.jsLib,
        packageType.cssPartial,
    ],
    sass: {
        src: src + '/scss/**/*.scss',
        dest: src + '/css',
    },
    js: {
        src: src + '/js/**/*.js',
    },
    staticDependencies: {
        src: src + '/lib',
        packages: [
            {
                name: 'breakpoint-sass',
                path: '/stylesheets/**',
                dest: packageType.cssLib,
            },
            {
                name: 'enquire.js',
                path: '/dist/enquire.min.js',
                rename: 'enquire.js',
                dest: packageType.jsLib,
            },
            {
                name: 'jquery',
                path: '/dist/jquery.min.js',
                rename: 'jquery.js',
                dest: packageType.jsLib,
            },
            {
                name: 'picturefill',
                path: '/dist/picturefill.min.js',
                rename: 'picturefill.js',
                dest: packageType.jsLib,
            },
            {
                name: 'susy',
                path: '/sass/**',
                dest: packageType.cssLib,
            },
        ],
    },
    buildDependencies: {
        src: src + '/lib',
        modernizr: {
            name: 'modernizr',
            dest: packageType.jsLib,
        },
    },
    watch: {
        bundles: src + '/*.js',
        templates: './*.html',
    },
}


module.exports = config
