# Font licensing: What do you get and is it worth it?

Foundries have this insane idea that people creating ebooks can afford the fees that they charge for use in a single format, much less for multiple delivery methods.

I have an opinion about font licensing but I'm trying to stay neutral as I analyze different aspects of font usage online

## The web fonts we need

Any use of web fonts requires at least 4 weights for the font used to prevent synthetic bold and italic font faces:

* Regular
* Italics
* Bold
* Bold-Italics

I normally add 1 additional font and weight, a monospace font at regular weight for source code and monospaced text. So that's two fonts and a total of five weights.

For the purpose of this discussion we want to purchase the primary fonts for a website with 250,000 pageviews and a single ebook title.

The font publisher must make the font available in OpenType/TrueType and WOFF/WOFF2 at a minimum. While it's possible for me to convert fonts to older or newer formats, I want the people selling the font to do it for me so I remain in compliance with the font license.

There may be cases when we need to support older browsers and font formats that foundries don't normally provide and some times vehemently argue against providing them when I make the request or at least providing them without my having to pay extra for them.

With all the requirements in the open let's look at ITC Stone® Humanist, one of my favorite fonts, and how much it would cost to run in the configuration we specified.

The font's [MyFonts Page](https://www.myfonts.com/fonts/itc/stone-humanist-itc/) lists some of the options for purchasing a license to the font. Here's the breakdown expressed in US dollars and calculated on April 23 2021:

* **Individual weights are $39.00 for desktop use and $78.00 for one ebook title. The four fonts would total $436.80 for Desktop and ebook use (including a 20% discount on the desktop license if purchased together), $156.00 for the webfont or $312.00 for ebook use**
* **A 6 font package that includes the fonts we need is $189.00 for standard version license or $227.00 for the pro version**

<aside class="message info">
<h4>Note</h4>
  <p>If we want to add a desktop font that we can use with our DTP software the cost goes up, it's an additional license for one to five desktop users.</p>
</aside>

### What do you get when you buy a font?

This is the interesting part. When you buy a font, you're actually buying a license and permission to use the font, not the font itself, which means that what you pay for is not a one-time payment but a subscription.

