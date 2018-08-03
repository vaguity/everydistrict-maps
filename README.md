# EveryDistrict Maps WordPress plugin

## Initial setup

Requires global installs of Node/NPM and Gulp.

`npm install`
`gulp dependencies`
`gulp build`

## JavaScript build process

This plugin uses Webpack bundles to build the JavaScript. Run `gulp build` to build the JS from `src/js`. Run `gulp` on its own to watch for changes to relevant files, which will then run `gulp build` automatically. (This also runs a LiveReload server so you can also use the LiveReload plugin to refresh your local page automatically on each change.) Run `gulp compress` to compress the JavaScript for production.

## Adding maps

This plugin actively uses the GeoJSON files from `src/geojson` on production maps. The shapefiles, SVGs, and PNGs for each map is also saved their respective directories in `src` for archive purposes. These files are saved from the converter on [mapstarter.com](http://mapstarter.com/).

To add a map, convert the shapefiles and add the converted files to the `src` directories. Then add the map name and map size object to `src/js/everydistrict-maps.js`. Each map will have its own scale and center measurement which you can gather and adjust from the initial code provided by the Mapstarter conversion.

To make the map selectable in the WordPress Map post type, add it to the dropdown field found in `everydistrict-maps.php`. The key should correspond to the filename of the GeoJSON file.
