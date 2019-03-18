<?php
/*
Plugin Name: EveryDistrict Maps
Plugin URI: https://github.com/vaguity/everydistrict-maps
Description: Manages EveryDistrict maps and map-related content types.
Version: 1.2.0
Author: H St. Strategy
Author URI: http://www.hststrategy.com/
*/

require_once  __DIR__ . '/includes/cmb2/init.php';

add_action( 'init', 'everydistrictm_create_post_type_everydistrictm_map' );
add_action( 'cmb2_init', 'everydistrictm_map_metabox' );
add_action( 'cmb2_init', 'everydistrictm_district_metabox' );
add_action( 'wp_enqueue_scripts', 'everydistrictm_map_scripts' );
add_filter( 'the_content', 'everydistrictm_everydistrictm_map_content' );

// Include widget and widget area for national map on home page
include( 'everydistrict-maps-national-map-widget.php' );

// Create Map custom post type
function everydistrictm_create_post_type_everydistrictm_map() {
    register_post_type( 'everydistrictm_map',
        array(
            'labels'                    => array(
                'name'                  => __( 'Maps' ),
                'singular_name'         => __( 'Map' ),
                'add_new_item'          => __( 'Add New Map' ),
                'edit_item'             => __( 'Edit Map' ),
                'new_item'              => __( 'New Map' ),
                'view_item'             => __( 'View Map' ),
                'search_items'          => __( 'Search Maps' ),
                'not_found'             => __( 'No map found' ),
                'not_found_in_trash'    => __( 'No maps found in trash' ),
                'parent_item_colon'     => __( 'Parent Map' )
            ),
            'public'                => true,
            'hierarchical'          => true,
            'rewrite'               => array( 'slug' => 'map' ),
            'supports'              => array( 'title', 'editor' ),
            'menu_position'         => 9,
            'menu_icon'             => 'dashicons-location-alt',
            'exclude_from_search'   => true,
        )
    );
}

