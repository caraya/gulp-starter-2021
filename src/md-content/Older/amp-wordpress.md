# Adding AMP to my Wordpress blog

<h2 id='introduction'>Introduction</h2>

I love AMP as a technology. As restrictive as it is I think it's so for a reason. We've let the web grow fat and we need a way to work around that until technologies like Promised IndexedDB, ServiceWorkers and other client-side caching and application like functionality are fully implemented across browsers. 

I will never implement an AMP parser by hand and fortunately I don't have to :)

Automattic, the company behind [wordpress.com](https://www.wordpress.com/) and [Wordpress VIP](https://vip.wordpress.com/) has created an [AMP plugin](https://wordpress.org/plugins/amp/) that I use in all my Wordpress blogs. 
 
Once the plugin is installed and activated it will dynamically generate an AMP version for all my posts. If you have pretty permalinks enabled you can view the amp content by appending `amp` to the URL. For example, if we want to view the AMP version of this post: `https://publishing-project.rivendellweb.net/introducing-vtt/` you'd visit: `https://publishing-project.rivendellweb.net/introducing-vtt/amp`.
 
 If you need to pretty permalinks ThemeLab provides instructions on [how to setup pretty permalinks in WordPress](http://www.themelab.com/how-to-set-up-pretty-permalinks-in-wordpress/)
 
 
If you do not have pretty permalinks enabled, you can do the same thing by appending `?amp=1`, i.e. `http://example.com/2016/01/01/amp-on/?amp=1`

The important thing to notice is that enabling the plugin doesn't provide a way to automate the linking of the AMP content to make it viewable in the blog. I'll take care of it in the next section. 

<h2 id="customizing-wordpress">Customizing a Wordpress template</h2>

As we saw earlier creating the AMP content is easy. The plugin provides a good default AMP content is good enough to share but will not modify the theme to show a link to the AMP version of the post... if you know that adding `amp` will show you the AMP content you're good but not many people know that or care it to remember such information. 

Instead we'll customize a Wordpress template to add a link to the post's AMP version of the content currently displayed.

I am  using a [child theme](https://codex.wordpress.org/Child_Themes) of Twenty Seventeen, the default theme for Wordpress as of Wordpress 4.7, so I had to copy the files to the child theme directory. The file I'm modifying is located at: `wp-content/themes/twentyseventeen-child/template-parts/post/content.php`

What I want to do is the following: If the user is viewing a single post we'll add a paragraph with the class 'amp-link' and the content that tells the user that the post is also available as an AMP page with a link to the AMP version of the post.
 
Note that I've only extracted the header element that surrounds the changes I want to make. **This is not the full template**.  

```php
<header class="entry-header">
  <?php
    if ( 'post' === get_post_type() ) :
      echo '<div class="entry-meta">';
        if ( is_single() ) :
          twentyseventeen_posted_on();
        else :
          echo twentyseventeen_time_link();
          twentyseventeen_edit_link();
        endif;
        echo '</div><!-- .entry-meta -->';
    endif;

    if ( is_single() ) {
      the_title( '<h1 class="entry-title">', '</h1>' );?>
      <p class='amp-link'>Also available in <a href='<?php the_permalink(); ?>/amp'>AMP</a></p>
    <?php } else {
        the_title( '<h2 class="entry-title"><a href="' . 
        esc_url( get_permalink() ) . '" rel="bookmark">', '</a></h2>' );
      }
    ?>
</header><!-- .entry-header -->
```

The `amp-link` css is simple, it makes the font 80% of the main body font size and aligns the text to the right. 

```css
.amp-link {
	font-size: 80%;
	text-align:right;
}
```

That's all folks. With these customization AMP content is now available to users without having to go through search engines or any other third party. It's the little things like this that make me really love Wordpress as a platform.  
