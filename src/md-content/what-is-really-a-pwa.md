# What is really a PWA?

Two recent posts made me revisit PWAs, what they are and how we should proceed moving forward. Since Alex Russell and Francisc Berriman coined the term (in [Progressive Web Apps: Escaping Tabs Without Losing Our Soul](https://infrequently.org/2015/06/progressive-apps-escaping-tabs-without-losing-our-soul/)) I've seen a lot written about PWAs (including the course I collaborated in while at Google) and a lot of confusion as to what makes a Progressive Web Application.

From the beginning, Frances and Alex defined these as the characteristics of a PWA:

* **[Responsive](http://alistapart.com/article/responsive-web-design)**: to fit any form factor
* **Connectivity independent**: Progressively-enhanced with [Service Workers](http://www.html5rocks.com/en/tutorials/service-worker/introduction/) to let them work offline
* **App-like-interactions**: Adopt a Shell + Content application model to create appy navigations &amp; interactions
* **Fresh**: Transparently always up-to-date thanks to the Service Worker update process
* **Safe**: Served via TLS (a Service Worker requirement) to prevent snooping
* **Discoverable**: Are identifiable as “applications” thanks to [W3C](https://w3c.github.io/manifest/) [Manifests](https://developers.google.com/web/updates/2014/11/Support-for-installable-web-apps-with-webapp-manifest-in-chrome-38-for-Android) and Service Worker registration scope allowing search engines to find them
* **Re-engageable**: Can access the re-engagement UIs of the OS; e.g. [Push Notifications](https://developers.google.com/web/updates/2015/03/push-notificatons-on-the-open-web)
* [**Installable to the home screen through browser-provided prompts**]( https://developers.google.com/web/updates/2015/03/increasing-engagement-with-app-install-banners-in-chrome-for-android?hl=en">), allowing users to “keep” apps they find most useful without the hassle of an app store
* **Linkable**: meaning they’re zero-friction, zero-install, and easy to share. The social [power of URLs](http://www.theatlantic.com/technology/archive/2012/10/dark-social-we-have-the-whole-history-of-the-web-wrong/263523/) *matters*



So we know what to build and have the technologies to do so. So why don't we.

As Paul points in his post it is not easy to do from a technical standpoint and it's not easy to convince developers, particularly those working in content-only sites that PWAs are good for them.


## Links and Resources
* https://infrequently.org/2015/06/progressive-apps-escaping-tabs-without-losing-our-soul/
* https://fberriman.com/2017/06/26/naming-progressive-web-apps/
* https://alistapart.com/article/yes-that-web-project-should-be-a-pwa
* https://adactio.com/journal/13884
* https://medium.com/@amberleyjohanna/seriously-though-what-is-a-progressive-web-app-56130600a093
* https://dev.to/ben/what-the-heck-is-a-progressive-web-app-seriously-923
* https://paul.kinlan.me/pwa-progressive-web-all-the-things/
