<?php
function everydistrictm_load_national_map_widget() {
    register_widget( 'everydistrictm_national_map_widget' );
}

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
    }

    public function update( $new_instance, $old_instance ) {
        // processes widget options to be saved
    }

}