// Create custom fields for map settings
function everydistrictm_map_metabox() {
    $prefix = '_everydistrictm_map_';

    $cmb = new_cmb2_box( array(
        'id'            => $prefix . 'metabox',
        'title'         => __( 'Map', 'cmb2' ),
        'object_types'  => array( 'everydistrictm_map', ),
        'priority'      => 'core',
    ) );

    $cmb->add_field( array(
        'desc'              => __( 'Select map to use.' ),
        'id'                => $prefix . 'map',
        'type'              => 'select',
        'show_option_none'  => false,
        'default'           => 'us-states',
        'options'           => array(
            'us'                => __( 'U.S.', 'cmb2' ),
            'al-house'          => __( 'Alabama House', 'cmb2' ),
            'al-senate'         => __( 'Alabama Senate', 'cmb2' ),
            'ak-house'          => __( 'Alaska House', 'cmb2' ),
            'ak-senate'         => __( 'Alaska Senate', 'cmb2' ),
            'az-house'          => __( 'Arizona House', 'cmb2' ),
            'az-senate'         => __( 'Arizona Senate', 'cmb2' ),
            'ar-house'          => __( 'Arkansas House', 'cmb2' ),
            'ar-senate'         => __( 'Arkansas Senate', 'cmb2' ),
            'ca-house'          => __( 'California House', 'cmb2' ),
            'ca-senate'         => __( 'California Senate', 'cmb2' ),
            'co-house'          => __( 'Colorado House', 'cmb2' ),
            'co-senate'         => __( 'Colorado Senate', 'cmb2' ),
            'ct-house'          => __( 'Connecticut House', 'cmb2' ),
            'ct-senate'         => __( 'Connecticut Senate', 'cmb2' ),
            'de-house'          => __( 'Delaware House', 'cmb2' ),
            'de-senate'         => __( 'Delaware Senate', 'cmb2' ),
            'fl-house'          => __( 'Florida House', 'cmb2'),
            'fl-senate'         => __( 'Florida Senate', 'cmb2'),
            'ga-house'          => __( 'Georgia House', 'cmb2' ),
            'ga-senate'         => __( 'Georgia Senate', 'cmb2' ),
            'hi-house'          => __( 'Hawaii House', 'cmb2' ),
            'hi-senate'         => __( 'Hawaii Senate', 'cmb2' ),
            'id-house'          => __( 'Idaho House', 'cmb2' ),
            'id-senate'         => __( 'Idaho Senate', 'cmb2' ),
            'il-house'          => __( 'Illinois House', 'cmb2' ),
            'il-senate'         => __( 'Illinois Senate', 'cmb2' ),
            'in-house'          => __( 'Indiana House', 'cmb2' ),
            'in-senate'         => __( 'Indiana Senate', 'cmb2' ),
            'ia-house'          => __( 'Iowa House', 'cmb2' ),
            'ia-senate'         => __( 'Iowa Senate', 'cmb2' ),
            'ks-house'          => __( 'Kansas House', 'cmb2' ),
            'ks-senate'         => __( 'Kansas Senate', 'cmb2' ),
            'ky-house'          => __( 'Kentucky House', 'cmb2' ),
            'ky-senate'         => __( 'Kentucky Senate', 'cmb2' ),
            'la-house'          => __( 'Louisiana House', 'cmb2' ),
            'la-senate'         => __( 'Louisiana Senate', 'cmb2' ),
            'me-house'          => __( 'Maine House', 'cmb2' ),
            'me-senate'         => __( 'Maine Senate', 'cmb2' ),
            'md-house'          => __( 'Maryland House', 'cmb2' ),
            'md-senate'         => __( 'Maryland Senate', 'cmb2' ),
            'ma-house'          => __( 'Massachusetts House', 'cmb2' ),
            'ma-senate'         => __( 'Massachusetts Senate', 'cmb2' ),
            'mi-house'          => __( 'Michigan House', 'cmb2' ),
            'mi-senate'         => __( 'Michigan Senate', 'cmb2' ),
            'mn-house'          => __( 'Minnesota House', 'cmb2' ),
            'mn-senate'         => __( 'Minnesota Senate', 'cmb2' ),
            'ms-house'          => __( 'Mississippi House', 'cmb2' ),
            'ms-senate'         => __( 'Mississippi Senate', 'cmb2' ),
            'mo-house'          => __( 'Missouri House', 'cmb2' ),
            'mo-senate'         => __( 'Missouri Senate', 'cmb2' ),
            'mt-house'          => __( 'Montana House', 'cmb2' ),
            'mt-senate'         => __( 'Montana Senate', 'cmb2' ),
            'ne'                => __( 'Nebraska', 'cmb2' ),
            'nv-house'          => __( 'Nevada House', 'cmb2' ),
            'nv-senate'         => __( 'Nevada Senate', 'cmb2' ),
            'nh-house'          => __( 'New Hampshire House', 'cmb2' ),
            'nh-senate'         => __( 'New Hampshire Senate', 'cmb2' ),
            'nj-house'          => __( 'New Jersey House', 'cmb2' ),
            'nj-senate'         => __( 'New Jersey Senate', 'cmb2' ),
            'nm-house'          => __( 'New Mexico House', 'cmb2' ),
            'nm-senate'         => __( 'New Mexiso Senate', 'cmb2' ),
            'ny-house'          => __( 'New York House', 'cmb2' ),
            'ny-senate'         => __( 'New York Senate', 'cmb2' ),
            'nc-house'          => __( 'North Carolina House', 'cmb2' ),
            'nc-senate'         => __( 'North Carolina Senate', 'cmb2' ),
            'nd-house'          => __( 'North Dakota House', 'cmb2' ),
            'nd-senate'         => __( 'North Dakota Senate', 'cmb2' ),
            'oh-house'          => __( 'Ohio House', 'cmb2' ),
            'oh-senate'         => __( 'Ohio Senate', 'cmb2' ),
            'ok-house'          => __( 'Oklahoma House', 'cmb2' ),
            'ok-senate'         => __( 'Oklahoma Senate', 'cmb2' ),
            'or-house'          => __( 'Oregon House', 'cmb2' ),
            'or-senate'         => __( 'Oregon Senate', 'cmb2' ),
            'pa-house'          => __( 'Pennsylvania House', 'cmb2' ),
            'pa-senate'         => __( 'Pennsylvania Senate', 'cmb2' ),
            'ri-house'          => __( 'Rhode Island House', 'cmb2' ),
            'ri-senate'         => __( 'Rhode Island Senate', 'cmb2' ),
            'sc-house'          => __( 'South Carolina House', 'cmb2' ),
            'sc-senate'         => __( 'South Carolina Senate', 'cmb2' ),
            'sd-house'          => __( 'South Dakota House', 'cmb2' ),
            'sd-senate'         => __( 'South Dakota Senate', 'cmb2' ),
            'tn-house'          => __( 'Tennessee House', 'cmb2' ),
            'tn-senate'         => __( 'Tennessee Senate', 'cmb2' ),
            'tx-house'          => __( 'Texas House', 'cmb2' ),
            'tx-senate'         => __( 'Texas Senate', 'cmb2' ),
            'ut-house'          => __( 'Utah House', 'cmb2' ),
            'ut-senate'         => __( 'Utah Senate', 'cmb2' ),
            'vt-house'          => __( 'Vermont House', 'cmb2' ),
            'vt-senate'         => __( 'Vermont Senate', 'cmb2' ),
            'va-house'          => __( 'Virginia House', 'cmb2' ),
            'va-senate'         => __( 'Virginia Senate', 'cmb2' ),
            'wa-house'          => __( 'Washington House', 'cmb2' ),
            'wa-senate'         => __( 'Washington Senate', 'cmb2' ),
            'wv-house'          => __( 'West Virginia House', 'cmb2' ),
            'wv-senate'         => __( 'West Virginia Senate', 'cmb2' ),
            'wi-house'          => __( 'Wisconsin House', 'cmb2' ),
            'wi-senate'         => __( 'Wisconsin Senate', 'cmb2' ),
            'wy-house'          => __( 'Wyoming House', 'cmb2' ),
            'wy-senate'         => __( 'Wyoming Senate', 'cmb2' ),
        ),
    ) );

    $cmb->add_field( array(
        'desc'          => __( 'Upload or select CSV map data file.' ),
        'id'            => $prefix . 'data_file',
        'type'          => 'file',
        'query_args'    => array(
            'type'  => 'text/csv',
        ),
    ) );

    $cmb->add_field( array(
        'desc'          => __( 'Other Chamber Name' ),
        'id'            => $prefix . 'other_chamber_name',
        'type'          => 'text',
    ) );

    $cmb->add_field( array(
        'desc'          => __( 'Other Chamber Link' ),
        'id'            => $prefix . 'other_chamber_link',
        'type'          => 'text',
    ) );
}

