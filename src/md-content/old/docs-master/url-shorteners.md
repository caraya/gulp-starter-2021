# Using URL shorteners to manage link rot

There are many situations where we can find ourselves in trouble when checking links. 

* The links may be dead. 
* The link may have moved.
* As [@naomikennedy](https://twitter.com/naomikennedy/) found out the links may have been redirected

<blockquote class="twitter-tweet" lang="en"><p><a href="https://twitter.com/hashtag/eprdctn?src=hash">#eprdctn</a> PSA: when someone complains that a link in an eBook is now a porn site DO NOT click on the link, just believe them.</p>&mdash; Naomi Kennedy (@naomikennedy) <a href="https://twitter.com/naomikennedy/status/497455561999675393">August 7, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

So what can we do to alleviate these problems?

## Shortening URLs

Since we cannot control the content of the URLs our content points to and we cannot always change the links in our content (thinking e-books and other long term content) we have to find ways to address the problem from the backend. 

I like what A Book Apart does with their links:

They provide a shortened URL: `http://bkaprt.com/rwd/9/` whith an abbreviation for the book and a number indicating the order in which the link appears in the book, which will be the same regardless of the format the book you are reading.

Because they've provided a link to their servers they can exercise much tighter control over the link and the resource it points to.


### Advantages

So what are the advantages of a system like this?

**redirect on change**

Right now`http://bkaprt.com/rwd/9/` points to `http://meyerweb.com/eric/tools/css/reset/` but let's say that Eric changes the his domain and the link dies. In this case a Book Apart can change the redirect to point to the new resource without having to create a new edition of the book with the correct links.

It may be possible to do this with a server redirect header or code it directly in a dummy page using Javascript. Whatever system we use we can change the link without changing the resources that use the link.

**Analytics**

It's always good to know who uses your links in your books and how often are they used.

Because we use our server and our own links we can add analytics to track information about our links just as much as we do with our regular web content.

### Disadvantages

**One more server to maintain**

As interesting as this alternative is, it's one more server we need to deploy, configure and maintain. It's also another point of failure.

For larger publishers and deployments this may n ot be an issue but for smaller publisher or people running individual projects it may be cost prohibitive.

**One more item to the production list**

Using a shortener as described in this article requires an additional step in our publishing process. We need to colect links and prepare the redirector's links before the book is published.

Whenever a link changes the redirector must be updated to reflect the new destination. 

## Doesn't bit.ly work for this?

No, and there aren't many shortener/redirector services that do this. This [answer from Quora](http://www.quora.com/What-urls-shorteners-allow-you-to-change-underlying-long-link) explains some additional disadvantages of changing the URL you're redirecting to. 

>The reasoning behind our decision, which I hazard would also influence link-shorteners’ similar design, is twofold:

> 1. Caching. Everything from the end-user’s user-agent, to system-level caches, to any number of proxies upstream, to the boxes serving up a redirector itself, are heavily cached, so changing where a 301 ought to point creates a bad user experience during the (often significant) delay during which some caches have refreshed and others have not. Speaking just at the level of user-agent: once Chrome is convinced that (for example) http://cowp.co/about points to “http://about.me/cowperthwait”, convincing it to go instead “http://whitehouse.gov/about/ournewpresident” requires a combination of hard reloads, cursing, and voodoo. Imagine the disorientation and anger within an office when my laptop with Safari loads a different destination page than yours with Chrome. The customer, believing his attempt at editing hasn’t “stuck”, invariably tries again, now creating a potential third destination, and the whole time blames us for a faulty product. It behooved us in designing our product to discourage the practice of frequently changing links, in order to (hopefully) discourage our customers from developing clever but flawed workflows that would depend on changing link destinations on a regular basis.

> 2. Bad people. There used to be — and to a very limited degree there still is… — handwringing about how 301s could enable the spread of malware by obfuscating where links truly point. Given this, it would be irresponsible for us, or any product that facilitates link redirection, to easily enable abuse. If you created (again, e.g.) http://cowp.co/about as a redirector for “http://about.me/cowperthwait” and submitted it to a social network’s linter, the linter would verify its destination and load up preview text and a thumbnail image of my smiling mug … only for you to change this link so that it pointed instead to “http://5z8.info/freeporn_f1s3kl_racist-message-board”. For one, the network would catch you, and would rightly accuse you of attempting to pull a bait-and-switch on users, and possibly punish other, non-sketchy users who also submit links shortened using the cowp.co domain. But assuming you temporarily succeeded, along the way you would erode general trust in the clickworthiness of our (clients’) links and jeopardize our (and our clients’) goodwill. Because it is not in our or anyone’s interest to facilitate the spread of malware, affiliate fraud, or any number of other bad things that bad people have occasionally envisioned performing with presto-chango redirectors… no thanks.

Since we have one team creating and, if necessary, updating the links we can pretty much elminate concerns for #2. So it leaves us with #1 to deal with.

The first item shouldn't be too big an issue since we don't expect the links to change too often or at all but it's something worth keeping in mind as we don't really have control of upstream proxies or their configuration.
