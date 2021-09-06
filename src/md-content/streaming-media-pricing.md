# What to look for when quoting streaming prices

Video on the web, whether streaming or progressive, has always been a difficult subject to research and to explain. When the web first started offering video as part of web experiences they were played through plugins like QuickTime, Flash and Silverlight (the later two also able to play encrypted content).

When HTML5 became a thing one of the first new features was the ability to play video without a plugin using the `video` element and one or more sources for the video we want to play. In the surface this is awesome but there is a problem in it: The video format was never standardized so each browser would use their own prefered format and developers had to either encode content three times or drop one or more of those formats. The formats were:

* OGG container with Theora Video and Vorbis audio used by Mozilla because it's open source and not patent encumbered
* MP4 container with H264/AVC video used by Chromium browsers, Safari, IE and Edge
* WebM container with VP8 video and Vorbis audio used by Google as an alternative to MP4 and its patent encumbrance

These formats, when first released, were not compatible. In order to reach as wide an audience as possible you had to encode each video in the three formats and then use multiple sources like in the example below:

```html
<video width="560" height="315" controls poster="path/to/poster.png">
  <source src="/path/to/flower.ogv" type="video/ogg">

  <source src="/path/to/flower.webm" type="video/webm">

  <source src="/path/to/flower.mp4" type="video/mp4">
</video>

Things have changed. Despite its ugly licensing issues, H264 continues to be widely used.
