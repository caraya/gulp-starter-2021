# AV1 video now in browsers

While at the [Chrome Dev Summit](https://developer.chrome.com/devsummit/) I learned several things that made me really happy, one of them is abou video: You can play <a href="https://aomedia.org/av1-features/get-started/">AV1</a>video in browsers (currently Chrome, Opera, Firefox, and Edge) using the `video` element.

Firefox and Bitmovin have had a [demo for AV1 playback](https://demo.bitmovin.com/public/firefox/av1/) for a while but it's hardcoded to play in Firefox nightly so it wasn't a good way to test playback capabilities.

The supported browsers each come with caveats.

* As of this writing, AV1 supports only works in Firefox Nightly
  * Must enable `media.av1.enabled` in `about:config`
* Works in Chrome 70 and newer and Opera 57 and newer for Desktop only
  * Must enable the `#enable-av1-decoder` flag in `chrome://flags` or `opera://flags`
* Supported in Edge but not IE
  * Must install the `AV1 Video Extension (Beta)` from the Microsoft Store

## Compressing the video

I took an HEVC/H265 video in an MP4 cotainer and converted it using <a href="https://www.ffworks.net/">ffWorks</a>, an <a href="https://www.ffmpeg.org/">FFMPEG</a> front-end</a>.

I've also created the AV1 video file using FFMPEG from the command line to validate the command line pipeline but, for the purpose of this article, how we get the video is secondary to actually having it.

## Using the `video` element

The first way to test how AV1 works in the browser is to load it directly into the page using the video element.

The example below uses a single `source` element to illustrate usage. In production you will want multiple sources with different formats that the browser can select from.

The one thing I did different for this example, and that I will do for most videos using AV1, is to fully specify the `type` attribute for the source including the `codecs` portion. I do this becaue there are other formats available in MP4 containers and we want to give browsers as much information as possible to make sure it ownly downloads the AV1 video when it can play it.

```html
<video  controls
        playsinline
        class="video"
        poster="images/poster.jpg">
  <source src="footloose.mp4" type='video/mp4; codecs="avc1.4d401f"'>
</video>
```

## Uploading to YouTube

YouTube allows content creators to upload AV1 videos (in MP4 container) without erroring out but, sadly, it seems to convert them to H264 as part of the upload process. I've asked YouTube Developers on Twitter if users are allowed to upload AV1 video to the platform and I'm still waiting to hear from them.

So, instead of using the same video, I've chosen to work with a video from YouTube's [AV1 Beta Launch Playlist](https://www.youtube.com/playlist?list=PLyqf6gJt7KuHBmeVzZteZUlNUQAVLwrZS) to see how well it works.

```html
<iframe width="560" height="315"
 src="https://www.youtube.com/embed/Fmdb-KmlzD8"
 frameborder="0"
 allow="accelerometer; autoplay;
 encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen></iframe>
```

As you can see the iframe embed for an AV1 video is no different than any other YouTube embedded video. The main advantage is that the files tend to be smaller than h264/h265 and slightly smaller than VP9 videos.

<iframe width="560" height="315" src="https://www.youtube.com/embed/Fmdb-KmlzD8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### My video experiment

When I first started working with this I thought that my video was transcoded to MP4 on upload but wanted to make sure, the embed below plays as AV1 video and MP4a audio, exactly as encoded. 

Once again the embed is no different than the embed we use to play other formats supported in Youtube. 

```html
<iframe
allow="accelerometer; autoplay; encrypted-media; gyroscope;
picture-in-picture"
  allowfullscreen
  frameborder="0"
  height="315"
  src="https://www.youtube.com/embed/ZYidbf5Jtfc"
  width="560"></iframe>
```

And, if your browser supports it, you can play the video below:

<iframe allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
  frameborder="0"
  height="315"
  src="https://www.youtube.com/embed/ZYidbf5Jtfc"
  width="560"></iframe>

## Notes about support:

Currently you can play AV1 video in Chrome (desktop), Firefox (desktop), and Edge, with the following caveats:

* As of this writing, AV1 supports only works in Firefox 63 and newer
  * Must enable `media.av1.enabled` in `about:config`
* Works in Chrome 70 and newer
  * Must enable the `#enable-av1-decoder` flag in `chrome://flags`
* Supported in Edge but not IE
  * Must install the AV1 Video Extension (Beta) from the Microsoft Store

