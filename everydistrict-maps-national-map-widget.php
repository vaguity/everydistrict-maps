<?php

// Create widget area
function everydistrictm_create_map_widget_area() {

    register_sidebar( array(
        'name'          => 'EveryDistrict Home Map',
        'id'            => 'everydistrict_home_map',
        'description'   => 'Displays map on home page. For use within page builder.',
        'before_widget' => '<div class="everydistrictm-map-container">',
        'after_widget'  => '</div>',
        'before_title'  => '',
        'after_title'   => '',
    ) );

}

// Register widget
function everydistrictm_load_national_map_widget() {
    register_widget( 'everydistrictm_national_map_widget' );
}

add_action( 'widgets_init', 'everydistrictm_create_map_widget_area' );
add_action( 'widgets_init', 'everydistrictm_load_national_map_widget' );

class everydistrictm_national_map_widget extends WP_Widget {

    public function __construct() {
        $widget_ops = array(
            'classname' => 'everydistrictm_national_map_widget',
            'description' => 'Widget to display EveryDistrict national map on home page.',
        );
        parent::__construct( 'everydistrictm_national_map_widget', 'EveryDistrict National Map Widget', $widget_ops );
    }

    public function widget( $args, $instance ) {
        // outputs the content of the widget
        // Create array of active states with names, links
        $EVERYDISTRICTM_STATE_NAMES = array(
            'alabama'           => 'Alabama',
            'alaska'            => 'Alaska',
            'arizona'           => 'Arizona',
            'arkansas'          => 'Arkansas',
            'california'        => 'California',
            'colorado'          => 'Colorado',
            'connecticut'       => 'Connecticut',
            'delaware'          => 'Delaware',
            'florida'           => 'Florida',
            'georgia'           => 'Georgia',
            'hawaii'            => 'Hawaii',
            'idaho'             => 'Idaho',
            'illinois'          => 'Illinois',
            'indiana'           => 'Indiana',
            'iowa'              => 'Iowa',
            'kansas'            => 'Kansas',
            'kentucky'          => 'Kentucky',
            'louisiana'         => 'Louisiana',
            'maine'             => 'Maine',
            'maryland'          => 'Maryland',
            'massachusetts'     => 'Massachusetts',
            'michigan'          => 'Michigan',
            'minnesota'         => 'Minnesota',
            'mississippi'       => 'Mississippi',
            'missouri'          => 'Missouri',
            'montana'           => 'Montana',
            'nebraska'          => 'Nebraska',
            'nevada'            => 'Nevada',
            'new_hampshire'     => 'New Hampshire',
            'new_jersey'        => 'New Jersey',
            'new_mexico'        => 'New Mexico',
            'new_york'          => 'New York',
            'north_carolina'    => 'North Carolina',
            'north_dakota'      => 'North Dakota',
            'ohio'              => 'Ohio',
            'oklahoma'          => 'Oklahoma',
            'oregon'            => 'Oregon',
            'pennsylvania'      => 'Pennsylvania',
            'rhode_island'      => 'Rhode Island',
            'south_carolina'    => 'South Carolina',
            'south_dakota'      => 'South Dakota',
            'tennessee'         => 'Tennessee',
            'texas'             => 'Texas',
            'utah'              => 'Utah',
            'vermont'           => 'Vermont',
            'virginia'          => 'Virginia',
            'washington'        => 'Washington',
            'west_virginia'     => 'West Virginia',
            'wisconsin'         => 'Wisconsin',
            'wyoming'           => 'Wyoming',
        );

        $active_states = array();
        $active_states_color = '';
        $active_states_links = '';

        foreach ( $instance as $state_id => $state_link ) {
            if ( !empty( $EVERYDISTRICTM_STATE_NAMES[$state_id] ) ) {
                $active_states[$EVERYDISTRICTM_STATE_NAMES[$state_id]] = $state_link;
            }
        }

        $first_active_state_key = reset( array_keys( $active_states ) );
        $last_active_state_key = end( array_keys( $active_states ) );
        foreach ( $active_states as $state_name => $state_link ) {
            $active_states_color .= 'name === \'' . $state_name . '\'';
            if ( $state_name != $last_active_state_key ) {
                $active_states_color .= ' || ';
            }
            if ( $state_name != $first_active_state_key ) {
                $active_states_links .= "\nelse ";
            }
            else {
                $active_states_links .= "\n";
            }
            $active_states_links .= 'if (d.properties.NAME === \'' . $state_name . '\') { window.location.href = \'https://everydistrict.us/map/michigan-senate-map/\'; }';
        } ?>

        <style>
        path {
          stroke-width: 1px;
          stroke: white;
          fill: #61bfe0;
          cursor: pointer;
        }

        path:hover, path.highlighted {
          fill: #408dd3;
        }

        </style>

        <div id="everydistrictm-map-home" style="text-align: center;"></div>

        <script src="https://d3js.org/d3.v3.min.js"></script>
        <script type="text/javascript" src="https://everydistrict.us/wp-content/plugins/everydistrict-maps/src/js/lib/enquire.js"></script>

        <script>
        var buildMap = function(width, height, scale) {

          // Reset container
          if (document.getElementById('everydistrictm-map-home') !== null) {
            document.getElementById('everydistrictm-map-home').innerHTML = '';
          }

          //Map projection
          var projection = d3.geo.albersUsa()
              .scale(scale)
              .translate([width/2,height/2]); //translate to center the map in view

          //Generate paths based on projection
          var path = d3.geo.path()
              .projection(projection);

          //Create an SVG
          var svg = d3.select("#everydistrictm-map-home").append("svg")
              .attr("width", width)
              .attr("height", height);

          //Group for the map features
          var features = svg.append("g")
              .attr("class","features");

          var colorCheck = function(name) {
            if (<?php echo $active_states_color; ?>) {
              return '#408dd3';
            }
            return '#61bfe0';
          }

          d3.json("https://everydistrict.us/wp-content/uploads/2018/07/us.csv",function(error,geodata) {
            if (error) return console.log(error); //unknown error, check the console

            // Create a path for each map feature in the data
            features.selectAll("path")
              .data(geodata.features)
              .enter()
              .append("path")
              .attr("d",path)
              .style('fill', function (d) {
                  return colorCheck(d.properties.NAME)
              })
              .on("click",clicked);
          });

          // Add optional onClick events for features here
          // d.properties contains the attributes (e.g. d.properties.name, d.properties.population)
          function clicked(d, i) {
            <?php echo $active_states_links; ?>
          }
        };

        window.onload = function() {
          buildMap(600, 350, 730.22);

          // Responsive map dimensions
          enquire.register('screen and (max-width: 480px)', {
            match: function() {
              buildMap(400, 250, 450);
            },
            unmatch: function() {
              buildMap(600, 350, 730.22);
            },
            setup: function () {
              buildMap(600, 350, 730.22);
            },
            deferSetup: false,
          });
        };

        </script>
    <?php

    }

