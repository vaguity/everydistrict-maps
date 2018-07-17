<?php
function everydistrictm_map_template() {

    // Set custom metadata fields
    $everydistrictm_map_data_file = get_post_meta( get_the_ID(), '_everydistrictm_map_data_file', true );
    $everydistrictm_map_map = get_post_meta( get_the_ID(), '_everydistrictm_map_map', true );
    $everydistrictm_district_districts = get_post_meta( get_the_ID(), '_everydistrictm_district_repeat_group', true );

    // Stringify the returned content

    $content = '<div class="everydistrictm-map-container everydistrictm-map-container-' . $everydistrictm_map_map . '">
        <div id="everydistrictm-map" class="everydistrictm-map-' . $everydistrictm_map_map . '" data-map-id="' . $everydistrictm_map_map . '" data-map-data-file="' . $everydistrictm_map_data_file . '" data-map-geojson-file="' . plugin_dir_url( __FILE__ ) . 'src/geojson/' . $everydistrictm_map_map . '.geojson">(Loading)</div>
        <script src="' . plugin_dir_url( __FILE__ ) . 'dist/js/everydistrict-maps.js"></script>';
        // Loop through repeatable districts
        foreach ( (array) $everydistrictm_district_districts as $everydistrictm_district_key => $everydistrictm_district_district ) {

            $content .= '<div class="everydistrict-district everydistrict-district-' . $everydistrictm_district_district['district_id'] . '">
                <h3>' . $everydistrictm_district_district['district_name'] . '</h3>
                <div class="everydistrict-district-information">' . wpautop( $everydistrictm_district_district['district_information'] ) . '</div>
            </div>';
        }

    return $content;
} ?>
