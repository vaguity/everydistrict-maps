# EveryDistrict Maps WordPress plugin

## Development setup

Requires global installs of Node/NPM and Gulp.

`npm install`  
`gulp dependencies`  
`gulp build`

## JavaScript build process

This plugin uses Webpack bundles to build the JavaScript. Run `gulp build` to build the JS from [`src/js`](src/js). Run `gulp` on its own to watch for changes to relevant files, which will then run `gulp build` automatically. (This also runs a LiveReload server so you can also use the LiveReload plugin to refresh your local page automatically on each change.) Run `gulp compress` to compress the JavaScript for production.

## Map files

This plugin links to the GeoJSON files from [`src/geojson`](src/geojson) on production map posts. The shapefiles, SVGs, and PNGs for each map is also saved their respective directories in `src` for archive purposes – they are not used in production or in the build process. The SVG and PNG files are saved from the converter on [mapstarter.com](http://mapstarter.com/), but other tools could be used.

## Adding maps

This process can be done on GitHub by adding and editing files directly with the web interface and committing the changes. You can find documentation for editing files on GitHub [here](https://help.github.com/articles/editing-files-in-your-repository/). You'll need a GitHub account to edit the files here. Contact the owner of this repository or H St. Strategy for access.

You may also save this repository locally, make edits there, and upload them directly, though those changes will not be preserved in this repository unless they're pushed.

To add a map:

1. Convert the shapefiles to GeoJSON and add the converted files to their respective [`src`](src) directories. (The GeoJSON file in [`src/geojson`](src/geojson) is the only converted file required, but I've saved the others for backup purposes in other directories.) The GeoJSON file should be named with the two-letter state postal code, then a hyphen followed by the chamber name (e.g., `az-house.geojson`).
1. Retrieve the `center` and `scale` values needed to render the map effectively; starting values can be generated from the tool at [mapstarter.com](http://mapstarter.com/). When generating the starting values, make sure the projection is set to Mercator, with the width 750px and the height 500px. (You may need to edit the scale slightly from its initial value.) After converting the shapefile, navigate to the "Download" tab and copy the values from the code below under the "//Map projection" comment. Take these values and add them to the [`everydistrict-map-settings.js`](everydistrict-map-settings.js) file.
1. Add the chamber to the selection list in [`everydistrict-maps.php`](everydistrict-maps.php). The array that creates the list is found under the section that starts with "Select map to use." The key should match the filename of the GeoJSON file (e.g., `az-house`, with the full line reading: `'az-house'          => __( 'Arizona House', 'cmb2' ),`.
1. After making all the above changes and committing them to the repo, download this repo as a zip file. You can either upload it directly to the WordPress site's `wp-content/plugins` directory via SFTP or delete the plugin on the live site and upload and re-activate it.

## Linking from home page map

To highlight a state and link it to a map page, go to the Appearance -> Widgets menu in WordPress. The EveryDistrict Home Map widget area should have the EveryDistrict National Map Widget added to it. Open it to see the form, which includes all 50 states. If a state's text field has a link to a page, it will be highlighted and linked on the home page map.
