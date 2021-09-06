# Using video instead of animated gif

Animated GIFs are a good way to demonstrate short sequences of events or actions in your browser or application. The flipside is that the files tend to be unnecessarily large.

One way to reduce the file size is to convert it to video. In this post I'll take a look at the conversion and display of this animated "gifs".

For the video conversion we'll use [FFMPEG](https://www.ffmpeg.org/) command line utility as we've done with most of the prior work posted here.

We'll use 2 video codecs to replace the GIF file: MP4 and VP9.

## MP4 first

We do care about the quality of the video so we'll use Constant Rate Factor (CRF) to make sure that we get the best possible quality for the given file.

The command is:

```bash
ffmpeg -i input.gif -b:v 0 -crf 25 output.mp4
```

## WebM next

I have configured my version of FFMPEG to work with VP8 and VP9; It is not included in a default FFMPEG installation.

Once it is configured we can use it to generate a WebM-based VP9 video. For this version we have to include the codec (`-c vp9`) in addition to the commands we used for MP4.

This is the command:

```bash
ffmpeg -i input.gif -c vp9 -b:v 0 -crf 41 output.webm
```

## Putting it all together

The video tag that we use to play the video is pretty much standard. I'm using the attributes of the video tag:

* `autoplay` to make sure the video plays automatically, just like the GIF would
* `loop`
* `muted` because the video doesn't have audio
* `playsinline` prevents mobile players from going full screen to play the video

```html
<video autoplay loop muted playsinline>
  <source src="animated-gif-video.webm" type="video/webm">
  <source src="animated-gif-video.mp4" type="video/mp4">
</video>
```

Note that **the order of the source tags does matter**. The browser will stop at the first format that it can play and discard all the others. If we put MP4 first then the browser will play that format, even if it can play VP9 video.

You'll have to play with the CRF value on both formats to measure quality versus the size of the file.

In my experiment I got the following size reductions using the commands explained earlier in the post:

<table>
  <thead>
    <th>Format</th>
    <th>Size</th>
  </thead>
  <tbody>
    <tr>
      <td>Animated GIF</td>
      <td>14.4 MB</td>
    </tr>
    <tr>
      <td>MP4</td>
      <td>704 KB</td>
    </tr>
    <tr>
      <td>VP9</td>
      <td>636 KB</td>
    </tr>
  </tbody>
</table>

You will also have to see how this interact with proxy browsers and Chrome's data saver feature.

Finally, if you don't want to go through this process, you can use tools like Screenflow or even Captivate to capture the task or event in a video format and, maybe, compress it if needed.
