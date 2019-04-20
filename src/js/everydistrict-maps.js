$(window).on('load', function () {

    // Check if a map container exists on the page
    if ($('#everydistrictm-map').length) {

    var MAP_NAMES = {
        'us': 'U.S.',
        'az-house': 'Arizona House',
        'az-senate': 'Arizona Senate',
        'ct-house': 'Connecticut House',
        'ct-senate': 'Connecticut Senate',
        'fl-senate': 'Florida Senate',
        'mi-senate': 'Michigan Senate',
        'mn-house': 'Minnesota House',
        'mn-senate': 'Minnesota Senate',
        'nc-house': 'North Carolina House',
        'nc-senate': 'North Carolina Senate',
        'oh-senate': 'Ohio Senate',
        'pa-house': 'Pennsylvania House',
        'wi-house': 'Wisconsin House',
        'wi-senate': 'Wisconsin Senate',
    }

    // TODO: Set fallbacks for these initializing variables
    var mapID = $('#everydistrictm-map').data('map-id')
    var mapGeoJSON = $('#everydistrictm-map').data('map-geojson-file')
    var mapDataFile = $('#everydistrictm-map').data('map-data-file')
    var mapName = ''

    if (window.location.origin === 'http://localhost:8888') {
        mapDataFile = mapDataFile.replace('https://www.everydistrict.us/', 'http://localhost:8888/everydistrict.us/')
    }

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
        // Check for globally-set map settings, otherwise fall back
        if (typeof EVERYDISTRICT_MAP_SETTINGS !== null) {
            var mapSizes = EVERYDISTRICT_MAP_SETTINGS
        }
        else {
            var mapSizes = {
                'us': {
                    'scale': 730.2209486090715,
                    'center': [],
                },
                'az': {
                    'scale': 4760.200189536459,
                    'center': [-111.93086650000001,34.215924556828945],
                },
                'ct': {
                    'scale': 16827.5525793261,
                    'center': [-72.7573845,41.5175784968548],
                },
                'fl': {
                    'scale': 4000,
                    'center': [-83.83314999999999,27.810256323581516],
                },
                'mi': {
                    'scale': 3433.9551403171313,
                    'center': [-86.41580499999999,45.06094578377876],
                },
                'mn': {
                    'scale': 2813.090181638652,
                    'center': [-93.365474,46.52146249906036],
                },
                'nc': {
                    'scale': 3500,
                    'center': [-79.891245,35.226829771185685],
                },
                'oh': {
                    'scale': 4046.6907399300744,
                    'center': [-82.669426,40.213922117042],
                },
                'pa': {
                    'scale': 5601.456908424744,
                    'center': [-77.6047035,41.0071639544236],
                },
                'wi': {
                    'scale': 5047.395458192792,
                    'center': [-89.84676449999999,44.83194533508695],
                }
            }
        }
        // Split first two characters from mapID
        var mapState = mapID.substring(0, 2)
        if (mapState in mapSizes) {
            mapSettings = mapSizes[mapState]
        }
        return mapSettings
    }

    var drawMap = function (desktop) {
        var mapSettings = setMapSettings(mapID)

        if (desktop === true) {
            width = 750
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

        //Create zoom/pan listener
        //Change [1,Infinity] to adjust the min/max zoom scale
        var zoom = d3.behavior.zoom()
            .scaleExtent([1, 4])
            .on('zoom', zoomed);

        svg.call(zoom);

        var color = d3.scale.linear()
            .domain([0, 1, 2, 3])
            .range(['#d13f44', '#fa8072', '#faf372', '#61bfe0']);

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
                return color(status)
            }
            else {
                return color(4)
            }
        }

        var parseDistrictName = function (districtName) {
            var newDistrictName = districtName
            newDistrictName = newDistrictName.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and').replace(/,/g, '').replace(/\(/g, '').replace(/\)/g, '').replace(/\./g, '')
            return newDistrictName
        }

        d3.csv(mapDataFile, function(error, data) {
            if (error) return console.log(error) // unknown error, check the console

            d3.json(mapGeoJSON, function(error, json) {
                if (error) return console.log(error) // unknown error, check the console

                for (var i = 0; i < data.length; i++) {
                    // Grab district
                    var dataDistrict = data[i].District
                    var dataDistrictLower = dataDistrict
                    if (typeof dataDistrictLower === 'string') {
                        dataDistrictLower = parseDistrictName(dataDistrictLower)
                    }

                    // Grab data values
                    var dataHighlighted = data[i].Highlighted;
                    var dataStatus = data[i].Status;

                    // Get copy from page element
                    var dataDistrictCopy = ''

                    if ($('.everydistrictm-district-data-' + dataDistrictLower + ' .everydistrictm-district-data-information').length) {
                        var dataDistrictCopy = $('.everydistrictm-district-data-' + dataDistrictLower + ' .everydistrictm-district-data-information').html()
                    }

                    // Prevent duplicate elements from being created
                    if ($(document.getElementsByClassName('everydistrictm-district-infobox-' + dataDistrictLower)).length) {
                    }
                    else {
                        // Create info elements
                        $('.everydistrictm-map-information').append('<div class="everydistrictm-district-infobox everydistrictm-district-infobox-' + dataDistrictLower + '"><h3 class="everydistrictm-district-infobox-name">' + mapName + ' District ' + dataDistrict + '</h3><ul><li class="everydistrictm-district-infobox-incumbent">' + data[i].Incumbent + '</li><li class="everydistrictm-district-infobox-ldi">LDI: ' + data[i].LDI + '</li></ul><div class="everydistrictm-district-infobox-information">' + dataDistrictCopy + '</div></div>')
                    }

                    // Find the corresponding district in the GeoJSON
                    for (var j = 0; j < json.features.length; j++)  {
                        var jsonDistrict = json.features[j].properties.NAME
                        var jsonDistrictLower = jsonDistrict
                        if (typeof jsonDistrict === 'string') {
                            jsonDistrictLower = parseDistrictName(jsonDistrictLower)
                        }
                        if (dataDistrictLower == jsonDistrictLower) {
                            // Copy the data value into the JSON
                            json.features[j].properties.highlighted = dataHighlighted
                            json.features[j].properties.status = dataStatus

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

            })
        })

        // Add optional onClick events for features here
        // d.properties contains the attributes (e.g. d.properties.name, d.properties.population)
        function clicked (d, i) {
            d3.selectAll('path')
                .style('fill', function (d) {
                    return colorCheck(d.properties.status)
                })
            d3.select(this).style('fill', '#faf032')
            // TODO: Add check for NAME property
            // console.log(d.properties.NAME)
            var mapInfoClass = parseDistrictName(d.properties.NAME)
            // console.log('District Name: ' + mapInfoClass)
            if ($('.everydistrictm-district-infobox-' + mapInfoClass).length) {
                $('.everydistrictm-district-infobox').removeClass('active')
                $('.everydistrictm-district-infobox-' + mapInfoClass).addClass('active')
            }
            else {
                console.log('EDMError 1')
            }
        }

        function mouseovered (d, i) {
            d3.select(this).style({
                'opacity': '0.7',
            })
        }

        function mouseleft (d, i) {
            d3.select(this).style({
                'opacity': '1',
            })
        }

        // Update map on zoom/pan
        function zoomed () {
            features.attr('transform', 'translate(' + zoom.translate() + ')scale(' + zoom.scale() + ')')
                .selectAll('path').style('stroke-width', 1 / zoom.scale() + 'px' );
            if (zoom.scale() > 1) {
                $('.everydistrictm-map').addClass('bordered')
            }
            else {
                $('.everydistrictm-map').removeClass('bordered')
            }
        }
    }

    // TODO: Check if it's necessary to load the map first
    // drawMap(false)

    // TODO: This enquire call runs the function multiple times
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

    }

})