    /**
     * Back-end widget form.
     *
     * @see WP_Widget::form()
     *
     * @param array $instance Previously saved values from database.
     */
    public function form( $instance ) {
        // Create state names constant
        $EVERYDISTRICTM_STATE_NAMES = array(
            'alabama'           => 'Alabama',
            'alaska'            => 'Alaska',
            'arizona'           => 'Arizona',
            'arkansas'          => 'Arkansas',
            'california'        => 'California',
            'colorado'          => 'Colorado',
            'connecticut'       => 'Connecticut',
            'delaware'          => 'Delaware',
            'florida'           => 'Florida',
            'georgia'           => 'Georgia',
            'hawaii'            => 'Hawaii',
            'idaho'             => 'Idaho',
            'illinois'          => 'Illinois',
            'indiana'           => 'Indiana',
            'iowa'              => 'Iowa',
            'kansas'            => 'Kansas',
            'kentucky'          => 'Kentucky',
            'louisiana'         => 'Louisiana',
            'maine'             => 'Maine',
            'maryland'          => 'Maryland',
            'massachusetts'     => 'Massachusetts',
            'michigan'          => 'Michigan',
            'minnesota'         => 'Minnesota',
            'mississippi'       => 'Mississippi',
            'missouri'          => 'Missouri',
            'montana'           => 'Montana',
            'nebraska'          => 'Nebraska',
            'nevada'            => 'Nevada',
            'new_hampshire'     => 'New Hampshire',
            'new_jersey'        => 'New Jersey',
            'new_mexico'        => 'New Mexico',
            'new_york'          => 'New York',
            'north_carolina'    => 'North Carolina',
            'north_dakota'      => 'North Dakota',
            'ohio'              => 'Ohio',
            'oklahoma'          => 'Oklahoma',
            'oregon'            => 'Oregon',
            'pennsylvania'      => 'Pennsylvania',
            'rhode_island'      => 'Rhode Island',
            'south_carolina'    => 'South Carolina',
            'south_dakota'      => 'South Dakota',
            'tennessee'         => 'Tennessee',
            'texas'             => 'Texas',
            'utah'              => 'Utah',
            'vermont'           => 'Vermont',
            'virginia'          => 'Virginia',
            'washington'        => 'Washington',
            'west_virginia'     => 'West Virginia',
            'wisconsin'         => 'Wisconsin',
            'wyoming'           => 'Wyoming',
        );

        foreach ( $EVERYDISTRICTM_STATE_NAMES as $state_id => $state_name ) {

            $state_link = !empty( $instance[$state_id] ) ? $instance[$state_id] : '';
            ?>

            <p>
                <label for="<?php echo esc_attr( $this->get_field_id( $state_id ) ); ?>"><?php echo $state_name; ?></label>
                <input class="widefat" type="text" id="<?php echo esc_attr( $this->get_field_id( $state_id ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( $state_id ) ); ?>" value="<?php echo esc_attr( $state_link ); ?>">
            </p>

        <?php
        }
    }

