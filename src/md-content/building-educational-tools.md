# Looking at building educational tools

My background is in instructional design and technology. Every so often I talk to old classmates and the topic always gets around to technology and how much it sucks from their perspective. I mean, yes, we can do large scale courses online but it's far from optimal... the difference of opinion comes as to best implement these technologies in ways that students will want to use them.

The post will discuss some low level infrastructure and learning tools that we can build with them.

**_Some of these ideas may be rough and not fully fleshed out._**

## Chat, Collaboration and Video Conferencing

Most modern multiuser audio and video systems use [WebRTC](https://webrtc.org/) as the backbone for the system. The technologies are open source and quite powerful but, depending on the use case, they can be quite complex to set up.

See the [WebRTC APIs](https://webrtc.org/getting-started/overview) codelab from Google for a good overview to the technologies involved.

### Basic Audio and Video Communication

<figure>
  <img src="https://res.cloudinary.com/dfh6ihzvj/images/v1628728912/publishing-project.rivendellweb.net/webrtc-1/webrtc-1.png?_i=AA" alt="Basic WebRTC communication flow">
  <figcaption>Basic WebRTC communication flow. Taken from <a href="https://webrtc.ventures/2018/07/tutorial-build-video-conference-application-webrtc-2/">How to Build a Video Conference Application with WebRTC</a></figcaption>
</figure>

At the most basic level, the process for enabling communication on WebRTC is a three step flow:

1. The browser gets access to the media devices (camera and microphone0)
2. Each peer exchanges information about itself with all other peers through a signaling process
3. After signaling, peers can connect directly and the communication begins

To make all these possible we need the following elements:

* A WebCamera and microphone for each participant
* A [signaling server](https://webrtc.ventures/2018/07/tutorial-build-video-conference-application-webrtc-2/) for information exchange between peers
* A pair of [STUN](https://en.wikipedia.org/wiki/STUN) / [TURN](https://en.wikipedia.org/wiki/Traversal_Using_Relays_around_NAT) servers are required for [NAT](https://en.wikipedia.org/wiki/Network_address_translation) traversal and to relay media if direct communication is not possible

See [Signaling and video calling](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Signaling_and_video_calling) for more information on creating a WebRTC application and 

This will take care of the basic multi-user communication flow, it doesn't deal with sharing data or side-channel communication.

### The data channel

### Some existing tools

Some examples of WebRTC frameworks:

* [Pion](https://github.com/pion/webrtc)
* [Media Soup](https://github.com/versatica/mediasoup/)
* [Jitsi](https://github.com/jitsi/jitsi)

## Google Docs-like experience

* Pre-packaged solutions
  * Etherpad
    * [Website](https://etherpad.org/)
    * [Etherpad Lite Github Repo](https://github.com/ether/etherpad-lite)
* Build from scratch
  * [WebSockets - A Conceptual Deep Dive](https://ably.com/topic/websockets)
  * References
    * [The WebSocket API](http://dev.w3.org/html5/websockets/)
    * [The WebSocket Protocol](http://tools.ietf.org/html/draft-ietf-hybi-thewebsocketprotocol-03)
    * [WebSockets - MDN](https://developer.mozilla.org/en/WebSockets)
  * Older links I still found useful as conceptrual models
    * [Real-time Collaborative Editing with Web Sockets, Node.js & Redis](https://www.laktek.com/2010/05/25/real-time-collaborative-editing-with-websockets-node-js-redis/)
    * [Introducing WebSockets: Bringing Sockets to the Web](https://www.html5rocks.com/en/tutorials/websockets/basics/)
  * (Older) Examples
    * [Plink](http://labs.dinahmoe.com/plink/)
    * [Paint With Me](http://paintwith.me/)
    * [Pixelatr](http://connorhd.co.uk/project/pixelatr/)
    * [Dashed](http://www.dashed.com/)
    * [Massively multiplayer online crossword](http://scrabb.ly/)
    * [Ping server](http://www.websockets.org/echo.html)

## Using Google Maps For Learning Games

## Technical issues

### Authentication

### Data Collection, Retention and Security
