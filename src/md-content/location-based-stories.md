# Location Based Stories

I've always been interested in interactive stories. At first I thought we may be able to use the locations as portals to 3D environments and collaborative experiences.

<div class="message info">
  <p>&nbsp;</p>
  <p>This is a different take on location based stories than <a href="https://publishing-project.rivendellweb.net/digital-storytelling-place-based-stories/">Digital Storytelling: Place-based stories</a>. That one relied on beacons and people accessing the content by visiting the place directly and wasn't particularly concerned with how to build the story itself.
  <p>&nbsp;</p>
</div>

A few days ago (as I write this) I saw [Inside The Silent History](http://contentsmagazine.com/articles/inside-the-silent-history/) and it made me think perhaps there is another way to look at telling stories on the web.

Using a combination of Geolocation, multimedia and well-typeset content authors can drastically change the way they tell stories online.

In this post I will explore some ideas of what these stories can look like and what tools we can use to make them.

## Geolocated Stories

At I/O Google introduced the [Google Maps Gaming Platform](https://cloud.google.com/maps-platform/gaming/) as an offering for world-wide massive multi-user platform games like [The Walking Dead: Our World](https://www.thewalkingdeadourworld.com/), [Ghostbusters World](https://www.facebook.com/GhostbustersWorldOfficial/) and [Jurassic World Alive](https://www.ludia.com/en/games/jurassic-world-alive).

So what does AR MMORPGs have to do with telling stories?

Developers can use the same system that generates  locations for the MMORPGs monsters and loot to generate locations for story points when told at scale where I only need to worry about the content rather than building the location infrastructure ourselves.

One thing I need to do is figure out if we the gaming API supports the web as a target or if it's targeted to Unity (and possibly Unreal) for app development.

There are simpler APIs for location tracking like the basic [Google Maps Platform](https://cloud.google.com/maps-platform/) or [Mapbox](https://www.mapbox.com/) that work if Google's gaming API is too much in terms of numbers of locations or in terms of financial cost.

## So what kind of stories?

One of the first stories that came to mind when thinking about location based stories was [Rayuela](https://es.wikipedia.org/wiki/Rayuela_(novela)) (Hopscotch in English) where some of the story is specifically tied to a location... this would make them less appealing for people who don't live in or near that location.

Is it worth it to retrofit existing stories with location-based content? I think it might be too much to try and adapt local content to a global audience but, as usual, it'll depend on the story, but I think that it will work better with content purpose made for this kind of story telling.

## Can we combine them with location based games and other web content?

While it is possible to combine location based story telling with games (either VR or AR based)  particularly with magic windows (see the [WebXR Explainer](https://github.com/immersive-web/webxr/blob/master/explainer.md) definition of inline XR content for an explanation of Magic Windows), the first time should keep them separately until we know what the story will look like.

As far as other technologies go there is no reason to worry about compatibility. As long as it plays in a web browser we can play the content as part of our stories... as they say, the sky is the limit. Even if it's built for platforms other than the web, We can use Web Assembly to transform the content into something that will play in browsers like what Unity, and Epic Games have done with games.

## If the story is location based how do you make it so it appeals at people in other locations?

One thing to note is that geolocated stories don't mean that every aspect that we have to geolocate everything in the story.

We might want to create a secondary, collaborative thread, where we add secondary stories (maybe crowdsourced like in Silent Story) or additional content that would benefit from being "in a place", whether it's the place where the story happens or somewhere else.

Another aspect that may be appealing to readers/users is to let the story grow based on their participation. Think of it as tabulating the results of events in an MMO and basing the ongoing story on the tabulated results.

## Links and Resources

* [The Silent Story](http://www.thesilenthistory.com/)
* [The Silent Story: What Is This](http://www.thesilenthistory.com/what)
* [The Silent Story: FAQ](http://www.thesilenthistory.com/faq)
* [The Silent History: A Digital Novel Tied to Reality](https://www.kqed.org/arts/108660/the_silent_history_a_digital_novel_tied_to_reality)
* [Taking Storytelling Digital](https://www.publishersweekly.com/pw/by-topic/digital/content-and-e-books/article/53801-taking-storytelling-digital.html)
* [Russell Quinn the world's most wired storyteller](https://www.wired.com/2012/07/russell-quinn-the-worlds-most-wired-storyteller/)
* [Will 'The Silent History' change the way we read?](http://content.usatoday.com/communities/popcandy/post/2012/09/will-the-silent-history-change-the-way-we-read/1#.W-XBpXpKj66)
* ['The Silent History' turns up the noise on a new kind of e-book](http://articles.latimes.com/2012/oct/05/news/la-jc-silent-history-20121006)
