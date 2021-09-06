# Best practices

I posted this as an answer to [this question](https://www.quora.com/What-are-the-best-practices-for-optimizing-resources-JavaScript-CSS-images-used-by-an-HTML-page/) in Quora and I thought I would post it here and expand on it a little bit with things I thought about after I wrote the answer.

This is not an exhaustive list of performance best practices. It's what I use and how I use them. You may have others and some of these may not apply to you. I'd love to hear what works for you... you can contact me via Twitter (https://twitter.com/elrond25).

The question:

**What are the best practices for optimizing resources (JavaScript, CSS, images) used by an HTML page?**


* In general
  * Use [Lighthouse](https://developers.google.com/web/tools/lighthouse/) (available in Chrome as part of the DevTools audits menu or as an extension)
      * The performance score is a good sign of how your app/site is doing
      * There are other audits you can run separately or at the same time
  * Always try to serve content via HTTP2.
    * HTTP2 solves a lot of the performance issues in older versions of HTTP. [See this article](https://medium.com/@factoryhr/http-2-the-difference-between-http-1-1-benefits-and-how-to-use-it-38094fa0e95b) for the nerdy details
    * If you want to take the time to test it, [http2 push](https://www.smashingmagazine.com/2017/04/guide-http2-server-push/) may also help increase your site's performance. **It is imperative that you test this because, if poorly implemented, you can wreck performance with push**
  * Use a CDN like [Akamai](https://www.akamai.com/) or [Cloudflare](https://www.cloudflare.com/) to host and serve your static assets. Even basic services are good enough based on my experience
  * Consider using a [service worker](https://developers.google.com/web/fundamentals/primers/service-workers/) even if you’re not creating a PWA.
    * Service workers will improve performance on second and subsequent visits because of the browser will fetch content from your local computer
    * A service worker is the entry point to advanced features like [web push notifications](https://web-push-book.gauntface.com/), [background sync](https://developers.google.com/web/updates/2015/12/background-sync) and [background fetch](https://developers.google.com/web/updates/2018/12/background-fetch) among others
    * You can configure different caching strategies based on the needs of your site or app
    * If the browser doesn't support service workers then it won't get the performance boost and you will loose access to the advanced features but it will still display content for your users
  * Consider [preloading resources](https://developers.google.com/web/updates/2016/03/link-rel-preload)
* For your images
  * Use [responsive images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images) rather than create a single version of the image. Using a single small image means that it’ll look like crap in retina displays for desktop and higher-end mobile devices
  * Create responsive images as part of your build process. I use Gulp and [gulp-responsive](https://www.npmjs.com/package/gulp-responsive)
  * Serve [WebP](https://developers.google.com/speed/webp/) images to browsers that support them.
    * You can incorporate WebP support in your responsive images
    * WebP is significantly smaller than JPG or PNG but [not all browsers support the format](https://caniuse.com/#search=webp)
  * If you can’t or don’t want to use responsive images you can compress the images with Imagemin. I also do this as part of my build process with Gulp and [gulp-imagemin](https://github.com/sindresorhus/gulp-imagemin)
  * Use an image CDN like [Cloudinary](https://cloudinary.com/) or Photon if you use Wordpress to host your assets. They’ll do all the work for you
* For your scripts and stylesheets
  * Consider minimizing your scripts. I use gulp and [uglify-es](https://www.npmjs.com/package/uglify-es)
  * If you will use a lot of Javascript consider using a Bundler like [Webpack](https://webpack.js.org/) or [Rollup](https://rollupjs.org/guide/en)
    * I'm one of the few developers who doesn't think you need to bundle all your assets (CSS, Javascript and images) when building your site or app
    * Test if a bundler improves performance for the content you're using it for before you decide to adopt it
  * Consider minimizing your stylesheets. I use sass/scss and normally create a [compressed](https://web-design-weekly.com/2014/06/15/different-sass-output-styles/) version either from CLI or using [gulp-sass](https://www.npmjs.com/package/gulp-sass) during the build process
  * I don’t concatenate them because I cache on the client using service workers and they work better as separate items
* HTML
  * I don't normally minimize my HTML until the size hits 75K or so. **_I'm old school and a lot of what I learned when I first started working on the web was by looking at other people's code, duplicating it locally and then tweaking it to see what happened. I think it's still useful to learn that way_**.
  * With the performance optimizations for scripts, images and stylesheets I think I've made up for not removing whitespace from my HTML content
