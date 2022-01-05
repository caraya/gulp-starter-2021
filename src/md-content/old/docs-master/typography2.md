Let's clear some terminology, 

UTF-8 is an encoding, it still needs fonts supporting the characters being displayed. In any XHTML document the heading looks like this (or should look like this in a well formed and valid document:

< html lang="en-us" xml:lang="en-us>

< head>

< !-- for XHTML5 used in epub3>

< meta charset="utf-8" /> 

< !-- you may also see the older XHTML 1.0 version which is deprecated -->

< meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

Unicode (UTF-8) works with planes. The basic multilingual plane supports multiple languages but not all of them with the same font. You still need multiple fonts (or fonts that support multiple languages) to display the characters.

>Some web browsers, such as Mozilla Firefox, Opera, Safari and Internet Explorer (from version 7 on), are able to display multilingual web pages by intelligently choosing a font to display each individual character on the page. They will correctly display any mix of Unicode blocks, as long as appropriate fonts are present in the operating system. (https://www.wikiwand.com/en/Unicode_and_HTML)

While it's true that readers have fonts to support multiple languages (and I was surprised that your epub 2 sample worked in iBooks in the desktop) You're not always guaranteed that this will be the case. Looking at the basic multilingual plane (BMP) alone we can see that you'll need several fonts to cover all the characters and I'm positive no e-reader can cover all of it without embeded fonts event when the device has fonts for multiple languages installed.

> Unicode already contains more than 100,000 characters, so that the entire code space can no longer be embedded as glyphs within a single font file. In the most common file formats, TrueType and OpenType a maximum of only 65,536 glyphs can be saved. In any case, most fonts contain only very few characters compared to the possibilities of the Unicode character set. (http://www.sttmedia.com/unicode)

There are also other issues to consider when working with multilingual text.

The different fonts make for a disjointed design that looks different in each platform as they will, most likely, use a different font to display the same glyphs. 

> “Another reason you might consider embedding fonts is to create a consistent look and feel across the digital and print versions of your product. By taking this approach, you are effectively creating a kind of “brand” for your publication or series of publications. Or to use Craig Mod’s term, you are “platforming books,” part of which is to create a “unified design” across digital and print.” (“EPUB 3 Best Practices.” Matt Garrish and Markus Gylling)

Using Unicode by itself will not guarantee the layout to remain as designed. Depending on the font used to render the content the layout may change significantly from what was originally designed. This is bad enough with just western characters and current readers (search the #eprdctn hashtag on twitter for some of the issues you find) without having to add unicode multilingual support to the mix.

Layout is even more important in languages that use vertical text and that has to be specified in CSS, using the writing-mode module (http://dev.w3.org/csswg/css-writing-modes-3/) as documented here: (http://generatedcontent.org/post/45384206019/writing-modes)

All solutions are painful; we just have to decide how much pain do we want to put ourselves through.
