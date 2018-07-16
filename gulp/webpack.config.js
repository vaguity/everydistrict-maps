var path = require('path')
var webpack = require('webpack')
var uglifyjs = require('uglifyjs-webpack-plugin')

var rootDir = path.resolve(__dirname, '..')
var srcDir = path.resolve(rootDir, 'src')
var distDir = path.resolve(rootDir, 'dist/js')


var uglifyEnvOptions = {
    production: {
        compress: {
            warnings: false,
        },
        comments: false,
        sourceMap: false,
    },
    development: {
        compress: false,
        mangle: false,
        beautify: true,
        comments: true,
        sourceMap: false,
    },
}

var envMode = 'development'
var uglifyOptions = uglifyEnvOptions.development

if (typeof isProduction !== 'undefined') {
    envMode = 'production'
    uglifyOptions = uglifyEnvOptions.production
}

var entries = {
    'everydistrict-maps': srcDir + '/everydistrict-maps.js',
}

var config = {
    mode: envMode,
    context: rootDir,
    entry: entries,
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true,
                        },
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true,
                        },
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
            },
            {
                test: /\.png$/,
                use: [
                    {
                        loader: 'url-loader?limit=8192&mimetype=image/png',
                    },
                ],
            },
            {
                test: /\.(jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
        ],
    },
    output: {
        path: distDir,
        filename: '[name].js',
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new uglifyjs({
            uglifyOptions: uglifyOptions,
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),
    ],
}


module.exports = config
