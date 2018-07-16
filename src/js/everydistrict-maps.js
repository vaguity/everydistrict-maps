$(window).on('load', function () {

    // TODO: Set fallbacks for these initializing variables
    var mapID = $('#everydistrictm-map').data('map-id')
    var mapGeoJSON = $('#everydistrictm-map').data('map-geojson-file')
    var mapDataFile = $('.everydistrictm-map-container').data('map-data-file')

    // Map dimensions for mobile, in pixels
    var width = 400
    var height = 250
    var scale = 500

    var drawMap = function (desktop) {
        if (desktop === true) {
            width = 800
            height = 500
            scale = 1000
        }
        else {
            width = 400
            height = 250
            scale = 500
        }

        $('#everydistrictm-map').empty()

        // Map projection
        var projection = d3.geo.albersUsa()
            .scale(scale)
            .translate([width / 2, height / 2]) // translate to center the map in view

        // Generate paths based on projection
        var path = d3.geo.path()
            .projection(projection)

        // Create an SVG
        var svg = d3.select('#map').append('svg')
            .attr('width', width)
            .attr('height', height);

        //Group for the map features
        var features = svg.append('g')
            .attr('class', 'features');

        var color = d3.scale.linear()
            .domain([0,1])
            .range(['steelBlue', 'orange']);

        var highlightCheck = function (highlighted) {
            if (typeof(highlighted) !== 'undefined') {
                return color(highlighted)
            }
            else {
                return color(0)
            }
        }

        d3.csv(mapDataFile, function(error, data) {
            if (error) return console.log(error) // unknown error, check the console

            d3.json('assets/geojson/us-states.geojson', function(error, json) {
                if (error) return console.log(error) // unknown error, check the console

                for (var i = 0; i < data.length; i++) {
                    // Grab State Name
                    var dataState = data[i].State;

                    // Grab data value
                    var dataValue = data[i].Highlighted;

                    // Find the corresponding state inside the GeoJSON
                    for (var j = 0; j < json.features.length; j++)  {
                        var jsonState = json.features[j].properties.NAME;
                        if (dataState == jsonState) {

                            // Copy the data value into the JSON
                            json.features[j].properties.highlighted = dataValue;

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
                        return highlightCheck(d.properties.highlighted)
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
            if ($('.map-info .state.' + mapInfoClass).length) {
                $('.map-info .state').removeClass('active')
                $('.map-info .state.' + mapInfoClass).addClass('active')
            }
            else {
                // $('.map-info .state.intro').addClass('active')
            }
        }

        function mouseovered (d, i) {
            d3.select(this).style('fill', 'gold')
        }

        function mouseleft (d, i) {
            d3.select(this).style('fill', function(d) {
                return highlightCheck(d.properties.highlighted)
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
