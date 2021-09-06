# WordPress Widget Blocks

If you use WordPress as your CMS and choose to keep the existing theme structure, then the news is relevant to you. Otherwise, you can skip this post.

Among other new, WordPress 5.8 introduces a [Block-Based Widget Editor](https://make.wordpress.org/core/2021/06/29/block-based-widgets-editor-in-wordpress-5-8/), built using the same Gutenberg editor that you use to create posts.

You can now use any block in your theme’s widget areas using the all new Widgets screen and updated Customizer.

For this post, I will concentrated on creating and adding widgets using the widget menu (**appearance -> widgets**) rather than the customizer.

## Creating Widget Blockss

The Widget Menu will now show a list of all the widget areas available to the theme and offer you the option to add blocks to each of those areas.

<figure>
  <img src='https://res.cloudinary.com/dfh6ihzvj/images/v1625870292/publishing-project.rivendellweb.net/block-widgets-1/block-widgets-1.png' alt='Block-based Widget Admin Screen' width='100%'>
  <figcaption>Block-based Widget Admin Screen</figcaption>
</figure>

In order to replicate the existing widget structure for my theme, I will work with Footer Widget Area 1 and Footer Widget Area 2.

When you first load the menu, the area will be blank and you'll get a button to add blocks.

<figure>
  <img src='https://res.cloudinary.com/dfh6ihzvj/images/v1625872151/publishing-project.rivendellweb.net/block-widgets-2/block-widgets-2.png' alt='alt text' width='width' height='height'>
  <figcaption>'alt text'</figcaption>
</figure>

When you click the button to add a widget WordPress will present you a list of available blocks to add and a search box if you already know what block you want. In this case I searched for `search` and then clicked the block.

<figure>
  <img src='https://res.cloudinary.com/dfh6ihzvj/images/v1625872159/publishing-project.rivendellweb.net/block-widgets-3/block-widgets-3.png' alt='alt text' width='width' height='height'>
  <figcaption>'alt text'</figcaption>
</figure>

Each block has its own configuration. In the case of the search block, we get the option of having a search button next to the search input, whether to have a label to indicate what the input does, and the choice to have placeholder text inside the search input.

<figure>
  <img src='https://res.cloudinary.com/dfh6ihzvj/images/v1625872159/publishing-project.rivendellweb.net/block-widgets-4/block-widgets-4.png' alt='alt text' width='width' height='height'>
  <figcaption>'alt text'</figcaption>
</figure>

We need to configure each block individually and the configuration will depend on each widget block.

By configuring each block I was able to recreate the layout of the widgets in my blog's footer :)

## Opting Out

This is a big change, just like Gutenberg but there are good news and news that might be good.

Existing third party widgets continue to work via the Legacy Widget block so, in a worst case scenario, it will continue to work as before.

If you don't want to use widget blocks, you have two options:

* Use the [Classic Widgets](https://wordpress.org/plugins/classic-widgets/) plugin
* Call `remove_theme_support( ‘widgets-block-editor’ )` from within your theme

Now for the 'you'll have to decide if they are good' news.

The classic widget plugin is an all-or-nothing solution. If you want to ease into block-based widgets you'll have to keep the block widget editor and leverage the Legacy Widget block.

Support for the plugin is not indefinite. Just like the Classic Editor plugin, support from the WordPress team will continue as long as there's demand for it.
