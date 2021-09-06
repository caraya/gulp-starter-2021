<?php

add_action( 'wp_enqueue_scripts', 'cptt_assets' );
function cptt_assets() {
    wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css' );
    wp_enqueue_style( 'child-style', get_stylesheet_directory_uri() . '/style.css', array( 'parent-style' ));
}


add_action( 'init', 'cptt_custom_post_types' );
function cptt_custom_post_types() {
  register_post_type( 'game',
    array(
      'labels' => array(
        'name' => __( 'Games' ),
        'singular_name' => __( 'Game' )
      ),
      'public' => true,
      'has_archive' => true,
      'supports' => array( 'title', 'editor', 'thumbnail' ),
      'menu_icon' => 'dashicons-laptop'
    )
  );
}
