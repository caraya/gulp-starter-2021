# Quick Note: Grabbing the first frame of a Youtube video

One of the things I find particularly difficult when working with Youtube videos directly (without lazy loading) is that I don't get an image to use as a poster frame for the embedded videos. Instead of using locally hosted videos where I have more control of and that looks like this:

```html
<video
  poster="images/video-poster.jpg"
  controls muted autoplay>
  <source
    src="video/video.webm"
    type="video/webm">
  <source
    src="video/video.mp4"
    type="video/mp4">
</video>
```

I have created a `video` class to wrap around the iframe Youtube gives me and the result looks like this:

```html
<div class="video">
  <iframe width="560" height="315"
  src="https://www.youtube.com/embed/oB6RbS-NLmw"
  frameborder="0" allowfullscreen></iframe>
</div>

```

There are ways to write the embed programmatically and get the embed to work they way you want but it's Javasacript (I don't use Javascript for non interactive elements unless I absolutely have to) and it may get you in trouble with Youtube down the road.

The poster image issue is one of fallback. If the video is not available I would love to be able to do something like this in the video tag or in a wrapper around it.

```html
<div class="video"
  style="background:
  url("https://i2.ytimg.com/vi/GY_y-VAOepQ/0.jpg");
  height: 315px; width: 560px;">
<video
  controls muted autoplay>
  <source
    src="video/video.webm"
    type="video/webm">
  <source
    src="video/video.mp4"
    type="video/mp4">
</video>
</div>
```

Yes, I know that the inline style looks ugly but according to this [MDN article on specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity) it's the only way to override existing styles without rewriting the stylesheet.

The URL I used is a direct link to the video with that ID. Since our background image is using the same image the video will use we don't need to worry, the user will still get the same image whether they are viewing the background to the div or the first frame of the video.

Problem solved, I think
