# Link rel="canonical" what it is and why you want to use it

Since I first saw it in AMP, I thought that `link rel="canonical"` was part of the AMP library. I was surprised to see that it's more than just an AMP thing. In this post we'll discuss what are cannonical links and documents, why we need to use it, and some gotchas to consider before going all in with canonical links.

## What it is and Why should you use them?

There are times when I want to publish the same content in more than one site, like my personal blog and my employer's blog; or I may want to publish content in Medium without loosing the SEO for my own site.

This is where canonical links come in. When two or more pages point to the same content, we can tell the search engine crawler which ones is the primary and that both pages refer to the same content. As far as the Googlebot is concerned, the pages are merged together.

Say, for example, that my primary resource is: `https://blog.mysite.net/` we can do the following:

In all sites where we've added our content, we add the following `link` element to the pages:

```html
<link rel="canonical" href="https://blog.mysite.net/">
```

### Example: Medium and Wordpress

Another example of when this would be useful is when we upload content from another site to the Medium platform. During the import process you can tell Medium where the canonical content is located. This will help people find your content and make it easier to share your content in multiple places.

In your main pages use the standard canonical link:

```html
<link rel="canonical" href="https://blog.mysite.net/">
```

In Medium, use the [import post](https://help.medium.com/hc/en-us/articles/214550207-Import-post) tool to import your posts into the platform. The tool will add a canonical link based on the URL you are importing.

## Gotchas

Canonical links come with their own baggage. The main two issues I find anoying about canonical links is that they may still not create unique references to the original resources. The two main things that concern me are below.

### Be careful with parameters in a URL

Query string parameters like those we use in Analytics or advertising mahy create duplicate entries on the Googlebot search crawl and point to two different pages that are actually the same page with different URL parameters. This may or may not cause problems down the line but it pays to think about it now rather than when you have to put a fire out because of it.

For more information check [Using Rel Canonical on All Pages for Duplicate Content Protection](http://www.thesempost.com/using-rel-canonical-on-all-pages-for-duplicate-content-protection/) from thesempost.com.

### Bing doesn't use Canonical Links!

The other issue is that not all search engines use canonical links. Engines like Bing use a different way to remove different parts of the URL to tell the crawler which of a set of URLs to crawl and which not to.

Bing explains why this is important:

> When you have duplicate problems due to extra URLs parameters, using the URL Normalization feature in the Bing Webmaster Tools is the preferred method as you are telling us which parameters can go away; we call this URL normalization. By normalizing, we mean that our crawler will not visit the URLs with extra parameters except for an occasional test of the quality of the normalization rules.
>
> From: [Better than canonical; URL Normalization](https://blogs.bing.com/webmaster/2012/04/27/better-than-canonical-url-normalization/)

Please check search engines other than Google if they support cannonical links and, if they don't, how to make sure that similar URLs will not be crawled.

## Links and Resources

* [rel=canonical: The ultimate guide](https://yoast.com/rel-canonical/)
* [SEO Best Practices for Canonical URLs + the Rel=Canonical Tag - Whiteboard Friday](https://moz.com/blog/rel-canonical)
* [Consolidate duplicate URLs: Define a canonical page for similar or duplicate pages](https://support.google.com/webmasters/answer/139066?hl=en)
* [Using Rel Canonical on All Pages for Duplicate Content Protection](http://www.thesempost.com/using-rel-canonical-on-all-pages-for-duplicate-content-protection/)
* [5 common mistakes with rel=canonical](https://webmasters.googleblog.com/2013/04/5-common-mistakes-with-relcanonical.html)
* [Set canonical links](https://help.medium.com/hc/en-us/articles/227017408-Set-canonical-links)
* [Better than canonical; URL Normalization](https://blogs.bing.com/webmaster/2012/04/27/better-than-canonical-url-normalization/)
* [Building Websites Optimized for All Platforms (desktop, mobile, etc.)](https://blogs.bing.com/webmaster/2012/03/07/building-websites-optimized-for-all-platforms-desktop-mobile-etc)
* Wordpress Specific
  * [What is Canonical URL and How to Use it in WordPress?](https://www.webnots.com/what-is-canonical-url-and-how-to-use-it-in-wordpress/)
  * [WordPress And Canonical URLs: When And How To Use Them](https://www.elegantthemes.com/blog/tips-tricks/wordpress-canonical-url)
