# The latest Javascript controversy and how I'm trying to understand it

There is a proposal on TC39's Github Repo for `array.flatten` and `array.flattenMap` and a [pull request](https://github.com/tc39/proposal-flatMap/pull/56) to rename it to Smoosh because [MooTools](https://mootools.net) implemented the feature in incompatible ways by extending `array.Prototype`. While there is an [issue open](https://github.com/mootools/mootools-core/issues/2797) in the MooTools repository to change the signature to match the proposal but it'll never fully solve the issue; there are a lot of sites that will break if MooTools change its implementation and several of those sites are no longer maintained.

It is not the first time that MooTools conflicts with the ES6. In 2012 MooTool implementation of `array.contains` [different than the ES6 version](https://github.com/mootools/mootools-core/issues/2402)

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">This. Deflate. Smooth. Collapse. Squash. If an english-as-a-second-language person like myself can come up with a word that isn’t “smoosh”, imagine what all you smart pickles could do if you actually tried for a hot minute. <a href="https://t.co/musgi0sHO9">https://t.co/musgi0sHO9</a></p>&mdash; Monica Dinculescu (@notwaldorf) <a href="https://twitter.com/notwaldorf/status/971594438068772864?ref_src=twsrc%5Etfw">March 8, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">There can be reasonable rational debate on the degree of breakage we should accept, but this needs hard data.  There is no reasonable debate possible for whether ANY breakage is acceptable.  Our attempt to codify this in chromium: <a href="https://t.co/pm3YF2LzBu">https://t.co/pm3YF2LzBu</a>.</p>&mdash; Rick Byers (@RickByers) <a href="https://twitter.com/RickByers/status/971609099124146177?ref_src=twsrc%5Etfw">March 8, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">I guess we can&#39;t use .smoosh or .smooshMap. 🤷‍♂️<br><br>You can either listen to the people you represent, or you can ignore them and face this perpetual backlash. Your users are developers, developers and those use the languages are whom make the web and no one else. <a href="https://t.co/HNrVzFbFf8">pic.twitter.com/HNrVzFbFf8</a></p>&mdash; Sean Thomas Larkin (@TheLarkInn) <a href="https://twitter.com/TheLarkInn/status/971574506694168576?ref_src=twsrc%5Etfw">March 8, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">I started with TC39 just over a year ago. The first day that I went, I was completely terrified. I had been told that the committee was aggressive, could be hostile, and has no understanding of the needs of regular devs.</p>&mdash; Maggie Pint (@maggiepint) <a href="https://twitter.com/maggiepint/status/971801704801886209?ref_src=twsrc%5Etfw">March 8, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
