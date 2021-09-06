# Further thoughts on xAPI: cmi5 and beyond

Now that we have an LRS, a library to handle xAPI statement generation and upload to the LRS let's look at some further thoughts on xAPI, cmi5, when to use it and when not to use it.

The first thing we need to do is figure out when is xAPI the best solution for our proect. Some of the questions I would ask to help through this process:

* Are we reusing existing content or are we creating brand new material?
* Is all the content in an LMS or are we using content from external sources?
* Are we using SCORM to track our content?
* Do we need to convert courses to cmi5
* How will we authenticate users to provide information about the agent?

There are probably many more questions, but I think these are good starting points.

## Creating our own verbs and actions

One of the things that has been hard to wrap my head around is that the LMS is not the only input we can use for xAPI. As long as the data produces valid statements to feed the LRS, and the request is properly authenticated then it doesn't really matter where it comes from.

We can provide a tailored experience beyond a basic set provided in Activity Streams and the xAPI specification.

I have a subdomain reserved for XML name spaces and name space related work so that may be a good starting point.

The solution seems to be creating your own xAPI profiles for your data and then making them available for others when they use your verbs and activities.

By defining one or more profiles we can define these specific verbs and activities that are relevant to us and that, when people outside my project or company read the data, will make sense to them.

It will also allow for reuse. If people understand what I meant when I said, `person A implemented an API on project x` and they agree with it, they can also use my implementatioon of the `implemented` verb on their own projects.

The one thing I see as a drawback is that xAPI profiles are written using linked data and linked data is not the easiest technology to learn.

