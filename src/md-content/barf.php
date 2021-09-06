function rivendellweb_add_navlinks_to_post_rest( $response, $post, $request ) {
  global $post;
  // Get the next post.
  $next = get_adjacent_post( false, '', false );
  // Get the previous post.
  $previous = get_adjacent_post( false, '', true );
  // Format them and only send the data we need
  // or null, if there is no next/previous post
  $response->data['next'] = ( is_a( $next, 'WP_Post') ) ? array( "title" => get_the_title( $next->ID ), "link" => get_post_field( 'post_name', $previous ) ) : null;
  $response->data['previous'] = ( is_a( $previous, 'WP_Post') ) ? array( "title" => get_the_title( $previous->ID ), "link" => get_post_field( 'post_name', $previous ) ) : null;

  return $response;
}

add_filter( 'rest_prepare_post', 'rivendellweb_add_navlinks_to_post_rest', 10, 3 );
