---
title: Video in ePub: Thoughts and Considerations
date: 2014-10-31
category: Technology
status: draft
---

# Video in ePub: Thoughts and Considerations

> Note: While I talk primarily about ePub e-books, the same process, markup and scripts apply to a standard web page.

After finishing a draft of my fixed layout ePub I went back and researched the accessibility requirements for video on the web and how well supported they are in ePub e-books. I will present both the rationale and coding based on my ePub-based research and the article I wrote for the Web Platform Documentation project [https://docs.webplatform.org/wiki/concepts/VTT_Captioning](https://docs.webplatform.org/wiki/concepts/VTT_Captioning)

> Working with video in your ePub book presumes that you're familiar, if not comfortable, with the process of manually creating an e-book. If you're not then it's better if you begin with a basic tutorial.

## Reviewing video on the web

Ever since Mark Pilgrim wrote the [video chapter](http://diveintohtml5.info/video.html) of [Dive into HTML5](http://diveintohtml5.info/) the landscape has changed drastically. After a long fight Mozilla capitulated and now supports MP4 video, along with Safari, IE and Chrome. Opera is still the holdout, supporting only WebM and OGG video. 
 
Most e-book rendering engines are WebKit based so, in theory, we should only need one version of the video but in the interest of working for multiple platforms we'll keep at least two out of the three formats and work with them throughout the rest of the post. 

### What does the video look like

We define the size of the video with CSS (Optional, can also be defined in the element itself)

```css
video {
  width: 320;
  height: 240;
}
```
We then define the video with standard HTML element, defining the formats for video in the order we do to make sure that the video will play in older versions of iOS and take into other idiosyncrasies as outline in Pilgrim's page.

```html
<video controls="controls" poster="video/Sintel.png">
  <source src="video/Sintel.mp4" type="video/mp4">
  <source src="video/Sintel.webm" type="video/webm">
</video>
```

In HTML we can write the control attribute as just <code>control</code> but ePub requires you to use the, somewhat sillier, <code>controls="controls"</code> instead.

We also add a type attribute to each source video as a hint for user agents (browsers and e-book readers) to use when deciding if they can play a given format.

## Moving into ePub

### Adding the video

The basic video in ePub is the same than the one we'd use in the open web. We'll use the same video tag as our starting point with only MPEG-4 and WebM formats.

```html
<video 
      controls="controls" 
      width="320" height="240" 
      poster="video/Sintel.png">
  <source src="video/Sintel.mp4" type="video/mp4">
  <source src="video/Sintel.webm" type="video/webm">
</video>
```

This will work as written in most reading systems. Still questioning if we need WebM and if so how pervasive it is in the e-book reader world. 

### Declaring it in the package

Because we are making the video part of the ePub package we need to make sure that we add the components of the video to the <code>package.opf</code>. We do not add them to the spine content because, at the basic level, they are part of a page and not independent content. We are not covering uses of video in the spine of a document.

The items that we added to the package file are listed below:

```xml
<!-- VIDEO AND VIDEO IMAGES -->
<item id="video1-mp4"         href="video/Sintel.mp4"    media-type="video/mp4"/>
<item id="video1-webm"        href="video/Sintel.webm"   media-type="video/webm"/>
<item id="video1-cover"       href="video/Sintel.png"    media-type="image/png"/>
```

As we will discuss later in the essay, one of the first questions that you need to consider is whether to package the video with the book or host it externally. For the purpose of this essay we'll package the video with the book and discuss some alternatives in the section Video considerations for e-books.

### Scripting user interaction

The first part  of the JavaScript code is a generic set of functions that do three things:

* ***checkReadingSystemSupport*** test whether a reader supports the features we'll need for the video to work. The script does this by looping through the values in the neededFeatures variable and if the reader supports the feature then it continues, otherwise it returns false.
* ***togglePlay*** checks if the video ended or if it has paused. If we meet either of these conditions we play or resume video playback; otherwise we pause the video
* ***toggleControls*** checks if the default controls are visible. If they are then the script hides them, otherwise the scripts shows them

```javascript
/**
* Shared functions used in all pages that use video
*/
function checkReadingSystemSupport() {
  var neededFeatures =["mouse-events", "dom-manipulation"];
  var support = typeof navigator.ePubReadingSystem != 'undefined';
  if (support) {
    for (var i = 0; i < neededFeatures.length; i++) {
      if (!navigator.ePubReadingSystem.hasFeature(neededFeatures[i])) {
          return false;
      }
    }
  }
  return support;
}

function togglePlay() {
  var video = document.getElementsByTagName('video')[0];
  if (video.ended || video.paused) {
      video.play();
  } else {
      video.pause();
  }
}

function toggleControls() {
  var video = document.getElementsByTagName('video')[0];
  if (video.controls) {
    video.removeAttribute('controls', 0);
  } else {
    video.controls = 'controls';
  }
}
```

By themselves the functions are good but don't do much for playing the video. This is where the second script comes in. Using the generic functions in the first script, the functions in the second script will take user input, click/tap or double click/double tap, and perform an action based on the input.
 

```javascript
/**
* touch and keyboard based functions
*/

window.onload = function() { // equivalent to jQuery's $(document).ready
  var video = document.getElementsByTagName('video')[0];

  if(checkReadingSystemSupport()) {
     video.removeAttribute('controls', 0);;
  }
  
  video.addEventListener('click', function(e){
    e.preventDefault();
    togglePlay();
  }, false);

  video.addEventListener('dblclick', function(e){
    e.preventDefault();
    toggleControls();
  }, false);    

  video.addEventListener('keyup', function (e) {
    var k = e ? e.which : window.event.keyCode;
    if (k == 32) {
      e.preventDefault();
      togglePlay();
    }
  },false);
}
```

### Testing

Before moving forward make sure that the video(s) and the poster image are in the directory specified in the page and that it matches the directory you used in the package (this issue tricked me the first time I added video to an e-book)

Package the files as you normally would, test that the video works and validate the book with epubcheck. This is the fist stage. 

### Video Considerations for e-books

As mentioned earlier, one of the first things to consider is whether to package the video with the e-book or host it remotely. They both have advantages and disadvantages.

Hosting videos remotely means that your users have to be online to play the video. As far as I know there is no way to cache the video and then play it back when the reader is offline. 

Adding the video to the book increases the size of the book file and, with the more videos in the book, can come close to or get over the size limit of an ePub e-book. Some vendors (like Amazon) charge for the download based on the size of the file being downloaded.

### Example book

The book [cc-shared-culture](https://code.google.com/p/ePub-samples/wiki/SamplesListing#cc-shared-culture) presents multiple ways to add video to your e-book. I've chosen to allow both the default controls as well as a click/tap interface. My concern is always that the user knows how to play the video.

I've also created a shorter book with a video from the [Durian Blender open movie](https://durian.blender.org/) project. It's [hosted in Github](https://github.com/caraya/video-in-ePub) along with the [book]() that uses the code and techniques discussed here
## Creating captions

Defining captions.

> 1. a title or explanation for a picture or illustration, especially in a magazine.
> 2. a heading or title, as of a chapter, article, or page.
> 3. ***Movies, Television.*** the title of a scene, the text of a speech, etc., superimposed on the film and projected on the screen.
>
> From [dictionary.com](http://dictionary.reference.com/browse/caption?s=t)

### What's the difference between captions and subtitles

Although captions and subtitles are similar in the way we create them and add them to videos, they are different in purpose.

**Captions** serve primarily as an accessibility device that allows people with deaf or who are hard of hearing to fully access the video. Captions also help in situations where the video has no audio, the owner of the video muted it or provided no audio or the environment is too loud for people to listen to the audio.

**Subtitles** provide translation of the audio and, sometimes, other audio clues to other languages. A kind of subtitles, SDH (Subtitles for the Deaf and Hard of hearing), provides context for the subtitled audio.

### Types of captions

As far as Web video captions are concerned there are two types of captions. 

TTML (Timed Text Markup Language) is an XML-based captioning system. It is a World Wide Web Consortium [recommendation](http://www.w3.org/TR/ttaf1-dfxp/). **Internet Explorer is the only browser that supports the technology**.

WebVTT (Web Video Text Tracks) is a community-led caption format (it is not a W3C draft or recommendation). It's similar in structure to SRT captions and there was an earlier proposal called WebSRT. **All modern browsers support this type of captions.**

### VTT captions in detail

We will concentrate in the captioning aspect of the VTT "spec" and will not address other aspects of VTT such as metadata, karaoke styling and other. If you want to read the [specification](http://dev.w3.org/html5/webvtt/) or this [HTML5 Doctor](http://html5doctor.com/video-subtitling-and-webvtt/) article on video subtitling.

At its simplest a VTT file is a text file formatted as shown below (and used with the Sintel video in the book)

```
WEBVTT

1
00:00:12.000 --> 00:00:15.000 A:middle T:10%
<v.gatekeeper>What brings you to the land
of the gatekeepers?

2
00:00:18.500 --> 00:00:20.500 A:middle T:80%
<v.sintel>I'm searching for someone.

3
00:00:36.500 --> 00:00:39.000 A:middle T:10%
<v.gatekeeper>A dangerous quest for a lone hunter.

4
00:00:41.500 --> 00:00:44.000 A:middle T:80%
<v.sintel>I've been alone for as long as I can remember.  
```

The hardest part of creating the captions is the timing. It requires hundredth of a second timing and we need to write all digits (even if they are 0) for the VTT cue to display and  validate. 

### controlling positioning of the cue

In addition to adding the timed text we can control the placement of the caption inside the <code>video</code> element

According to HTML5 Doctor, we can use the following positioning attributes 

***D:vertical / D:vertical-lr***

Display the text vertically rather than horizontally. This also specifies whether the text grows to the left (vertical) or to the right (vertical-lr).


***L:X / L:X%***

Either a number or a percentage. If a percentage, then it is the position from the top of the frame. If a number, this represents what line number it will be.

***T:X%***
The position of the text horizontally on the video. T:100% would place the text on the right side of the video.

***A:start / A:middle / A:end***

The alignment of the text within its box – start is left-aligned, middle is centre-aligned, and end is right-aligned. This syntax is similar to how SVG handles alignment

***S:X%***

The width of the text box as a percentage of the video width.


Some examples of the styles above:

```
00:00:01.000 --> 00:00:10.000 A:middle T:50%
00:00:01.000 --> 00:00:10.000 A:end D:vertical
00:00:01.000 --> 00:00:10.000 A:start T:100% L:0%
```


### Built-in styles

**Bold text**:  &lt;b>Lorem ipsum&lt;/b>

**Italic text**: &lt;i>dolor sit amet&lt;/i>

**Underlined text**: &lt;u>consectetuer adipiscing&lt;/u>

**Ruby text**: &lt;ruby>見&lt;rt>み&lt;/rt>&lt;/ruby>

### Additional styles

You can apply a CSS class to a section of text using <code>&lt;c.myClass>Lorem ipsum&lt;/c></code>, giving us many more styling options.

You can also add a voice indicator to your cue using something like &lt;code>&lt;v Tom>Hello world&lt;/v>. This declaration accomplishes three things:

* The caption will display the voice (Tom) in addition to the caption text.
* A screen reader can read the name of the voice, possibly event using a different voice for male or female names.
* It offers a hook for styling so that all captions for Tom could be in blue.

## Putting it all together

Now that we've built the video tag and we've taken a look at how to build the VTT caption track we're ready to put them together. If we're working with a single language caption file the result will look like this:

```html
<video 
      controls="controls" 
      width="320" height="240" 
      poster="video/Sintel.png">
  <source src="video/Sintel.mp4" type="video/mp4">
  <source src="video/Sintel.webm" type="video/webm">
  <track src="sampleCaptions.vtt" kind="captions" srclang="en">
</video>
```
The code above is enough to add English captions to the video and have them play using the user agent (browser or reader) native ability.

Furthermore, we can specify multiple caption and subtitles tracks that will allow the user to select which language to view the captions in. The code allowing the user to choose between English captions, German and French subtitles looks like this:

```html
<video 
      controls="controls" 
      width="320" height="240" 
      poster="video/Sintel.png">
  <source src="video/Sintel.mp4" type="video/mp4">
  <source src="video/Sintel.webm" type="video/webm">
  <track src="Sintel-en.vtt" kind="captions" srclang="en">
  <track src="Sintel-de.vtt" kind="subtitles" srclang="de">
  <track src="Sintel-fr.vtt" kind="subtitles" srclang="fr">
</video>
```
### Testing

Prepare your book as you normally would. The testing now requires to test the captions; whether you can show them and whether you can switch th

## Additional links and resources

* [VTT community specification](http://dev.w3.org/html5/webvtt/)
* [Video section of the HTML5 specification](http://dev.w3.org/html5/spec-author-view/video.html)
* [Track element specification](http://dev.w3.org/html5/spec-author-view/video.html#the-track-element)


