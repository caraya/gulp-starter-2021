# Media Capabilities API


We can use this API to query the device if this is an appropriate format to play in it. It returns whether the media type (audio or video):

* Is supported
* Will play smoothly
* Is power efficient

Based on the answers you can decide if you will show the video to the user, provide a smaller alternative or provide a fallbackk right away.

This is an alternative to adaptive video playback where the player decides what resolution to play (of those available) based on the user device's characteristics.

```javascript
const configuration = {
  type : 'file',
  video : {
    contentType : 'video/mp4; codecs=avc1.64001E',
    width : 640,
    height : 480,
    bitrate : 10000,
    framerate : '30'
  }
};
navigator.mediaCapabilities.decodingInfo(configuration)
  .then((result) => {
    console.log(result.contentType + ' is:'
    + (result.supported ? '' : ' NOT') + ' supported,'
    + (result.smooth ? '' : ' NOT') + ' smooth and'
    + (result.powerEfficient ? '' : ' NOT') + ' power efficient');
  })
  .catch((err) => {
    console.error('encodingInfo to threw an error ', err);
  });
```

There is another section of the spec, currently under development that will query display capabilities such as luminance, color depth, and color gamut but those sections are not complete and, to be honest, are less interesting than learning how to handle video without doing DASH or HLS or providing an optimized viewing experience if you choose to use Adaptive Streaming anyways.
