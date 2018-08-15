<?php
function everydistrictm_load_national_map_widget() {
    register_widget( 'everydistrictm_national_map_widget' );
}

add_action( 'widgets_init', 'everydistrictm_load_national_map_widget' );

class everydistrictm_national_map_widget extends WP_Widget {

function __construct() {
    parent::__construct(
        'everydistrictm_national_map_widget',
        __( 'EveryDistrict National Map Widget', 'everydistrict_widget_domain' ),
        array( 'description' => __( 'Widget to display EveryDistrict national map on home page.', 'everydistrict_widget_domain' ), )
}
