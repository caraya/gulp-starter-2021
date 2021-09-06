# Quick Note: Video Containers

I was working on reecoding videos to HEVC from DVD contetnt I had ripped off before I lost access to a DVD player on my laptop. Yay, Apple. I couldn't understand why the captions (in `.ass` format) would not render with the formatting they were created with.

A quick jump on the FFMPEG web chat made it clear that it was a veccontainer issue, not a caption or re-encoding one.

**Not all container formats support the same feature sets.**

Wikipedia's [Comparison of Video Containers](https://www.wikiwand.com/en/Comparison_of_video_container_formats) gives you an idea of the breadth and depth of the container fields out there.

This is different than the codecs that you use for audio and video. Both my favorite containers, Matroska with a `mkv` extension and MPEG4, with an `mp4` extension both support `hevc` for video and `acc` for audio. The big difference, at least according to people in the FFMPEG chat is that Matroska can handle captions where MPEG4 cannot.

Once again I'm reminded that whenever we work with video we need to be careful with formats, encoding laders, containers and a lot of other items before our users see any of the content we are working with.
