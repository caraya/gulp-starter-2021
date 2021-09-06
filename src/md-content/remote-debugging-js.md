# Remote Debugging Javascript

There are times when the mobile version of an app doesn't work but the actual version does, or we might want to run the app in an actual device to see how it works.

We need a way to run the code on a real mobile device so we can debug code issues and see how the app works under real mobile device conditions.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">People sometimes suggest I should calm down about web performance because the web feels fine on *their* phone.<a href="https://twitter.com/DasSurma?ref_src=twsrc%5Etfw">@DasSurma</a> and I pulled a little data to try to visualise why that might be both true and not particularly relevant: <a href="https://t.co/9EfoaEJLgf">pic.twitter.com/9EfoaEJLgf</a></p>&mdash; Alex Russell (@slightlylate) <a href="https://twitter.com/slightlylate/status/1139684093602349056?ref_src=twsrc%5Etfw">June 15, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Ideally you'd test with a device that reflects your users' and, sadly, that's not trending up like developers would want. The average device is not the iPhone or high-end Android device in most developer's pocket. It's more likely to be a lower powered asymetric multi-core device.

I won't go into the details of why mobile performance in mid and lower range of devices is not good. Alex Russell has a great [blog post](https://infrequently.org/2021/03/the-performance-inequality-gap/) and a [presentation from 2016](https://www.youtube.com/watch?v=4bZvq3nodf4) that covers this topic.

The post will look at how ton use the browser's DevTools to debug issues.

## Safari in iOS on macOS

To get your iOS mobile device to work with Safari in macOS, follow these steps:

1. Connect your device to your computer via USB
2. Unlock the device
3. In Safari, go to the `Develop` menu. You should see the device name listed
   * If the device is locked you will see a grayed out `Unlock Device with Passcode` message
4. In your mobile device navigate to your app
   * Once the device is unlocked you should see the app and the associated service worker if one is running for the site/app
5. Click on the site name. That will open the developer tools on your desktop browser
   * You can use the elements panel to inspect and interact with the page
   * You can use the console to modify the content of the page