Looking at the [licensing page](https://www.myfonts.com/fonts/itc/stone-humanist-itc?tab=licensing) of the font we selected as the primary, I found the following, not really expected news for web font licensing and usage (emphasis mine):

> This font’s webfont license is:
>
> Pay As You Go
>
> You get a total number of prepaid pageviews that can be used over time. This means that you will pre-pay for a number of pageviews, then you’ll have to come back to order more after your site has been viewed that number of times.
>
> For example, if you order 250,000 page views, when your webpages using the webfonts have been viewed 250,000 times, you will need to buy the webfont package again for an additional number of prepaid pageviews. **Pageviews are valid for 4 years.**
>
> A usage meter in your order history will help you know how many prepaid pageviews you have left. You can check your usage at any time, and pre-pay for additional pageviews here as well.
>
> We will send an email notification when you have used 75% of your prepaid pageviews, and another reminder at 90%.

Looking at the ePub license has to be simpler, right. One per book and one per magazine that I create, right? Nope, another way for them to take advantage of their users (emphasis mine).

> You can use an ePub license to embed the font in an electronic publication such as an eBook, eMagazine, eNewspaper, or interactive PDF.
>
>An ePub license is based on the number of publications in which the font is used. **Each issue counts as a separate publication**. Regional or format variations don’t count as separate publications.
>
> Updated versions of publications that are free to previous customers do not need a new license; otherwise, each new version that is released counts as a separate publication.

So they will track my web font usage and bill me again to remain compliant with the license? This makes no sense... If they want me to get a font subscription, please, please make it clear up front that what you offer is a font subscription service, not a purchase.

This is important when you're doing work for a client. Who keeps track of the page views and gets notifications about them when it's time to purchase a new package of page views?

I wonder how they came to the conclusion that an issue of a magazine is a separate publication?

OK, so let's look at another font to see if the terms of the license are any different.

[Roslindale](https://djr.com/roslindale) by [David Jonathan Ross](https://djr.com/) is a large font family that is visually attractive and comes with variable fonts as part of the package which makes it particularly attractive to work on web and desktop projects.

It's still a grant of license rather than an outright purchased of a copyrighted product but the license makes a lot more sense. The smallest llicense provides licenses for (emphasis mine):

* 3 desktop workstations
* 15,000 **monthly unique web visitors**
* 1 app or e-book

### Ethical font licensing: Who are you to tell me what to do with my purchase?

As onerous as some font licensing terms are, if that's all you have to worry about it would be somewhat OK, but it isn't.

[Some Type Foundries Want to Restrict Usage of Their Fonts on Ethical Grounds. Will It Work?](https://eyeondesign.aiga.org/some-type-foundries-want-to-restrict-usage-of-their-fonts-on-ethical-grounds-will-it-work/) in AIGA's Eye On Design presents some troublesome new developments in tearms of licensing.

While I can appreciate the ethical and legal implications of such license for the developers (CYA in action, y'all), the developer in me chafes at restrictions on items I purchased a license for. I would much rather be denied a purchase rather than be restricted on what I can do.

But it raises an uglier prospect. Currently, the ethical considerations are for content that the font developer and most sane people would find objectionable but where does the slipery slope ends? What's next?

I don't think that the font licensing with ethical considerations will go far. There is no easy way to define what these restrictions really mean (if the political speech is for cause they support then is using the font OK or is it stil forbidden?) and can they be legally enforced?

### Is open source a good alternative?

If the cost of commercial fonts becomes prohibitive are open source fonts a good alternative from a licensing perspective? In terms of quality?

I'll look at two licensing options and will provide examples for you to decide on quality.

The SIL Open Font License is part of [SIL (Summer Institute of Linguistic)](https://www.sil.org/about/discover), itself a part of [Wycliffe Bible Translators](https://www.wycliffe.org/). It's the most used font license and is the primary licene we'll discuss in this section.

The [Apache 2.0 license](https://www.apache.org/licenses/LICENSE-2.0) is an open source license from the [Apache Software Foundation](http://apache.org/). It is a general license, not font specific like the SIL license.

According to [Choose A License](https://choosealicense.com/licenses/apache-2.0/) the Apache License is a permissive license whose main conditions require preservation of copyright and license notices. Contributors provide an express grant of patent rights. Licensed works, modifications, and larger works may be distributed under different terms and without source code.

FAQs and answers to questions about usage. Some of the basic questions about fonts are lised below. ***I'm not a lawyer and this is not legal advice***. If you're working for a corporation it always pays to have your legal team check the licenses before adopting them.

* [SIL Open Font License](http://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL)
  * [OFL FAQ](http://scripts.sil.org/cms/scripts/page.php?item_id=OFL-FAQ_web)
  * [Web Fonts and Reserved Font Names](http://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL_web_fonts_and_RFNs)
  * SIL OFL Restrictions
    * [Can I make and use WOFF (Web Open Font Format) versions of OFL fonts?](http://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=ofl-faq_web#1db14da7)
    * [What about other web font formats such as EOT/EOTLite/CWT/etc.?](http://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=ofl-faq_web#5ac191d0)
    * [Using SIL Fonts in Documents and Publications?](http://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=FontFAQ_use)
* [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0)

Here re some open source fonts, the license they are released  under, their websites (or specimen pages in Google Fonts), a Github repository and any additional notes for the font.

<h3>Open Source, License and Dowloads</h3>

| Font Name | License | Website | Source Repository | Other |
| --- | ---| --- | --- | --- |
| Roboto | Apache 2.0 | [Specimen](https://fonts.google.com/specimen/Roboto) | [Github](https://github.com/google/roboto) | Chrome for Android and Material Design Font |
| Noto | SIL OFL 1.1 | [Get Noto](https://www.google.com/get/noto/) | [Github](https://github.com/googlei18n/noto-fonts) |  For languages not covered by Roboto when using Material Desgin. <br/><br/> Font designed to cover most (if not all) languages available in Unicode|
| Raleway| SIL OFL 1.1| [Specimen](https://fonts.google.com/specimen/Raleway) | [Github](https://github.com/impallari/Raleway/)| &nbsp; |
| Source Code Pro | SIL OFL 1.1 | [Typekit](https://typekit.com/fonts/source-code-pro) | [Github](https://github.com/adobe-fonts/source-code-pro) | I use it for monospaced text and code samples|
| DejaVu | Fonts are owned and  [licensed](https://www.gnome.org/fonts/#Final_Bitstream_Vera_Fonts) by Bitstream. <br/><br/> DejaVu changes are in public domain | [Website](https://dejavu-fonts.github.io/) | [Github](https://github.com/dejavu-fonts/dejavu-fonts)| Special License|
| Open Sans| Apache 2.0 | [Specimen](https://fonts.google.com/specimen/Open+Sans)| [Github](https://github.com/google/fonts/tree/master/apache/opensans) | &nbsp; |
| Lato 2.0 | SIL OFL 1.1 | [Website](http://www.latofonts.com/lato-free-fonts/) | [Website](http://www.latofonts.com/lato-free-fonts/) | &nbsp; |
| Recursive | SIL OFL 1.1 | [website](https://recursive.design) | [Github](https://github.com/arrowtype/recursive/releases) | This is a variable font that covers serif, sans-serif and monospaced. It also provides italics and a custom casual axis |

THe fonts are available for download free of charge so you can test them, play with them and make sure that they will work on your target browsers and operating systems. This is particularly important with Recursive and other [variable fonts](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Fonts/Variable_Fonts_Guide)

<aside class="message warning">
<h4>Warning</h4>
<p>Linux OSes need the latest Linux Freetype version, and macOS versions before High Sierra (10.13) does not support variable fonts. If your operating system is not up to date, you will not be able to use variable fonts in web pages or the Firefox Developer Tools.</p>
</aside>

## Conclusions

I think the most important thing to get from this research is to read the license before you decide if the license terms are worth the cost and whether you want to use the font.

Always test open source fonts to make sure you have an alternative in case the font or the licensing doesn't work for you.

Performance-wise look at the font file sizes and see if the newer compression formats work for your target users. A WOFF2 is always smaller than a regular OTF or TTF file.
