# Supporting additional media formats in WordPress

I was surprised when the WordPress media uploader blocked uploading WebP images. These are not like SVG graphics that have all sorts of security problems so I'm surprised that WordPress supports the video format (WebM) but not the image format (WebP).

Even if we fix the problem for WebP we will face it again and again when we want to add new image formats like HEIC and AVIF or other media formats like epub ebooks and others. It is true that we could host them elsewhere and just link to them from WordPress but it's hard to manage and coordinate the different resources and locations.

We also need to account for security. As discussed in [Trac 40175](https://core.trac.wordpress.org/ticket/40175) there are major security issues with SVG (the format referenced in that discussion) and potentially other formats you work with.  If you allow collaborators to your site to upload any type of file to your WordPress installation can you guarantee with absolute certainty that they scripts in the ebooks they are uploading are not harmful?

To balance the need for security with the ability to upload the files we need to so the site will work as we want to we have to do a little coding.

As with almost everything in WordPress, setting up the custom mime types is a two step process.


```php
<?php
function rivendellweb_mime_types( $mime_types ) {
  // WebP images
  $mime_types['webp'] = 'image/webp';
  // HEIF Images
  $mime_types['heic'] = 'image/heic';
  $mime_types['heif'] = 'image/heif';
  // HEIF Image Sequence
  $mime_types['heics'] = 'image/heic-sequence';
  $mime_types['heifs'] = 'image/heif-sequence';
  // AVIF Images
  $mime_types['avif'] = 'image/avif';
  // AVIF Image Seuqence
  $mime_types['avis'] = 'image/avif-sequence';

  return $mime_types;
}
add_filter( 'upload_mimes', 'rivendellweb_mime_types', 1, 1 );
```

First we create a function where we add all the mimetypes we want to add and return the `$mime_types` variable with the additional mimetypes.

We then use the [upload_mimes filter](https://codex.wordpress.org/Plugin_API/Filter_Reference/upload_mimes) with the function we just created as the callback.

Be patient.

When I made this change to my production system it took WordPress significantly longer to process WebP images and show me the icons in the media library. I'm not sure if this is because of WordPress or the Cloudinary media management plugin that I use... it's still something worth keeping in mind.
