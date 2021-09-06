# Thought on digital books: A reply to Wendy Reid

I'm doing this post to reply to a [series of tweets](https://twitter.com/wendy_a_reid/status/1204922559894097926) from Wendy Reid, chair of the W3C Publishing WG, presenting questions about the future of digital publishing.

Rather than reply via tweets, I've consolidated my thoughts here and broken them down according to the tween in the stream that I think they address.

**[[Comment on tweet 1]]**

I think you should start asking why is epub the predominant format outside Amazon and Apple and why there's no desire for even exploring another format and its implications.

We already use (X)HTML in epub so why are we so afraid that we'll loose discoverability or, heaven forbid, the ability to encrypt our books?

The work that Web Publications did is awesome as a starting point but it's only the beginning... but it needs to be more web than epub and that might be the issue.

**[[Comment on tweet 3]]**

From an outside perspective, to both the WG and the W3C overall I've always questioned the real purpose of the merger.

Yes, epub uses HTML, SVG, Javascript, CSS and other technologies but it uses them in ways that make the technologies epub only, either by restricting what you can do or adding them to the manifest. This has always made it harder to work with epub as a unit.

The root cause is that epub is predicated on isolated file system based individual containers, the zipped book. This imposes limitations to the way JavaScript rendering engines can work with scripts.

These restrictions are not applicable to content that will run inside a browser. Existing (Service Workers) and upcoming (web packaging) specifications help solve the offline and download portions of books-as-web-content.

I'm sure there's a lot more to research to be done if there is interest, including possible ways to provide backwards compatibility.

**[[Comment on Tweet 4]]**

I have the same questions about web publications and its support or lack of support. Web Publications tried to be epub without being epub and without really being web because it was too much epub.

What would people see as a compromise?

**[[Comment on Tweet 8]]**

While I agree that specifications like epub should go through the full W3C specification cycle we should also understand the importance (or lack thereof) of ratification as a W3C recommendation and what the consequences are of such adoption.

Considering the different levels of support among readers I think it would be hard to spec the different levels of conformance in a way that makes sense to both reader implementors and content publishers. I don't know if W3C recommendations have optional sections beyond the wording of [RFC 2119](https://tools.ietf.org/html/rfc2119) and how enforceable the SHOULD and SHOULD NOT sections of a specification are when they describe processes and not algorithms.

**[[Comment on Tweet 9]]**

If the community does those things incredibly well then what's the danger in bringing outside experts to validate the work the community has done? I would love to see more of what are the perceived problems with backwards compatibility and whether it's worth to keep that compatibility moving forward.

I understand the need to keep backwards compatibility but epub already broke that promise when they moved from epub2 to epub3. Sure, you can read an epub2 book in an ipad but, as far as in understand it, that's the extent of compatibility.

I want the full compatibility of the web where my current Chrome can do 99% of the things I coded on a web page in 1995.

**[[Comment on Tweet 10]]**

Does the epub community overall know how to give this type of feedback? Would they? Would the feedback mean the same to all members of the community given that epub readers range from eink readers to iBoooks and everything in between?

I think this is a deeper question. Who is the epub community and what are members expecting to get out of it?


**[[Comment on Tweet 11]]**

Opening the epub spec is one side of the coin. How to bring other people fully into the epub fold is the other.

I don't think that epub as it exists now is a good host to the basic tools of the web and the work that takes to make sure an engine works acrooss readers is staggering in its insanity (I respect Jimmy Pannoz and the work he's done... I could have never done it)

The necessity for the compatibility work is just like browsers were in the late 1990s to early 2000s. Either proprietary tools, tags and APIs or only partially implemented standards with little or no accountability for spec compliance.

So, to me, again it boils down to the container. Is the epub file the best delivery mechanism or can we leverge the larger web ecosystem to deliver content that matches both design views and readers needs?

**[[Comment on Tweet 12]]**

What would it take to fix the things that drive us mad and could we do it while keeping backwards compatibility? If we have to choose one or the other which one wins? why?

Yes, TAG would give awesome feedback for how to integrate to the web platform, assuming that it's what the community wants.

My concern in this area are:

* The level of technical expertise and committment to the extended feedback loop
* How ready are we to implement TAG architectural recommendations when/if they conflict with "they way we did things" before we became part of this large organization?

