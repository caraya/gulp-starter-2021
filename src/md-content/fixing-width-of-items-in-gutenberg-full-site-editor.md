# Fixing width of items in Gutenberg full site editor

One of the things I've struggled with when building my block theme using the full site editor is the width of items in the header and footer.

The header kinda works but the footer doesn't and it's limited to the width of the content.

I attended the [Builder Basics](https://www.meetup.com/wordpress-social-learning/events/284383346) webinar where they discussed Block Layout, Alignment, Dimensions, and Spacing

From the talk I learned that there were a few things I was doing wrong.

Originally I used the `group` block as a container  for the header and footer and then nesting columns inside it.

This would work fine (in theory) if I hadn't used CSS to set up the dimensions of the content I want to style.

There's nothing wrong with using CSS but then you have to use CSS everywhere and that defeats, in my opinion, the purpose of using blocks to manage the content. In addition to that, I'm not sure how the styles defined in the editor interact with the styles defined in an external stylesheet.

SO I removed most of the CSS that controlled dimensions on blocks of content and wen back to the site editor to try and get it to work.

One of the things I learned as I've dug deeper into the WordPress Gutenberg experience is that not all blocks have the same attributes, even if you define them as true or enabled in the block editor.

> This means that not all blocks will let you set padding or margins.

So how do we get around this?

If we want to play within the boundaries of the full site editor we have to nest blocks until we get the result we want.

The header has the following structure:

* A cover block containing the cover image for the header
* The blog title
* The blog tagline (or subtitle)
* A navigation block

But even when that structure in place with default settings, the header takes the full width of the content.

In comes the second lesson I learned about sizing and navigation blocks:

> Some sizing blocks don't have a way to set dimensions on them. If you want to provide explicist sizes you have to group items and control measurements from there.

So, the second version of the hader uses the following block structure:

* A cover block containing the cover image for the header
* A group block acting as the outer container for the header text
  * An inner group block holding textual information:
    * The blog title
    * The blog tagline (or subtitle)
  * A navigation block

<figure>
  <img src='https://res.cloudinary.com/dfh6ihzvj/images/v1651292718/publishing-project.rivendellweb.net/fse-header-v1/fse-header-v1.png?_i=AA' alt='Group of Gtutenberg blocks: A cover image element, title, tagline and navigation menu' width='800'>
  <figcaption>Group of Gtutenberg blocks: A cover image element, title, tagline and navigation menu</figcaption>
</figure>
