$(window).on('load', function () {

    // Check if a map container exists on the page
    if ($('#everydistrictm-map').length) {

    var MAP_NAMES = {
        'us': 'U.S.',
        'al-house': 'Alabama House",
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
    'ak': {
        'scale': 1001.7190298163639,
        'center': [-152.39697169572634,63.941461156554055],
    },
    'al': {
        'scale': 5746.229214966338,
        'center': [-86.68115350000001,32.64767064536223],
    },
    'ar': {
        'scale': 6566.489740967758,
        'center': [-92.13115700000001,34.7703558534946],
    },
    'az': {
        'scale': 4760.200189536459,
        'center': [-111.93086650000001,34.215924556828945],
    },
    'ca': {
        'scale': 2736.0127558506005,
        'center': [-119.27040099999999,37.42147639398065],
    },
    'co': {
        'scale': 4653.063869891099,
        'center': [-105.55088849999998,39.026375869727936],
    },
    'ct': {
        'scale': 16827.5525793261,
        'center': [-72.7573845,41.5175784968548],
    },
    'de': {
        'scale': 18247.165637169226,
        'center': [-75.41879850000001,39.148431488613234],
    },
    'fl': {
        'scale': 4000,
        'center': [-83.83314999999999,27.810256323581516],
    },
    'ga': {
        'scale': 5917.804362565443,
        'center': [-83.22244699999999,32.709447618149355],
    },
    'hi': {
        'scale': 1388.0779678810145,
        'center': [-166.5707355,23.742619419925415],
    },
    'ia': {
        'scale': 5024.675097148715,
        'center': [-93.3898825,41.957507729769446],
    },
    'id': {
        'scale': 3258.044035720532,
        'center': [-114.1432955,45.60404885105577],
    },
    'il': {
        'scale': 4530.339632361573,
        'center': [-89.5039175,39.79509768443404],
    },
    'in': {
        'scale': 6290.3603174246855,
        'center': [-86.4411695,39.795074109529274],
    },
    'ks': {
        'scale': 4375.873765006126,
        'center': [-98.32007850000001,38.51381833174138],
    },
    'ky': {
        'scale': 4293.489932273641,
        'center': [-85.76824,37.834193583085266],
    },
    'la': {
        'scale': 6249.097194761123,
        'center': [-91.43008200000001,30.99596218227959],
    },
    'ma': {
        'scale': 9123.152020562578,
        'center': [-71.7182675,42.06762797532906],
    },
    'md': {
        'scale': 7357.6736500266115,
        'center': [-77.268295,38.82313944121967],
    },
    'me': {
        'scale': 5128.826287013031,
        'center': [-69.0169095,45.26293063305582],
    },
    'mi': {
        'scale': 3433.9551403171313,
        'center': [-86.41580499999999,45.06094578377876],
    },
    'mn': {
        'scale': 2813.090181638652,
        'center': [-93.365474,46.52146249906036],
    },
    'mo': {
        'scale': 4892.042288246713,
        'center': [-92.4367735,38.3414451555652],
    },
    'ms': {
        'scale': 5703.55285697154,
        'center': [-89.87644849999998,32.61745153644788],
    },
    'mt': {
        'scale': 2719.0876196224767,
        'center': [-110.04457049999999,46.7297392696228],
    },
    'nc': {
        'scale': 3500,
        'center': [-79.891245,35.226829771185685],
    },
    'nd': {
        'scale': 4357.73708724068,
        'center': [-100.3017035,47.49017418404305],
    },
    'ne': {
        'scale': 3734.4491487533,
        'center': [-99.68090200000003,41.518252182309546],
    },
    'nh': {
        'scale': 9003.814509457906,
        'center': [-71.58393400000001,44.015573574762094],
    },
    'nj': {
        'scale': 10276.628665221194,
        'center': [-74.7267965,40.15382869170064],
    },
    'nm': {
        'scale': 4763.803143356461,
        'center': [-106.02606850000001,34.2138991547539],
    },
    'nv': {
        'scale': 3645.8319438447906,
        'center': [-117.02269700000001,38.58726282915967],
    },
    'ny': {
        'scale': 4130.89431291479,
        'center': [-75.80918299999999,42.797223101880874],
    },
    'oh': {
        'scale': 4046.6907399300744,
        'center': [-82.669426,40.213922117042],
    },
    'ok': {
        'scale': 3809.958456419409,
        'center': [-98.7166135,35.32674771634435],
    },
    'or': {
        'scale': 4030.5618003856625,
        'center': [-120.51487399999999,44.18110328290493],
    },
    'pa': {
        'scale': 5601.456908424744,
        'center': [-77.6047035,41.0071639544236],
    },
    'ri': {
        'scale': 27999.04916634618,
        'center': [-71.491671,41.58404204093345],
    },
    'sc': {
        'scale': 6787.075804562239,
        'center': [-80.94797,33.639686095013424],
    },
    'sd': {
        'scale': 4285.281095239145,
        'center': [-100.2471435,44.238052979917626],
    },
    'tn': {
        'scale': 3769.7211097143336,
        'center': [-85.978599,35.835072004432995],
    },
    'tx': {
        'scale': 2485.933950052416,
        'center': [-100.076969,31.319756783353558],
    },
    'ut': {
        'scale': 5032.648530949241,
        'center': [-111.54701,39.54484286845414],
    },
    'va': {
        'scale': 3872.6544231040416,
        'center': [-79.4588305,38.017967987425216],
    },
    'vt': {
        'scale': 10279.859085128917,
        'center': [-72.4511475,43.88275590149985],
    },
    'wa': {
        'scale': 4161.87913011414,
        'center': [-120.8395285,47.30129573069118],
    },
    'wi': {
        'scale': 5047.395458192792,
        'center': [-89.84676449999999,44.83194533508695],
    }
    'wv': {
        'scale': 6630.890462244728,
        'center': [-80.182129,38.94096697877252],
    }
    'wy': {
        'scale': 4662.364380523693,
        'center': [-107.55452399999998,43.03308359860347],
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

        d3.csv(mapDataFile, function(error, data) {
            if (error) return console.log(error) // unknown error, check the console

            d3.json(mapGeoJSON, function(error, json) {
                if (error) return console.log(error) // unknown error, check the console

                for (var i = 0; i < data.length; i++) {
                    // Grab district
                    var dataDistrict = data[i].District
                    var dataDistrictLower = dataDistrict
                    if (typeof dataDistrictLower === 'string') {
                        dataDistrictLower = dataDistrict.toLowerCase()
                    }

                    // Grab data values
                    var dataHighlighted = data[i].Highlighted;
                    var dataStatus = data[i].Status;

                    // Get copy from page element
                    var dataDistrictCopy = ''

                    if ($('.everydistrictm-district-data-' + dataDistrict + ' .everydistrictm-district-data-information').length) {
                        var dataDistrictCopy = $('.everydistrictm-district-data-' + dataDistrict + ' .everydistrictm-district-data-information').html()
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
                            jsonDistrictLower = jsonDistrict.toLowerCase()
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
            var mapInfoClass = d.properties.NAME.toLowerCase().replace(/ /g, '-')
            console.log(mapInfoClass)
            if ($('.everydistrictm-district-infobox-' + mapInfoClass).length) {
                $('.everydistrictm-district-infobox').removeClass('active')
                $('.everydistrictm-district-infobox-' + mapInfoClass).addClass('active')
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

    }

})
