## Quick Note: AOM and AV1

Something to keep an eye out for regarding royalty free video codexes is AV1 from the [Streaming Media Alliance](https://www.streamingvideoalliance.org/). While it's still under development with a final code freeze expected by 12/31/17 it shows promise of doing better than HEVC and not having any of the royalty nightmares from HEVC patent pools.

Before diving into AV1, let's talke a look at the organization building it, the Alliance for Open Media. In [What is AV1?](http://www.streamingmedia.com/Articles/Editorial/What-Is-.../What-is-AV1-111497.aspx) Jan Ozer writes:

> The Alliance for Open Media was announced on September 1, 2015 with charter members Amazon, Cisco, Google, Intel Corporation, Microsoft, Mozilla, and Netflix. At the time, the formation consolidated the development of three potentially competitive open source codecs; Cisco's Thor, Google's VP10, and Mozilla's Daala. According to the initial press release, the goal was to produce a "next-generation video format" that is:
>
> * Interoperable and open
> * Optimized for the web
> * Scalable to any modern device at any bandwidth
> * Designed with a low computational footprint and optimized for hardware
> * Capable of consistent, highest-quality, real-time video delivery
> * Flexible for both commercial and non-commercial content, including user-generated content.
>
> According to the AOM license terms, all licensors receive a **_"perpetual, worldwide, non-exclusive, no-charge, royalty-free, irrevocable (except as expressly stated in this License) patent license to its Necessary Claims to make, use, sell, offer for sale, import or distribute any Implementation."_** There is no requirement for licensees to disclose any of their own code. The Alliance will pursue all codec developments via an open source repository. [emphasis mine]
>
> On April 5, 2016, the Alliance announced that IP provider ARM and semiconductor companies AMD and NVIDIA joined the Alliance to help ensure that the codec was hardware-friendly, and to facilitate and accelerate AV1 hardware support.
>
> In terms of makeup, the Alliance members enjoy leading positions in the following markets:
>
> * Codec development - Cisco (Thor) Google (VPX), Mozilla (Daala)
> * Desktop and mobile browsers - Google (Chrome), Mozilla (Firefox), Microsoft (Edge)
> * Content - Amazon (Prime), Google (YouTube), Netflix
> * Hardware co-processing - AMD (CPUs, graphics), ARM (SoCs, other chips), Intel (CPUs), NVIDIA (SoC, GPUs)
> * Mobile - Google (Android), Microsoft (Windows Phone)
> * OTT - Amazon (Amazon Fire TV), Google (Chromecast, Android TV)

So the members of the alliance are positioned to make AV1 adoption much easier than it normally be. The members are clearly leaders in their respective areas and can make things happer faster than they would otherwise.

Last September Ozer provided a [status update on AV1](http://www.streamingmedia.com/Articles/Editorial/Featured-Articles/AV1-A-Status-Update-120214.aspx) which did several things:

* It confirmed the December 31 bitstream freeze date. So hardware and software development on top of the spec can begin after the freeze, if it hasn't already
* That participants expect at least a 20% improvement over HEVC before they consider the code ready for production
* Encoding complexity should be no greater than 5x HEVC's encoding complexity
* There hasn't been much information on the legal front. [The Alliance for Open Media: The Latest Challenge to Patent Pools](https://www.stoutadvisory.com/insights/article/sj17-the-alliance-for-open-media) presents an interesting analysis of the legal ramifications and posibilities for other industries to fight against patent pools in their areas

Around this time [Bitmovin](https://bitmovin.com/) announced their joining the Alliance and produced the first [AV1-based live encoding](https://bitmovin.com/bitmovin-supports-av1-encoding-vod-live-joins-alliance-open-media/). They have also produced, in collaboration with mozilla, a demo of [DASH delivered, AV1 encoded video](https://hacks.mozilla.org/2017/11/dash-playback-of-av1-video/) via Firefox. The [demo](https://demo.bitmovin.com/public/firefox/av1/) requires[ Firefox Nightly](https://www.mozilla.org/en-US/firefox/channel/desktop/#nightly) and will not work with any other browser.

In THEOplayer's [What is AV1? Past, Present & Future](https://www.theoplayer.com/blog/what-is-av1-past-present-future) the authors write that:

> Whether AV1 will deliver the promised performance, we will have to see when the bitstream is finalized and experts start talking about their experience with the codec. As for the legal matters surrounding the codec, it is something to keep in mind, but it most likely will not create any significant obstacles . The real question is how quickly the codec gets adopted, both by device manufacturers but also by video services who need to upgrade or replace their existing streaming infrastructure.
>
> In short, surely keep your eyes and ears open for news and performance rapports about AV1, but for now, depending on your viewer market and their devices, it might be wise to stick to H.264, go with VP9 or H.265 or even look at alternative's such as V-Nova's Perseus codec.
