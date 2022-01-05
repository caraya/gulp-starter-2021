After all this time working with shapes, regions and exclusions what have I learned?

I have learned that we're coming back to the bad old days where browser vendors would do whatever they thought best for them and screw the other browsers and the developers working on the web.

## My view of the problem

For example, when researching regions, I found the following bits of information:

* Google, citing concerns about performance, withdrew region support from the Blink rendering engine ([Cnet posted an article about this](http://www.cnet.com/news/reversing-course-google-rejects-adobe-web-publishing-tech/))
* Mozilla split some aspects of the CSS regions specification into [another specification](http://dev.w3.org/csswg/css-overflow/) which they believe <em>satisfies the use cases put forward by CSS Regions in a way that our team can support in a much more secure, reliable, and performant manner.</em>
* L. Dave Baron opposed regions as proposed in the specification in the context of performance and its use as a language primitive for the Extensible Web Movement as expressed in their [manifesto](http://extensiblewebmanifesto.org)
* Håkon Wium Lie, Opera's CTO, proposed a different way to create printed content for the web. The proposal, which complements and extends [generated content for paged media](http://dev.w3.org/csswg/css-gcpm/) and [paged media](http://www.w3.org/TR/css3-page/) specifications, provides an alternative syntax for paged content online. It only works in Opera 12+
* Håkon is also opposed to Regions as proposed (documented in this [a list apart article](http://alistapart.com/blog/post/css-regions-considered-harmful) and in this [followup](http://www.wiumlie.no/2014/regions/still-harmful))
* Microsoft has shapes under consideration

(For those interested the thread that first got my attention starts [with this message](http://lists.w3.org/Archives/Public/www-style/2014Jan/0301.html) and it moves through this and other threads)

I can almost buy Google's need to improve performance over features (although I also think that Blink could have done the work in a branch or in some other way that could be merged back into the project at a later date).

Mozilla and Opera positions are harder for me to reconcile as a developer. 

Firefox has never had an implementation of the CSS Region specification (or one that was publically available.) This makes me feel uneasy about their arguments. Did they have an implementation that didn't work the way they wanted and that's why they decided to go with their overflow implementation? Have they even tried to improve the performance of the existing specification rather than not implement and complain about it?

Opera's approach is different and, in a way, more worrisome to me. In his A List Apart article Lie makes a lot of assertions and criticism about braking the separation of content and style when using regions. Rather than work with the code and spec as it was (and to which they had access when Opera rendering engine was based on WebKit's code) they decide to go with their own implementation that, in my opinion, doesn't address the same type of problems region do; if anything it's a parallel proposal to the Paged Media specification.

My concern is that rather than working on improving the current spec both companies decided to go their own way, not supporting the spec as written and proposing their own versions to the W3C. Sadly, until everything is sorted out, this argument in the working group makes developers who are not as opposed to the idea pay the price by having to polyfill the feature in half the modern browsers, whether [evergreen](https://twitter.com/wycats/status/429783051984326657) or not and none of the current mobile platforms (performance falls below acceptable levels).

Sara Souedain provides a [counter point](http://sarasoueidan.com/blog/css-regions-matter/) to Wium Lie's argument that CSS regions are considered harmful. It makes sense to me, although I hate the idea of having to use pseudo elements to create regions, but if that's the price to pay for a fully working implementation so be it. 

Anselm Hanneman wrote an interesting [blog post](http://helloanselm.com/2014/is-it-time-for-regions-yet/) asking the questions if we're there yet with regions. 

Wum Lie rebated this and other arguments in [his website](http://www.wiumlie.no/2014/regions/still-harmful)

The end result is the same. Because of Opera and Mozilla's opposition the specification is stuck at the candidate recomendation stage without a clear path towards recomendation and adoption. Developers are left with few options, none of which are attractive:

* Implement regions with polyfills which excludes most mobile devices (those which don't implement regions natively) from the design
* Implement the technology as is and leave out the browsers that don't support it, both desktop and mobile
* Come up with an alternative to the current region specification (most likely in Javascript)
* Create a static design where text is broken manually and made to fit the design's text areas

## Which standards body do we follow?

WHATWG versus W3C versus who knows what else. 

I've read that Google flat out ignores the W3C and only follows the WHATWG when developing the HTML5-related features in Chrome; by default this means that Opera follows the same model (since they can no longer do things on their own.)

Let's go back to where did the split started. According to Wikipedia's article on the WHATWG (specifically the [history section](http://en.wikipedia.org/wiki/WHATWG#History)) puts is succintly:

> The WHATWG was formed in response to the slow development of World Wide Web Consortium (W3C) web standards and W3C's decision to abandon HTML in favor of XML-based technologies. The WHATWG mailing list was announced on 4 June 2004,[4] two days after the initiatives of a joint Opera–Mozilla position paper[5] had been voted down by the W3C members at the W3C Workshop on Web Applications and Compound Documents.[6]

> On 10 April 2007, the Mozilla Foundation, Apple, and Opera Software proposed[7] that the new HTML working group of the W3C adopt the WHATWG’s HTML5 as the starting point of its work and name its future deliverable as "HTML5". On 9 May 2007, the new HTML working group resolved to do that.[8]

WHATWG's goals, from my perspective, were fullfilled on 9 May 2007 when W3C decided to adopt the work done and use the HTML5 standard instead of the XML-based XHTML2. Rather than give back the decision making power (shared with many other organizations) back to the W3C, they decided to keep it for themselves and basically dictate how to build future web applications and web pages. I know that there are many members but, let's be honest, who other than Apple and Google control development?

## Separation of concerns as a source of problems

One of the things that really bug me is that purists want the web to compete with native applications on the web terms, not  native applications. Inserting dummy elements or may break  [separation of concerns (SOC)](http://en.wikipedia.org/wiki/Separation_of_concerns) but it also presents a good way for developers to create the kind of content that we see in native applications or we can model from printed media. 

Team Treehouse posted this blog entry about the [history and death of SOC](http://blog.teamtreehouse.com/the-separation-of-structure-presentation-and-behavior-is-dead). It touches on some of the concerns I have with the way the web is currently being developed.

## Moving towards an extensible web

The W3C extensible web [community group](/http://lists.w3.org/Archives/Public/public-nextweb/2014Jan/0000.html) seems to have the right idea in terms of moving forward. It advocates for a  web that is more responsive toward the needs of developers working with the standards they develop. They even published a [manifesto](http://extensiblewebmanifesto.org/) where they expand on their ideas.

My fear here is that it'll take us to the "bad old days" where the main distinguising feature of each browser was the features it supported.

