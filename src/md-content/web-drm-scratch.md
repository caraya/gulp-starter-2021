## Gatekeepers

Different companies provides different means to encrypt media content but with these different CDMs and encryption schemas come some significant questions.

Do companies need to always support open source projects? How do you balance the need for access with the need for security? Are companies required to support all projects that request access to their encryption technoologies? Do content creators have a say in the matter? What about licensing issues? The GPL is particularly problematic because of its viral nature.

One incident in particular concerns me. Not because it's Google and Widevine, or because it was an open source project that got denied, or even the way that Widevine communicated the rejection.  What concerns me is the automatic assumptions both in the original post and the media articles that followed it makes about open source project and DRM.

Accoording to Samuel Maddock's blog post:

> The browser I’m building, called Metastream, is an Electron-based (Chromium derived), MIT-licensed browser hosted on GitHub. Its main feature is the ability to playback videos on the web, synchronized with other peers. Each client runs its own instance of the Metastream browser and transmits playback information to keep them in sync—no audio or video content is sent.
>
> If someone is creating a browser that wants to playback media, they’ll soon discover the requirement of DRM for larger web media services such as Netflix and Hulu. There are a few DRM providers for the web including Widevine, PlayReady, and FairPlay.
>
> As far as I’m aware, Widevine is the only available DRM for a Chromium-based browser, especially so for Electron. Chromium accounts for roughly 70% market share of all web browsers, soon to include Microsoft’s upcoming Edge browser rewrite. Waiting 4 months for a minimal response from a vendor with such a large percentage of the market is unacceptable.
>
> From: [I tried creating a web browser, and Google blocked me](https://blog.samuelmaddock.com/posts/google-widevine-blocked-my-browser/)

So, if I'm understanding this correctly, this a video sharing service where multiple people can view the same video, even if they don't have access to the service or the account, right? Because there is no video actually played on the other clients there is no way to enforce DRM through EME or any technological means, correct?

Sure, video playback will sooner or later require EME-enabled browsers and one or more DRM vendors to provide their CDM (Content Decryption module) for the browsers to gain access to copy protected content. But the browser will work just fine without EME and without access to a CDM for encrypted content.

When I built Chromium from source I did with the understanding that I wouldn't be able to play any Youtube content. I was surprised whe most Youtube videos still played without DRM.


https://boingboing.net/2019/04/03/i-hate-being-right-2.html

https://www.bloomberg.com/news/articles/2019-05-28/google-s-chrome-becomes-web-gatekeeper-and-rivals-complain