// Create custom fields for districts
function everydistrictm_district_metabox() {
    $prefix = '_everydistrictm_district_';

    $cmb = new_cmb2_box( array(
        'id'            => $prefix . 'metabox',
        'title'         => __( 'Districts', 'cmb2' ),
        'object_types'  => array( 'everydistrictm_map', ),
        'priority'      => 'core',
    ) );

    $group_field_id = $cmb->add_field( array (
        'id'        => $prefix . 'repeat_group',
        'type'      => 'group',
        'options'   => array(
            'group_title'   => __( 'District {#}', 'cmb2' ),
            'add_button'    => __( 'Add district', 'cmb2' ),
            'remove_button' => __( 'Remove district', 'cmb2' ),
            'closed'        => true,
        ),
    ) );

    $cmb->add_group_field( $group_field_id, array(
        'name'  => __( 'District ID', 'cmb2' ),
        'id'    => 'district_id',
        'type'  => 'text',
    ) );

    // $cmb->add_group_field( $group_field_id, array(
    //     'name' => __( 'District Name', 'cmb2' ),
    //     'id'   => 'district_name',
    //     'type' => 'text',
    // ) );

    $cmb->add_group_field( $group_field_id, array(
        'name'  => __( 'District Information', 'cmb2' ),
        'id'    => 'district_information',
        'type'  => 'wysiwyg',
    ) );
}

// Display template partial for map content
function everydistrictm_everydistrictm_map_content( $content ) {
    global $post;

    if ( is_single() && in_the_loop() && is_main_query() && get_post_type() === 'everydistrictm_map' ) {

        include( 'single-everydistrictm_map.php' );

        $map_content = everydistrictm_map_template();
        $content = $map_content . $content;
    }

    return $content;
}

// Enqueue JS for maps
function everydistrictm_map_scripts() {
    wp_enqueue_script( 'everydistrictm-map-settings', plugin_dir_url( __FILE__ ) . 'everydistrict-map-settings.js' );
    wp_enqueue_script( 'everydistrictm-map', plugin_dir_url( __FILE__ ) . 'dist/js/everydistrict-maps.js' );
}

?>
