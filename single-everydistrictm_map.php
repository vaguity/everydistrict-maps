<?php
function everydistrictm_map_template() {

    // Set custom metadata fields
    $everydistrictm_map_data_file = get_post_meta( get_the_ID(), '_everydistrictm_map_data_file', true );
    $everydistrictm_map_map = get_post_meta( get_the_ID(), '_everydistrictm_map_map', true );
    $everydistrictm_district_districts = get_post_meta( get_the_ID(), '_everydistrictm_district_repeat_group', true );

    // Stringify the returned content

    $content = '<div class="everydistrictm-map-container everydistrictm-map-container-' . $everydistrictm_map_map . '">
        <div id="everydistrictm-map" class="everydistrictm-map everydistrictm-map-' . $everydistrictm_map_map . '" data-map-id="' . $everydistrictm_map_map . '" data-map-data-file="' . $everydistrictm_map_data_file . '" data-map-geojson-file="' . plugin_dir_url( __FILE__ ) . 'src/geojson/' . $everydistrictm_map_map . '.geojson">(Loading map data.)</div>';

    $content .= '</div>
        <div class="everydistrictm-map-information">
            <div class="everydistrictm-district-infobox everydistrictm-district-infobox-0 active"><p>Click a district for more information.</p>
            </div>
        </div>
        <div class="everydistrictm-district-information">';

        // Loop through repeatable districts
        foreach ( (array) $everydistrictm_district_districts as $everydistrictm_district_key => $everydistrictm_district_district ) {

            $content .= '<div class="everydistrictm-district-data everydistrictm-district-data-' . $everydistrictm_district_district['district_id'] . '" data-district-data-id="' . $everydistrictm_district_district['district_id'] . '" style="display: none;">
                <div class="everydistrictm-district-data-information">' . wpautop( $everydistrictm_district_district['district_information'] ) . '</div>
            </div>';
        }

    $content .= '</div>';

    return $content;
} ?>
