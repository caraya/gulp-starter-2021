# What to do if you're not ready for Gutenberg?

A question that I've seen frequently in Quora and elsewhere since the Gutenberg editor wasn anounced a few years ago was how to disable it and keep the existing, now classic, editor.

Rather than answer the question over and over again I thought I'd document the two alternatives that I now recommend using if Guttenberg is not an option.

## Why wouldn't Gutenberg be a good option?

Even though Gutenberg has been around for a few years, there is no parity with toolss like ACF and others. Even though newer versions of ACF provide Gutenberg blocks, the technology is not proven and we don't know how much work we'll have to do to make an equivalent version of what's already working; see [ACF 5.8 – Introducing ACF Blocks for Gutenberg](https://www.advancedcustomfields.com/blog/acf-5-8-introducing-acf-blocks-for-gutenberg/) for more information on how to create blocks using Gutenberg.

## Options

So, if you're not ready to spend time or money on updating your project to work in Gutenberg what are your options?

### Classic Editor

The [classic editor plugin](https://wordpress.org/plugins/classic-editor/) is the WordPress Core Team supported way to keep the classic editor and disable Gutenberg altogether.

Because Gutenberg is disabled, all the plugins that work with the classic editor will work.

The downside is that the plugin developers have indicated that after december 31, 2021 support for the plugin is not guaranteed. From a message in this [support thread](https://wordpress.org/support/topic/the-classic-editor-plugin-will-be-officially-supported-until-december-31-2021/):

> We are guaranteeing support until at the very least 2022, at which time we will re-evaluate the need. That means if we see that the supermajority of you having movedover to using the new editing experience, there’s no need to provide maintenance by core for this feature, but if there’s a need for it, we will keep supporting it our selves beyond that.
>
> Of course, if it does come to a point where there’s too few users for us to dedicate many resources, we’ll not put of the possibility of someone else taking over the maintenance of the plugin, or we may have found an even better solution by then.
>
> In short, the date we’ve provided is to give everyone an absolute minimum time frame to work with, so they know that they won’t have to be worried for the first coupld of years at least.

There are alternatives to the classic editor plugin but they are not supported by the WordPress team and, to me, introduce a certain level of uncertainty whether the plugins will continue to work once the official timeline is up.

This is the option I've chosen for this blog so far. I may change my mind in the process and haven't decided if I want a full-on Gutenberg experience or if I want a more granular experience for the experiments that I want to work with moving forward.

### Gutenberg Ramp

[Gutenberg Ramp](https://wordpress.org/plugins/gutenberg-ramp/) provides a gentler alternative to completely removing Gutenberg on your site.

The plugin allows you to selectively use Gutenberg in some or all the content on your site.

One idea I'm toying with is to create a custom post type for longer free-form essays that can leverage a larger portion of the Gutenberg ecosystem without changing the way we author regular content.

Using Gutenberg Ramp, we can specify that we only want to use Gutenberg for essays and leave regular posts and pages running on the classic editor.

The first drawback of the plugin is that it hasn't been tested in the last versions of WordPress and that always raises a flag for me.

Another issue worth considering is that the styles in the editor are not necessarily the same styles that the end user will see. This may cause problems during development, particularly with third-party blocks.

I will write this experiment in a separate post.
