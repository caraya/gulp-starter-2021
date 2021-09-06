# Structured Metadata in HTML

<div class="message warning">
  <p>This post deals mostly with Google's implementation of JSON-LD structured data.</p>
  <p>While the schema.org effor was undertaken in 2011/2012 by all major search engines at the time (Google, Bing, Yahoo, and Yandex) not all of them have adopted a common platform. Bing doesn't support JSON-LD, Yandex has its API behind email registration and I don't know if Yahoo has any resources to validate JSON-LD for their search engine (particularly post acquisition).</p>
  <p>So, while in theory this should work in all search egines, only Google provides examples and freely available validation tools.<p>
  <p>Also note that this post only covers how to use JSON-LD with Schema.org types to support search engine result discoverability. It does not discuss how to build APIs with JSON-LD.</p>
</div>

One thing I've always found intriguing is how to markup data to make it appear like it does in Google's search results. There are several different structured markup formats. 3 of the most widely used are Microdata, RDFa Lite and JSON-LD. I've chosen to work with JSON-LD because Microdata is not supported accross browsers (Webkit [removed the feature](https://webkit.org/status/#feature-microdata) because "the feature never gained any traction and was eventually removed to clean up the codebase"). Support for the Microdata API was also [removed from Blink](https://groups.google.com/a/chromium.org/d/msg/blink-dev/b54nW_mGSVU/87CLF5jmPdoJ) (Google Chrome). Removal of the feature from a browser also shows us a likely future for Microdata, which is less and less support.

## What Is Linked Data

Before jumping straight to JSON-LD (JSON for Linked Data) it would help to understand what Linked Data is and how it relates to the web and other resources.