    /**
     * Sanitize widget form values as they are saved.
     *
     * @see WP_Widget::update()
     *
     * @param array $new_instance Values just sent to be saved.
     * @param array $old_instance Previously saved values from database.
     *
     * @return array Updated safe values to be saved.
     */
    public function update( $new_instance, $old_instance ) {
        $instance = array();

        // Loop through all states to see if it's updated, then update instance with new array

        $EVERYDISTRICTM_STATE_NAMES = array(
            'alabama'           => 'Alabama',
            'alaska'            => 'Alaska',
            'arizona'           => 'Arizona',
            'arkansas'          => 'Arkansas',
            'california'        => 'California',
            'colorado'          => 'Colorado',
            'connecticut'       => 'Connecticut',
            'delaware'          => 'Delaware',
            'florida'           => 'Florida',
            'georgia'           => 'Georgia',
            'hawaii'            => 'Hawaii',
            'idaho'             => 'Idaho',
            'illinois'          => 'Illinois',
            'indiana'           => 'Indiana',
            'iowa'              => 'Iowa',
            'kansas'            => 'Kansas',
            'kentucky'          => 'Kentucky',
            'louisiana'         => 'Louisiana',
            'maine'             => 'Maine',
            'maryland'          => 'Maryland',
            'massachusetts'     => 'Massachusetts',
            'michigan'          => 'Michigan',
            'minnesota'         => 'Minnesota',
            'mississippi'       => 'Mississippi',
            'missouri'          => 'Missouri',
            'montana'           => 'Montana',
            'nebraska'          => 'Nebraska',
            'nevada'            => 'Nevada',
            'new_hampshire'     => 'New Hampshire',
            'new_jersey'        => 'New Jersey',
            'new_mexico'        => 'New Mexico',
            'new_york'          => 'New York',
            'north_carolina'    => 'North Carolina',
            'north_dakota'      => 'North Dakota',
            'ohio'              => 'Ohio',
            'oklahoma'          => 'Oklahoma',
            'oregon'            => 'Oregon',
            'pennsylvania'      => 'Pennsylvania',
            'rhode_island'      => 'Rhode Island',
            'south_carolina'    => 'South Carolina',
            'south_dakota'      => 'South Dakota',
            'tennessee'         => 'Tennessee',
            'texas'             => 'Texas',
            'utah'              => 'Utah',
            'vermont'           => 'Vermont',
            'virginia'          => 'Virginia',
            'washington'        => 'Washington',
            'west_virginia'     => 'West Virginia',
            'wisconsin'         => 'Wisconsin',
            'wyoming'           => 'Wyoming',
        );

        foreach ( $EVERYDISTRICTM_STATE_NAMES as $state_id => $state_name ) {
            if ( !empty( $new_instance[$state_id] ) ) {
                $instance[$state_id] = $new_instance[$state_id];
            }
        }

        $instance['title'] = ( ! empty( $new_instance['title'] ) ) ? sanitize_text_field( $new_instance['title'] ) : '';

        return $instance;
    }

}

/*

output:





 */

?>