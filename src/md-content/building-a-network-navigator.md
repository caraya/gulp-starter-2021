# Building a Network Navigator

<div class="message info">
<h3>Note</h3>
<p>This is a thought piece rather than an applied coding exercise. Don't expect much code in this post.</p>
<p>As I learn more about the technologies and whether it's feasible to implement the type of agent I want I may start coding bits and pieces of it in the future</p>
</div>


In 1987 Apple released this concept video of what they called a Network Navigator, an integrated agent to manage data from different sources, communicate with people across the network, and share information regardless of the source and its location.

<div class="video">
<iframe width="560" height="315" src="https://www.youtube.com/embed/9bjve67p33E" frameborder="0" allow="autoplay; picture-in-picture" allowfullscreen></iframe>
</div>

It may seem quaint to us now, 30 years later but the real question is whether the tools have evolved to the point where it is possible to build such a technology.

This post will explore some of the current technologies that would make such a project feasible and discuss potential future implementations.

## Voice Enabled

Three things that were impossible to predict in '87 are how powerful mobile phones would become, how much would agents become a common day occurence and the growth of home automation with tools like Alexa Home or Google Nest.

Tools like Google Assistant, Apple Siri, and Amazon Alexa have created large markets for voice enabled applications so, in theory, it should be possible to do one of three things:

* Use default tools from the agent
* Load existing actions for what we need
* Build custom actions when actions are not available or they will not do what we need

For example, Google assistant can already do voice searches in Wikipedia and Gooogle search so we have a first layer of research tools available.

We can also leverage existing voice interfaces from universities or commercial research databases.

If there are no existing actions we can develop our own actions to interact with data sources and libraries. We may also want to consolidate all searches into a single command.

## Search for information

Today I can tell Google Assistant to `search wikipedia for bionics` and it will display the results from Wikipedia for the requested term. How difficult would it be to trigger the same search on multiple sites/engines from the same command?

Machine Learning could help us to provide a context sensitive search interface where results are more closely aligned with the meaning of our search.

## Managing Documents

Another area where we might want to use Assistant is as input For Google Docs and other applications part of GSuite. Normally I wouldn't go with just one provider but as far as I know, Google Docs, Slides, and Sheets are the only set that is scriptable with Javascript. This would allow us to create documents programmatically from an agent so that users have to tweak and finish them.

## Text to Speech

Most browsers now have text-to-speech capabilities and so do agents. It shouldn't be too much of a stretch to use the agent's built-in speech capabilities or piggyback on the [Web Speech API](https://wicg.github.io/speech-api/) to provide a more generic solution that has the browser or agent read the page to us without us having to "make" an agent to do it.

## Communication

WebRTC provides both audiovisual and data channel point to point and multicasting communication.

Agents could leverage the low-level APIs or they could piggyback into existing tools like Google Meet or similar tools that allow communication and data exchange.