In computing, `linked data` (often capitalized as Linked Data) is a method of publishing structured data so that it can be interlinked and become more useful through [semantic queries](https://www.wikiwand.com/en/Semantic_query). It builds upon standard Web technologies such as HTTP, RDF and URIs, but rather than using them to serve web pages for human readers, it extends them to share information in a way that can be read automatically by computers.

Tim Berners-Lee, director of the World Wide Web Consortium (W3C), coined the term in a 2006 design note about the Semantic Web project.[1]

Tim Berners-Lee outlined four principles of linked data in his [Linked Data](https://www.w3.org/DesignIssues/LinkedData.html) note of 2006, paraphrased along the following lines:

1. Use [URIs](https://www.wikiwand.com/en/Uniform_resource_identifier) to identify things
2. Use [HTTP](https://www.wikiwand.com/en/Hypertext_Transfer_Protocol) URIs so that these things can be found and dereferenced
3. Provide useful information about the object a name identifies when it's looked up, using open standards such as RDF, SPARQL, etc
4. Refer to other things using their HTTP URI-based names when publishing data on the Web

<div class="video">
<iframe width="560" height="315" src="https://www.youtube.com/embed/4x_xzT5eF5Q" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
</div>

## What is JSON-LD?

JSON-LD is a lightweight Linked Data format. It is easy for humans to read and write. It is based on the already successful JSON format and provides a way to help JSON data interoperate at Web-scale.

<div class="video">
<iframe width="560" height="315" src="https://www.youtube.com/embed/vioCbTo3C-4" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
</div>

## Core Markup

<div class="video">
<iframe width="560" height="315" src="https://www.youtube.com/embed/UmvWk_TQ30A" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
</div>

In the following example we can see some of the basic attributes of a JSON-LD document. I'm working primarily with `context` and `@type`

```html
<script type="application/ld+json">
{
  "@context": "http://schema.org",
  "@type": "Book",
  "accessibilityAPI": "ARIA",
  "accessibilityControl": [
    "fullKeyboardControl",
    "fullMouseControl"
  ],
  "accessibilityFeature": [
    "largePrint/CSSEnabled",
    "highContrast/CSSEnabled",
    "resizeText/CSSEnabled",
    "displayTransformability",
    "longDescription",
    "alternativeText"
  ],
  "accessibilityHazard": [
    "noFlashingHazard",
    "noMotionSimulationHazard",
    "noSoundHazard"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "reviewCount": "0"
  },
  "bookFormat": "EBook/DAISY3",
  "copyrightHolder": {
    "@type": "Organization",
    "name": "Holt, Rinehart and Winston"
  },
  "copyrightYear": "2007",
  "description": "NIMAC-sourced textbook",
  "genre": "Educational Materials",
  "inLanguage": "en-US",
  "isFamilyFriendly": "true",
  "isbn": "9780030426599",
  "name": "Holt Physical Science",
  "numberOfPages": "598",
  "publisher": {
    "@type": "Organization",
    "name": "Holt, Rinehart and Winston"
  }
}
</script>
```

## Basic JSON-LD concepts

This is a basic (and incomplete) overview of JSON-LD as I've used it in schema.org-based search engine optimization markup. It is not complete nor it's meant to be. If you want more detailed information look at the latest [syntax specification](https://json-ld.org/spec/latest/json-ld/) from the [JSON for Linking Data Community Group](https://www.w3.org/community/json-ld/).

### @context

In JSON-LD, a context is used to match terms in the document to [Internationalized Resource Identifiers (IRIs)](http://www.ietf.org/rfc/rfc3987.txt), internationalized URIs/URLs.

The Web uses IRIs for unambiguous identification, a given IRI will match one and only one resource. The idea is that these terms mean something that may be of use to other developers and that it is useful to give them an unambiguous identifier. They will also help prevent collisions if mor than one author decides to use the same name: the contexts will be different so they will not collide.

In this example we are using schema.org as the context. All future work will be bound to it.

```json
{
  "@context": "http://schema.org",
  "@type": "Book"
}
```

### @type

The type attribute tells us what type of resource it is in the given context. For example using the following code:

```json
{
  "@context": "http://schema.org",
  "@type": "Book"
}
```

Tells whoever is reading the JSON file that this is defining a book using the context from [schema.org](http://schema.org).

### @language

The `@language` attribute tells JSON-LD what language to use for the specified resource. There are multiple ways to use it. In the first example we set it up on the root cotnext as the default language (unless it's overwritten)

```json
{
  "@context": "http://schema.org",
  "@type": "Book",
  "@language": "en"
}
```

You can also incorporate the attribute wherever you use the `@type` attribute, which will override the default for that particular resource only.

### Square Brackets

Square brackets exist for situations where there are multiple values for an item property. In the example below, both `accessibilityControl` and `accessibilityFeatures` have multiple values, like saying there are multiple accessibility controls and features.

This is different than formal nesting, discussed in the next section.

```html
<script type="application/ld+json">
{
  "@context": "http://schema.org",
  "@type": "Book",
  "accessibilityAPI": "ARIA",
  "accessibilityControl": [
    "fullKeyboardControl",
    "fullMouseControl"
  ],
  "accessibilityFeature": [
    "largePrint/CSSEnabled",
    "highContrast/CSSEnabled",
    "resizeText/CSSEnabled",
    "displayTransformability",
    "longDescription",
    "alternativeText"
  ]
}
</script>
```

### Nesting

Where square brackets give you the option to nest multiple values for the same attribute nested elements use curly brackets `{}` to insert a completely different but related element.

Or a more complex example of nested elements taken from Google's [Fact Check Structured Data](https://developers.google.com/search/docs/data-types/factcheck)

```json
<script type="application/ld+json">
{
  "@context": "http://schema.org",
  "@type": "ClaimReview",
  "datePublished": "2016-06-22",
  "url": "http://example.com/news/science/worldisflat.html",
  "itemReviewed":
  {
    "@type": "CreativeWork",
    "author":
    {
      "@type": "Organization",
      "name": "Square World Society",
      "sameAs": "https://example.flatworlders.com/we-know-that-the-world-is-flat"
    },
    "datePublished": "2016-06-20"
  },
  "claimReviewed": "The world is flat",
  "author":
  {
    "@type": "Organization",
    "name": "Example.com science watch"
  },
  "reviewRating":
  {
    "@type": "Rating",
    "ratingValue": "1",
    "bestRating": "5",
    "worstRating": "1",
    "alternateName" : "False"
  }
}</script>
```

* **JSON-LD nesting checklist**
  * Must use the item property (specific to the item type)
  * The value lives in curly braces
  * You MUST identify the item type of that property. The JSON-LD parser must know what type of object you nested
  * Attribute/value properties for the type must be included
  * Follow proper JSON syntax

### @id

The `@id` element gives a unique IRI/URI referencing the element it's used in. Where there is more than one reference for the same resource (different formats for the same video, or different size for the same image) don't use `@id`, just name the resource to follow the schema.org guidelines.

```json
{
  "@context": "http://schema.org",
  "@type": "NewsArticle",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://google.com/article"
  }
}
```

## Commonly used types

Schema.org provides vocabularies for some common types of markup. This is a subset of the material supported by Google and it's a good starting as it provides a comprehesive crosslist of all the material supported for a given type.

These type descriptions are not like Google's [Search Gallery](https://developers.google.com/search/docs/guides/search-gallery) in that they don't provide full examples but a list of attributes that you can use for a given content type.

* Creative works:
  * [CreativeWork](http://schema.org/CreativeWork)
  * [Book](http://schema.org/Book)
  * [Movie](http://schema.org/Movie)
  * [MusicRecording](http://schema.org/MusicRecording)
  * [Recipe](http://schema.org/Recipe)
  * [TVSeries](http://schema.org/TVSeries)
* Embedded non-text objects:
  * [AudioObject](http://schema.org/AudioObject)
  * [ImageObject](http://schema.org/ImageObject)
  * [VideoObject](http://schema.org/VideoObject)
* Event
  * [Health and medical types](http://schema.org/docs/meddocs.html): notes on the health and medical types under [MedicalEntity](http://schema.org/MedicalEntity)
  * [Organization](http://schema.org/Organization)
  * [Person](http://schema.org/Person)
  * [Place](http://schema.org/Place)
  * [LocalBusiness](http://schema.org/LocalBusiness)
  * [Restaurant](http://schema.org/Restaurant)
* [Product](http://schema.org/Product)
  * [Offer](http://schema.org/Offer)
  * [AggregateOffer](http://schema.org/AggregateOffer)
* [Review](http://schema.org/Review)
  * [AggregateRating](http://schema.org/AggregateRating)
* [Action](http://schema.org/Action)

## Tagging Examples

Now that we know what Linked Data is, some basics about how to write JSON-LD and where to find more information about it, let's look at some examples of how Google recommends you write JSON-LD to work with its search engine. We'll look at both structural and content markup examples.

You can find more fully realized examples in the [Google Search Gallery](https://developers.google.com/search/docs/guides/search-gallery)

### Article

This examples shows the markup for a news article. Notice how it breaks author and publisher into different types and how it can extend those types to get as rich as we need to.

```json
{
  "@context": "http://schema.org",
  "@type": "NewsArticle",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://google.com/article"
  },
  "headline": "Article headline",
  "image": [
    "https://example.com/photos/1x1/photo.jpg",
    "https://example.com/photos/4x3/photo.jpg",
    "https://example.com/photos/16x9/photo.jpg"
  ],
  "datePublished": "2015-02-05T08:00:00+08:00",
  "dateModified": "2015-02-05T09:20:00+08:00",
  "author": {
    "@type": "Person",
    "name": "John Doe"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Google",
    "logo": {
      "@type": "ImageObject",
      "url": "https://google.com/logo.jpg"
    }
  },
  "description": "A most wonderful article"
}
```

### Video Object

The video object describes a video that you may put up on your web site as marketing collateral or in a Youtube channel to try to monetize and grow your audience.

```json
{
  "@context": "http://schema.org",
  "@type": "VideoObject",
  "name": "Title",
  "description": "Video description",
  "thumbnailUrl": "https://www.example.com/thumbnail.jpg",
  "uploadDate": "2015-02-05T08:00:00+08:00",
  "duration": "PT1M33S",
  "publisher": {
    "@type": "Organization",
    "name": "Example Publisher",
    "logo": {
      "@type": "ImageObject",
      "url": "https://example.com/logo.jpg",
      "width": 600,
      "height": 60
    }
  },
  "contentUrl": "https://www.example.com/video123.flv",
  "embedUrl": "https://www.example.com/videoplayer.swf?video=123",
  "interactionCount": "2347"
}
```

## Use the Force, Luke

I hate reinventing the wheel. This is where the Google [Search Gallery](https://developers.google.com/search/docs/guides/search-gallery) comes in. They provide full markup examples of the most frequently used types.

The library also includes what they call enhancements likke breadcrumbs, search boxes and carousels. These may not be visible in the page that links to the JSON-LD but will allow new functionality in the SERP (Search Engine Results Page) where they appear.

Available examples from the gallery:

* Content types
  * Article
  * Book
  * Course
  * Dataset
  * Event
  * Fact Check
  * Job Posting
  * Local Business
  * Music
  * Occupation
  * Paywalled Content
  * Podcast
  * Product
  * Recipe
  * Review
  * TV and Movie
  * Video
* Enhancements
  * Breadcrumb
  * Corporate Contact
  * Carousel
  * Logo
  * Sitelinks Searchbox
  * Social Profile

## Process to create JSON-LD data

So what does it take to create a JSON-LD document for a page? I've adapted this list from [JSON-LD For Beginners](https://moz.com/blog/json-ld-for-beginners). It has been slightly edited for style.

It's important to note that the first two steps are planning what you will markup and why do you want to do it. Experimenting is ok but marking up content just because you can't is not, or at least it shouldn't be.

<ol>
	<li>Mentally answer:
	<ul>
		<li>What do you want to mark up?
		<ul>
			<li><strong>Goal: </strong>Determine that you can mark up the content with the Schema.org vocabulary. Some things may make sense conceptually, but are not available within the vocabulary</li>
		</ul></li>
		<li>Why do you want to mark it up?
		<ul>
			<li><strong>Goal:</strong> Determine whether there is a business case for what you want to markup. If you're not doing it for business reasons or as an experiment you shouldn't mark content up just for the sake of marking it up</li>
      <li>You want to mark up content that will help search engines understand the most vital information on your page and maximize your ability to demonstrate that you are the best resource for users</li>
			<li>Look at Google's <a href="https://developers.google.com/search/docs/guides/intro-structured-data">resources on structured data</a>, how they use them, and examples of different types of supported elements and how they recommend using them</li>
		</ul></li>
	</ul></li>
	<li>If you’re using a markup that Google explicitly supports (i.e., JSON-LD, Microdata or RDFa), open the specific documentation page and any relevant examples
	<ul>
		<li>Don’t feel like you have to create your markup from scratch. You should understand JSON-LD and the Schema.org vocabulary</li>
    <li>If Google or search engine results provide examples of the type of markup you want to use then use it!
	</ul></li>
	<li>Open up the <a href="https://schema.org/docs/full.html">Schema.org</a> item type page
	<ul>
		<li>Especially when you’re starting off with Schema.org, review the Schema.org technical documentation page to get an idea of the item type; what it entails, and its properties. This can help you better understand an example or make it easier to create your own content</li>
	</ul></li>
	<li>Copy/paste the immutable elements
	<ul>
		<li>Copying and pasting the required elements saves time and mental energy. If you're using an external example the immutable elements should already be present</li>
		<li>Occasionally an examples may leave out the <code>script</code> tags. Please note that they are vital; Browsers will not parse JavaScript outside <code>script</code> tags or properly linked scripts</li>
	</ul></li>
	<li>Add desired item type you’re marking up as the value of <code>@type:</code></li>
	<li>List item properties and values
	<ul>
		<li>This step doesn’t require syntax and is more of a mental organization exercise. Concentrate on what you want to markup — don’t sweat the details yet.</li>
		<li>You may have ideas about what you want to mark up, but may not necessarily know if it’s possible within the vocabulary or how it’s nested</li>
	</ul></li>
	<li>Add JSON-LD syntax, nesting where required/appropriate
	<ul>
		<li>The step where you finish up your model, nest it, and put markup together</li>
	</ul></li>
	<li>Test with the <a href="https://search.google.com/structured-data/testing-tool">Structured Data Testing Tool</a>
	<ul>
		<li>The tool is your linter for grammar and syntax. Confirm that the elements and attributes you use are well formed and pass validation. When in doubt, check the Google documentation and the corresponding entry in schema.org</li>
	</ul></li>
	<li>Determine strategy for adding to the webpage
	<ul>
		<li>You must inline the JSON-LD data in a script tag in the head of the page</li>
    <li>If you're working with dynamic content or through a CMS, work with your dev team to add the script to the page</li>
	</ul></li>
</ol>

## Review the Guidelines

Once you have the markup that you want to use and have validated it using Google's validation tool, make sure to check their [Structured Data General Guidelines](https://developers.google.com/search/docs/guides/sd-policies), particularly their [quality guidelines](https://developers.google.com/search/docs/guides/sd-policies#quality-guidelines). This will save you time and potential headaches since **Google does not guarantee that your structured data will show up in search results, even if your page is marked up correctly according to the Structured Data Testing Tool** and this mey be caused by a vaariety of reasons.

But if you've created good content and marked up your JSON-LD appropriately the search results should become a much better experience for the people using search engines.

## Resources

* General Information and Tutorials
  * [schema.org](http://schema.org/)
  * [Introduction to Structured Data](https://developers.google.com/search/docs/guides/intro-structured-data)
  * [Google Structured Data Policies](https://developers.google.com/search/docs/guides/sd-policies)
  * [Build, Test, and Release Your Structured Data](https://developers.google.com/search/docs/guides/prototype)
  * [A Guide to JSON-LD for Beginners](https://moz.com/blog/json-ld-for-beginners)
* Structured Data Formats
  * [JSON-LD](https://json-ld.org/)
  * [RDFa](https://www.w3.org/TR/xhtml-rdfa-primer/)
  * [Microdata](https://html.spec.whatwg.org/multipage/microdata.html)
* Tools and Examples
  * [Google Search Gallery](https://developers.google.com/search/docs/guides/search-gallery)
  * [Structured Data Testing Tool](https://search.google.com/structured-data/testing-tool)