For examples of xAPI profiles see the [xapi-authored-profiles Github Repository](https://github.com/adlnet/xapi-authored-profiles)

For more information on Linked Data see [JSON for Linking Data](https://json-ld.org/), [Understand how structured data works](https://developers.google.com/search/docs/guides/intro-structured-data), and [Generate structured data with custom JavaScript](https://developers.google.com/search/docs/guides/generate-structured-data-with-javascript#custom-javascript)

## LRS: One or many? What to use them for?

The best analogy I've heard about the LRS is to think of it as a database where you store xAPI statements.

If we keep this LRS-as-database metaphor then it stands to reason that we could have multiple LRS running in different parts of the organizations. For example, we could have an LRS tracking information about the support organization and what kinds of tickets they work through while another LRS could track information about the engineering team.

Both of these LRS instances could forward information to a master LRS sitting in HR so that the HR organization can get a holistic view of performance and learning throughout [statement forwarding](https://xapi.com/blog/news-statement-forwarding/)

The other option is to have a single LRS that all clients send their data to regardless of the function and the type of statements they expect. This would make it easier to implement but it requires careful thinking about what data we're trying to gather and what additional processing we want to do with it.

## Taking a deeper look at cmi5

Think of cmi5 as the spiritual successor to SCORM. cmi5 is a “profile” for using the xAPI specification with traditional learning management (LMS) systems.

Unlike SCORM, it provides a set of interoperability guidelines for making courses work across compliant sytems.

Some of the guidelines include:

* Content Launch Mechanism
* Authentication
* Session Management
* Reporting
* Course Structure

cmi5 uses xAPI as the communication vehicle for having the courses talk to a LRS.

## Turning our content into a cmi5-compliant package

There are libraries we can use to make our content cmi5 compliant

I will use the [cmi5-Client-Library](https://github.com/adlnet/cmi5-Client-Library) and its example as the basis for the course I want to build.

The listing below shows the content of the example course.

```text
Examples
├── AUExample1.html
├── Content
│   ├── bootstrap-theme.css
│   ├── bootstrap-theme.css.map
│   ├── bootstrap-theme.min.css
│   ├── bootstrap.css
│   ├── bootstrap.css.map
│   ├── bootstrap.min.css
│   └── prettify.min.css
├── Scripts
│   ├── cmi5Controller.js
│   ├── cmi5Wrapper.js
│   └── xapiwrapper.min.js
└── cmi5.xml
```

We'll concentrate on three files:

* **cmi5.xml**
* **AUExample1.html**
* **cmi5Controller.js**

### cmi5.xml

**cmi5.xml** tells the LMS how to work with the Assignable Units, the content inside the package, and how they interact together.

If you've done work with SCORM, this is similar to the `imsmanifest.xml` configuration file.

### AUExample1.html

**AUExample1.html** holds the learning content and instructions for how to communicate information about the content to the LRS using xAPI.

It references jQuery, Bootstrap CSS (for the UI) and xAPI and CMI libraries written in Javascript to perform the actual communication.

### cmi5Controller.js

**cmi5Controller.js** is one of the three files that manage communication between the AU, the LMS and the LRS, the other two files are **cmi5Wrapper.js** and **xapiwrapper.min.js**

### Future ideas

A future iteration of this project will try the following:

* Remove Bootstrap and replace it with either [Foundation](https://get.foundation/) or [Material Design](https://material.io/). This is a matter of preference and doesn't imply value judgment on Bootstrap
* Move to [TypeScript](https://www.typescriptlang.org/) as the primary language
* Adopt front end best practices
  * Move from XHR to the [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
  * Create a [Gulp](https://gulpjs.com)-based build system
  * Remove jQuery as a dependency
    * If removal is not an option then update it to the [current version](https://jquery.com/download/) (3.5.1 when writing this post)
    * If removal is not an option also evaluate if the `slim` version of the library would work better. The slim package excludes the ajax and effects modules so it provides a smaller download
  * Bundle the scripts using Rollup or Webpack
    * This is particularly important when working with large AUs, large number of AUs or AUs that use a large number of libraries

## Begin with the end in mind

When designing instructional content we need to go back and take a look at our instructional design strategies and whatever work we've already done in developing content.

I'm old school and still use the [ADDIE model](https://www.instructionaldesign.org/models/addie/) when working with instructional content. If this is not your first time building content in an xAPI/CMI5 environment you can look at your content through an xAPI-enhanced ADDIE methodology.

<table>
<thead>
  <tr>
    <th>ADDIE Step</th>
    <th>How xAPI helps</th>
<tbody>
<tr>
<td><strong>Analysis</strong></td>
<td><p>xAPI gives us a larger dataset for analysis, making it easier to identify performance gaps, learner needs, and to tailor new learning experiences to meet those needs.
  <p>Leverage data already in the LRS for the analysis.</td>
</tr>
<tr>
<td><strong>Design</strong></td>
<td><p>The hardest part for me to wrap my head around was that we're no longer limited to LMS data. We need to consider what we will track and what data we will capture from each source.
  <p>Consider how each element will integrate into the overall learning experience.
  <p>Consider the technologies to be used; you are not longer limited to what we can put inside a SCORM course.</td>
</tr>
<tr>
<td><strong>Development</strong></td>
<td><p>Make use of <a href="https://xapi.com/libraries/">code libraries</a> and other <a href="https://xapi.com/dev-resources/">resources</a> during development. Take advantage of existing <a href="https://github.com/adlnet/xapi-profiles">xAPI profiles</a></td>
</tr>
<tr>
<td><strong>Implementation</strong></td>
<td><p>cmi5 content becomes platform independent. We can leverage existing resources and we can use modern technologies in our learning content.</td>
</tr>
<tr>
<td><strong>Evaluation</strong></td>
<td><p>xAPI enables evaluation at <a href="https://xapi.com/kirkpatrick/">all four of Kirkpatrick’s levels of evaluation</a> including the impact on learner’s behavior and the organization’s performance.
  <p>Because we store the results of the learning experience outside the LMS we can do longitudinal studies of our training effectiveness.</td>
</tr>
</tbody>
</table>

But it's important that we don't lose sight of our objective. It is not about the technology itself but how we can best use the technology to enhace the learning experience.

## Links and resources

* cmi5
  * [cmi5: Technical 101](https://xapi.com/cmi5-technical-101/)
  * [Incorporating a TinCan LRS into an LMS](https://github.com/RusticiSoftware/launch/blob/master/lms_lrs.md)
* xAPI spec
  * Part One: [About the Experience API](https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-About.md#partone)
  * Part Two: [Experience API Data](https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Data.md#parttwo)
  * Part Three: [Data Processing, Validation, and Security](https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Communication.md#partthree)
* xAPI profiles
  * Part One: [About xAPI Profiles](https://github.com/adlnet/xapi-profiles/blob/master/xapi-profiles-about.md)
  * Part Two: [xAPI Profiles Structure](https://github.com/adlnet/xapi-profiles/blob/master/xapi-profiles-structure.md)
  * Part Three: [xAPI Profiles Communication and Processing](https://github.com/adlnet/xapi-profiles/blob/master/xapi-profiles-communication.md)
  * [xAPI Vocab Server](http://xapi.vocab.pub/)
  * [Authoring Profiles](http://xapi.vocab.pub/#authoringprofiles)
  * [Profile Recipes vs. xAPI Profiles](https://xapi.com/blog/profile-recipes-vs-xapi-profiles/)
* LRS
  * [Learning Locker](https://learningpool.com/learning-analytics-solution-learning-locker/)
  * [Rustici SCORM Cloud](https://rusticisoftware.com/products/scorm-cloud/)
* Evaluation
  * [Leveraging Interoperable Data to Improve Training Effectiveness Using the Experience API (xAPI)](http://www.problemsolutions.net/images/Leveraging-Interoperable-Data-to-Improve-Training-Effectiveness-Full-Paper.pdf)
