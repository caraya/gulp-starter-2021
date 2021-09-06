# Against CSS in JS

The debate rears its ugly head again. Should we use Javascript to do Javascript behaviors, HTML structure and CSS presentation. In essence the idea is that Javascript is better than HTML to create presentation (and we can create HTML content programmatically) and we can create styles with Javascript, better than we can with CSS, a language purpose designed to do so.

All these posts and discussion made me think a lot about CSS, the web and technology in general. There are three areas where I'm particularly concerned:

- Do we really need CSS in JS?
- What problem are we trying to solve?
- Are we creating an unnecessary divide?
- Long-term Considerations
- Framework / Library lock-in
- Further considerations

## Do we really need CSS-In-JS?

There's been a lot of talk in the CSS-In-JS movement, including the resurfacing of some older pieces. Some of the older pieces include this tweet by Henrik Joreteg:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Some folks want a unified language of the web instead of CSS, HTML, and JS.<br><br>It&#39;s increasingly looking like JS will just eat the other two.</p>&mdash; Henrik Joreteg (@HenrikJoreteg) <a href="https://twitter.com/HenrikJoreteg/status/603959629425483776">May 28, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

In reading the tweet and the responses it seems that there are two camps: those people who, like Henrik, think that CSS-in JS is the solution to the web because it works well in React and other frameworks, and those people who disagree with that position and either think that CSS and Javascript should remain separate or that there are techniques for making things better.

## What problem are we trying to solve?

https://speakerdeck.com/vjeux/react-css-in-js

[Is front-end development having an identity crisis?](https://dev.to/assaultoustudios/is-front-end-development-having-an-identitycrisis-2224)

### It is not a new technology

Trying to write CSS in Javascript is not a new idea. Back in 1996 Netscape submitted an initial version of their [JSS stylesheet ](https://www.w3.org/Submission/1996/1/WD-jsss-960822) project to the W3C. It was rejected.

## Are we creating an unnecessary divide?

[The Great Divide](https://css-tricks.com/the-great-divide/)

[Is there any value in people who cannot write JavaScript?](https://medium.com/@mandy.michael/is-there-any-value-in-people-who-cannot-write-javascript-d0a66b16de06)

[HTML, CSS and our vanishing industry entry points](https://rachelandrew.co.uk/archives/2019/01/30/html-css-and-our-vanishing-industry-entry-points/)

[The “Backendification” of Frontend Development](https://hackernoon.com/the-backendification-of-frontend-development-62f218a773d4)

## Long term viability?

A post by Keith Grant: [Against CSS in JS](http://keithjgrant.com/posts/2015/05/against-css-in-js/)

### Framework / Library lock in?

## Further Considerations

### CSS and JS working together

They have also made me double down a post I wrote in 2017: [CSS and JavaScript Working together](https://publishing-project.rivendellweb.net/css-and-javascript-working-together/) where I outlined how the CSS Object Model specification from the Houdini task force would make using both CSS and JavaScript easy to work together, with a bigger emphasis on JavaScript than CSS. I wrote it that way because I've never seen the need to separate the technologies.

### The web doesn't always revolve around components

https://hackernoon.com/all-you-need-to-know-about-css-in-js-984a72d48ebc


### Comnstructable Stylesheets As A Possible Solution?

[Constructable Stylesheets: seamless reusable styles](https://developers.google.com/web/updates/2019/02/constructable-stylesheets)

