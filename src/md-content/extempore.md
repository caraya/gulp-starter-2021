# Live Coding: Extempore and FoxDot

> Live coding (sometimes referred to as 'on-the-fly programming', 'just in time programming' and 'conversational programming') is a performing arts form and a creativity technique centred upon the writing of source code and the use of interactive programming in an improvised way.
>
> From [Wikipedia](https://en.wikipedia.org/wiki/Live_coding)

I find the concept of live coding music intriguing, not just because it uses code to generate music, but because it moves the authoring to a live environment where the music happens in real time... warts and all.

The first time I heard live coded music was in this video from OSCON that showed the potential of a live coding application called Extempore.

<div class="video">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/yY1FSsUV-8c" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Extempore is a great product but it is based on Scheme and its own xtlang. If you know Scheme you're ready to start, otherwise the learning curve is rather steep.

The more technical explanation:

>These two goals &mdash; dynamic flexibility and close-to-the-metal control &mdash; seem at odds. Extempore tries to offer both by supporting both a high-level dynamic language (Scheme) and a low-level ‘C like’ language (xtlang) simultaneously, with tight integration and transparency between the two. A running Extempore process will compile both valid scheme and xtlang forms. Scheme objects (lists, closures, continuations, etc.) coexist with the xtlang types and pointers to them to allocated memory, and with a few ‘helper functions’ data can even flow naturally between both languages.
>
> From: [Extempore Philosophy](https://extemporelang.github.io/docs/overview/philosophy/)

I like Scheme (and Lisp) and xtlang but I haven't learned it well enough to be comfortable doing live coding with it. SO now that I know about live coding and I know there is a tool in Scheme to live code, let's move on to searching for somethingg that is, to me, easier to use.

## Supercollider And FoxDot

Supercollider and FoxDot work together to do live coding. FoxDot is a library written in Python that does the live coding creation part; it connects to Supercollider, a separate DSP software that actually creates the sound. If you're so inclined you can use Supercollider on its own for your live coding exercises, I chose not to.

To be fair, the video below shows an example of live coded music using Super Collider. See the code on screen during the video... it's interesting but it looks way more complex than I'm interested in.

<div class="video">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/Xh0mXrPRuqw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

FoxDot, on the other hand, uses Python (2 or 3) ans the basis for the language it uses.

<div class="video">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/XRNFBZlBeuI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Links and Resources

* Live Coding
  * [Toplap](https://toplap.org/)
  * [All things live coding](https://github.com/toplap/awesome-livecoding/)
* SuperCollider
  * https://theseanco.github.io/howto_co34pt_liveCode/
* FoxDot
  * http://foxdot.org/
  * http://foxdot.org/installation/
  * http://foxdot.org/forum/topic/f-a-q/
* Extempore
  * https://digego.github.io/extempore/
  * https://extemporelang.github.io/
