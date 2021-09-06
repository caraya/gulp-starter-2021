/**
*
function rivendellweb_mime_types( $mime_types ) {
  $mime_types['webp'] = 'image/webp';

  return $mime_types;
}

add_filter( 'upload_mimes', 'rivendellweb_mime_types', 1, 1 );
