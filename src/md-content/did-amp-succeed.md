# Did AMP succeed?

While it's true that AMP may not have succeeded in significantly improving the speed of mobile pages as shown in Tim Kadlec's [AMP analysis](https://timkadlec.com/remembers/2018-03-19-how-fast-is-amp-really/) it is also true that some aspects of the project and their rules are needed and that we should figure out ways to be stricter in enforcing them without losing the web of old.

I'm not saying that Space Jam should stop working, far from it, but our web apps have grown so large that we need some way to reduce the trend and consume less resources, particularly in lower end mobile devices.

This post will cover a few issues that AMP has how we can enforce them outside an AMP context.

## The cases I want to cover

There are several cases that are important but I want to highlight a few of them: Explicit image dimensions and the limit on inlined CSS.

### Explicit image dimensions

In early web pages, we specified height and width of images using the `width` and `height` attributes directly in the image tag.

At some point we stopped doing that and relied on browsers and the image's intrisic size to layout the image and CSS to do image sizing. For a while, this worked well.

But the [Core Web Vitals](https://web.dev/vitals/) include a [Cumulative Layout Shift (CLS)](https://web.dev/cls/) metric which measures the largest burst of layout shift scores for every unexpected layout shift that occurs during the entire lifespan of a page.

[amp-img](https://amp.dev/documentation/components/amp-img/) makes height and width attributes mandatory for all images on a page. This reduces the possibility of a layout shift because of image loading and it gives the AMP runtime the aspect ratio of the image before it is loaded.

## LImiting the size of inline CSS
