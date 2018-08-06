<?php
/*
Plugin Name: EveryDistrict Maps
Plugin URI: https://github.com/vaguity/everydistrict-maps
Description: Manages EveryDistrict maps and map-related content types.
Version: 1.0.0
Author: H St. Strategy
Author URI: http://www.hststrategy.com/
*/

require_once  __DIR__ . '/includes/cmb2/init.php';

add_action( 'init', 'everydistrictm_create_post_type_everydistrictm_map' );
add_action( 'cmb2_init', 'everydistrictm_map_metabox' );
add_action( 'cmb2_init', 'everydistrictm_district_metabox' );
add_action( 'wp_enqueue_scripts', 'everydistrictm_home_map' );
add_filter( 'the_content', 'everydistrictm_everydistrictm_map_content' );

// TODO: Queue up JS on homepage to load U.S. map

// Create map content type (district, state?)
// Create template for map content type
// Create custom file upload field for each map
// Figure out a way for the JS to point to
// Create custom fields for each district

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
            'az-house'          => __( 'Arizona House', 'cmb2' ),
            'az-senate'         => __( 'Arizona Senate', 'cmb2' ),
            'ct-house'          => __( 'Connecticut House', 'cmb2' ),
            'ct-senate'         => __( 'Connecticut Senate', 'cmb2' ),
            'fl-senate'         => __( 'Florida Senate', 'cmb2'),
            'mi-senate'         => __( 'Michigan Senate', 'cmb2' ),
            'mn-house'          => __( 'Minnesota House', 'cmb2' ),
            'mn-senate'         => __( 'Minnesota Senate', 'cmb2' ),
            'nc-house'          => __( 'North Carolina House', 'cmb2' ),
            'nc-senate'         => __( 'North Carolina Senate', 'cmb2' ),
            'oh-senate'         => __( 'Ohio Senate', 'cmb2' ),
            'pa-house'          => __( 'Pennsylvania House', 'cmb2' ),
            'wi-house'          => __( 'Wisconsin House', 'cmb2' ),
            'wi-senate'         => __( 'Wisconsin Senate', 'cmb2' ),
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
}

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

function everydistrictm_everydistrictm_map_content( $content ) {
    global $post;

    if ( is_single() && in_the_loop() && is_main_query() && get_post_type() === 'everydistrictm_map' ) {

        include('single-everydistrictm_map.php');

        $map_content = everydistrictm_map_template();
        $content = $map_content . $content;
    }

    return $content;
}

function everydistrictm_home_map() {
    wp_enqueue_script( 'everydistrictm-map', plugin_dir_url( __FILE__ ) . 'dist/js/everydistrict-maps.js' );
}

?>
