# Video (web) Component

I've always been interested in seeing how to build a component from scratch and I've always been interested in working with video so why not work on a web component that plays back video with the HTML video tag and associated technologies. We'll talk briefly about these technologies and then we'll jump into the code using Polymer 1.0.

## The idea

The idea is to create a web component that will look something like this. 

```xml
<athena-video height='320' width='480' controls poster='images/poster.png'>
  <video-source formats='mp4 webm' url="my-video.mp4"></video-source>
  <video-source formats='webm' url="my-video.webm"></video-source>
  <!-- Subtitles -->
  <video-subtitle languages='en' type='subtitle'></video-subtitle>
  <video-subtitle languages='es' type='subtitle'></video-subtitle>
  <video-subtitle languages='fr' type='subtitle'></video-subtitle>
  <video-subtitle languages='de' type='subtitle'></video-subtitle>
  <!-- Captions -->
  <video-track language='en' type='caption'></video-subtitle>
  <video-track language='es' type='caption'></video-subtitle>
  <!-- Chapter -->
  <video-track language='en' type='chapter'></video-track>
  <!-- Description -->
  <video-track language='es' type='description'></video-track>
</athena-video>
```

We also need to acommodate older browsers that, most likely, will need a Flash-based plugin fallback or links to the source videos.

# The pieces

## HTML5 Video

When it was first introduced HTML video was a revolution. For the first time we could run video without a plugin and were free from Flash, Silverlight and other video plugins. 

Because we are using tags to define the video we can use tags and attributes to define and describe what the video looks like and what formats of the video will look like. A sample of the HTML5 video tag looks like this:

```html
<video 
  width='480' height='320'  controls="controls" poster="video/Sintel.png">
  <source src="video/Sintel.mp4" type="video/mp4">
  <source src="video/Sintel.webm" type="video/webm">
 </video>
``
The example above defines the following via attributes

* Size of the video (width and height)
* Whether controls are available for this video
* The location for the video's poster image (the image that will display before the video starts)

It also uses child elements to define the video formats we will load, the order in which the browsers will look at them and the location of each individual files. 

### Different formats

All was not silver roses... browser vendors could not agree in a common format for video so they adopted multiple video formats for the video tag and none of them are completely free to use. 

Some vendors (Google, Microsoft and Apple) pushed for [MP4 video](https://en.wikipedia.org/wiki/H.264/MPEG-4_AVC) (also known as AVC or MPEG-4 Part 10, Advanced Video Coding.) as their solution for  I remember going to one of the last QuickTime Live conferences (before it folded into Macworld) and being blown away by the quality of the video and how it was presented. I told myself that I wanted to do something like that and that I wanted my videos to be crisp and not eat all available badnwidth. 

[MP4](https://en.wikipedia.org/wiki/MPEG-4_Part_14), as a propietary format, is encumbered by all sorts of patents and royalty schemes from the [MPEG LA](http://www.mpegla.com/main/default.aspx) as a holder of the patent pool for h264 and MP4 video

Mozilla and Opera (before adopting Blink as their rendering engine) supported [Theora](http://www.theora.org/), an open format without license encumberance, in an [OGG](https://xiph.org/ogg/) container, betting that the open source community would rally around the open format and eschew MP4 altogether. 

But even Mozilla caved in their resistance to MP4 for video on the browser, as Brendan Eich [points out](https://groups.google.com/forum/#!topic/mozilla.dev.platform/-xTei5rYThU%5B126-150%5D) Firefox has little to no foothold in the market and, since Google has not made good on their January 2011, pledge to drop H.264 support from Chrome, Mozilla was left in the not very enviable position where they were the only ones defending a codec that never really took off. 

I also have some questions about the licensing for Theora. From the Theora FAQ

> Q. Isn't VP3 a patented technology?

> The Xiph.org Foundation has negotiated an irrevocable free license from On2 to the VP3 codec. It is legal to use VP3 in any way you see fit (unless, of course, you're doing something illegal with it in your particular jurisdiction). You are free to download VP3 and Theora, use them free of charge, implement them in a for-sale product, implement them in a free product, make changes to the source and distribute those changes, or print the source code out and wallpaper your spare room with it.

> For more information, check the VP3 Legal Terms on the SVN page. 

But all of On2's Intellectual property is owned by Google, a company with a vested interest in a competing codec.  Are they bound by On2's irrevocable free license? Is in Google's best interest to continue honoring that license grant?

Google, in their efforts to 'be open', created a new video codec based on VP8 and called it [WebM](http://www.webmproject.org/) and released it as a pattented product with a royalty free license. They've moved some Youtube content (not certain how much) to [HTML5](https://www.youtube.com/html5) and WebM as one of the available codecs, the other being h264.

http://arstechnica.com/business/2011/04/google-builds-webm-patent-pool-of-its-own-to-fight-back-against-mpeg-la/

http://blog.webmproject.org/2013/03/vp8-and-mpeg-la.html

http://www.theregister.co.uk/2013/03/08/google_mpegla_webm_patent_license/

## VTT Video Tracks

[WebVTT: The Web Video Text Tracks Format](http://dev.w3.org/html5/webvtt/) is a W3C Community Specification 

http://publishing-project.rivendellweb.net/html5-video-captioning-using-vtt/

All the tracks work similarly in the sense that they use the same syntax with different attributes indicating the type of track we're working with. 

### Captions

Captions are the most traditional track available through VTT and the one used most often

### Subtitles

### Chapter

### Description
