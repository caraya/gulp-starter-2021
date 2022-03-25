# The New Knowledge Navigator

In the early to mid 1980's Apple released the video below as a demo for future connected devices. The "knowledge navigator" was a device that could be used to navigate the world's knowledge and interact with all your devices.

<div class="video">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/umJsITGzXd0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

I thought it was cute but until newer technologies like digital assistants (Alexa, Google Assistant, etc) came along, it wasn't really feasible to create such a tool.

While it may still not be possible to create an agent as effective as the navigator show in the video, we may be able to duplicate some of its functionality.

Some of the areas that I want to take a deeper look at are:

* Assistants like [Siri](https://www.apple.com/siri/), [Alexa](https://developer.amazon.com/en-US/alexa/alexa-skills-kit), or [Google Assistant](https://developers.google.com/assistant) to see if it's possible to use them as the base for the project
* Speech synthesis using technologies like [WaveNet](https://arxiv.org/pdf/1609.03499.pdf), if it is possible to do so or speech to text technologies
* Creating a backend for the assistant to work from

## Working with a digital assistant

Unless you're working on an Android application, you will have to build actions for the assistant to perform, rather than have to build a dedicated application, although an application may be the best solution in the long run.

An example of how to build actions for Google Assistant is shown in [Actions SDK and Builder quick start guide](https://developers.google.com/assistant/conversational/quickstart).

## Creating a backend for the navigator

In [Enhance your web presence for Search and Assistant](https://developers.google.com/assistant/content/) where you can create a custom web experience for Google Assistant based on your web content marked up with [structured data](https://developers.google.com/structured-data/).
