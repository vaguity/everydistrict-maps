$(window).on('load', function () {

    var MAP_NAMES = {
        'us': 'U.S.',
        'az-house': 'Arizona House',
        'az-senate': 'Arizona Senate',
        'fl-senate': 'Florida Senate',
        'mi-senate': 'Michigan Senate',
        'oh-senate': 'Ohio Senate',
        'pa-house': 'Pennsylvania House',
    }

    // TODO: Set fallbacks for these initializing variables
    var mapID = $('#everydistrictm-map').data('map-id')
    var mapGeoJSON = $('#everydistrictm-map').data('map-geojson-file')
    var mapDataFile = $('#everydistrictm-map').data('map-data-file')
    var mapName = ''

    if (mapID in MAP_NAMES) {
        var mapName = MAP_NAMES[mapID]
    }

    // Map dimensions for mobile, in pixels
    var width = 400
    var height = 250
    var scale = 500

    var setMapSettings = function (mapID) {
        var mapSettings = {
            'scale': 3000,
            'center': [-111.93086650000001,34.215924556828945],
        }
        var mapSizes = {
            'az': {
                'scale': 4760.200189536459,
                'center': [-111.93086650000001,34.215924556828945],
            },
            'fl': {
                'scale': 4000,
                'center': [-83.83314999999999,27.810256323581516],
            },
            'mi': {
                'scale': 3433.9551403171313,
                'center': [-86.41580499999999,45.06094578377876],
            },
            'oh': {
                'scale': 0,
                'center': [],
            },
            'pa': {
                'scale': 0,
                'center': [],
            },
        }
        // Split first two characters from mapID
        var mapState = mapID.substring(0, 2)
        if (mapState in mapSizes) {
            mapSettings = mapSizes[mapState]
        }
        return mapSettings
    }

    var drawMap = function (desktop) {
        console.log('drawmap has run')
        var mapSettings = setMapSettings(mapID)

        if (desktop === true) {
            width = 800
            height = 500
            scale = mapSettings['scale']
        }
        else {
            width = 400
            height = 250
            scale = mapSettings['scale'] / 2
        }

        $('#everydistrictm-map').empty()

        // Map projection
        if (mapID === 'us') {
            var projection = d3.geo.albersUsa()
                .scale(scale)
                .translate([width / 2, height / 2]) // translate to center the map in view
        }
        else {
            var projection = d3.geo.mercator()
                .scale(scale)
                .center(mapSettings['center'])
                .translate([width / 2, height / 2]) //translate to center the map in view
        }

        // Generate paths based on projection
        var path = d3.geo.path()
            .projection(projection)

        // Create an SVG
        var svg = d3.select('#everydistrictm-map').append('svg')
            .attr('width', width)
            .attr('height', height);

        // Group for the map features
        var features = svg.append('g')
            .attr('class', 'features');

        var color = d3.scale.linear()
            .domain([0, 1])
            .range(['steelBlue', 'orange']);

        var highlightCheck = function (highlighted) {
            if (typeof(highlighted) !== 'undefined') {
                return color(highlighted)
            }
            else {
                return color(0)
            }
        }

        var colorCheck = function (status) {
            if (typeof(status) !== 'undefined') {
                // console.log(status)
                // console.log(color(status))
                return color(status)
            }
            else {
                // console.log('fallback color')
                return color(4)
            }
        }

        d3.csv(mapDataFile, function(error, data) {
            if (error) return console.log(error) // unknown error, check the console

            d3.json(mapGeoJSON, function(error, json) {
                if (error) return console.log(error) // unknown error, check the console

                for (var i = 0; i < data.length; i++) {
                    // Grab district
                    var dataDistrict = data[i].District;

                    // Grab data values
                    var dataHighlighted = data[i].Highlighted;
                    var dataStatus = data[i].Status;

                    // Get copy from page element
                    var dataDistrictCopy = ''

                    if ($('.everydistrictm-district-data-' + dataDistrict + ' .everydistrictm-district-data-information').length) {
                        var dataDistrictCopy = $('.everydistrictm-district-data-' + dataDistrict + ' .everydistrictm-district-data-information').html()
                    }

                    // TODO: Prevent this from creating three copies each time
                    $('.everydistrictm-map-information').append('<div class="everydistrictm-district-infobox everydistrictm-district-infobox-' + dataDistrict + '"><h3 class="everydistrictm-district-infobox-name">' + mapName + ' District ' + dataDistrict + '</h3><ul><li class="everydistrictm-district-infobox-incumbent">' + data[i].Incumbent + '</li><li class="everydistrictm-district-infobox-ldi">' + data[i].LDI + '</li></ul><div class="everydistrictm-district-infobox-information">' + dataDistrictCopy + '</div></div>')

                    // Find the corresponding district in the GeoJSON
                    for (var j = 0; j < json.features.length; j++)  {
                        var jsonDistrict = json.features[j].properties.NAME;
                        if (dataDistrict == jsonDistrict) {

                            // Copy the data value into the JSON
                            json.features[j].properties.highlighted = dataHighlighted;
                            json.features[j].properties.status = dataStatus;

                            // Stop looking through the JSON
                            break;
                        }
                    }
                }

                // Create a path for each map feature in the data
                features.selectAll('path')
                    .data(json.features)
                    .enter()
                    .append('path')
                    .attr('d', path)
                    .style('fill', function (d) {
                        return colorCheck(d.properties.status)
                    })
                    .on('click', clicked)
                    .on('mouseover', mouseovered)
                    .on('mouseleave', mouseleft)
            });
        });

        // Add optional onClick events for features here
        // d.properties contains the attributes (e.g. d.properties.name, d.properties.population)
        function clicked (d, i) {
            var mapInfoClass = d.properties.NAME.toLowerCase().replace(/ /g, '-')
            if ($('.everydistrictm-district-infobox-' + mapInfoClass).length) {
                $('.everydistrictm-district-infobox').removeClass('active')
                $('.everydistrictm-district-infobox-' + mapInfoClass).addClass('active')
            }
        }

        function mouseovered (d, i) {
            d3.select(this).style('fill', 'gold')
        }

        function mouseleft (d, i) {
            d3.select(this).style('fill', function (d) {
                return colorCheck(d.properties.status)
            })
        }
    }

    drawMap(false)

    enquire.register('screen and (min-width: 980px)', {
        deferSetup: true,
        setup: function () {
            // Map dimensions for desktop, in pixels
            drawMap(true)
        },
        match: function () {
            drawMap(true)
        },
        unmatch: function () {
            drawMap(false)
        }
    })
})
