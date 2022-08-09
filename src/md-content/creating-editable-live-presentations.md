# Creating editable live code presentations

I'm starting to look at creating web-based presentations again and in look at the alternatives, my two favorite presentation engines/frameworks are [Reveal.js](https://revealjs.com/) and [Inspire.js](https://inspirejs.org/).

Both frameworks have the things I consider as minimal requirements for web-based presentations:

* Speaker/presenter notes to provide additional information
* Markdown support for authoring content
* Syntax highlighting for code examples
* Incremental display of content

One thing that Inspire.js does is provide a way to do live coding in a slide using [Prism Live](https://live.prismjs.com/).

Having the ability to do live coding is awesome but it only works during a live presentation or when viewing a recording of the presentation. It wouldn't work if you were just looking at the slides; you would have to either remove the code or give a finished version of the code.

Lea Verou, the creator of Inspire and Prism Live provides an alternative: [Rety](https://rety.verou.me/).

Rety provides a way to record the steps a presenter takes when live coding and then replay those steps on demand.

The idea is as follows:

1. We use Rety via a bookmarklet, following the instructions in [How do I record a demo from an arbitrary page, e.g. a live coded slide?](https://rety.verou.me/#how-do-i-record-a-demo-from-an-arbitrary-page-eg-a-live-coded-slide)
2. Save the generated list of actions and include it in the presentation HTML document using a `script` tag with the following attributes:
   1. `type="application/json"`
   2. `class="demo-script"`

<figure>
  <img src='https://res.cloudinary.com/dfh6ihzvj/images/v1659595605/publishing-project.rivendellweb.net/inspirejs-live-code-interface-1/inspirejs-live-code-interface-1.png?_i=AA' alt='detail of Inspire.js live coding screen. The code is on the left and the live result is on the right' width='1800'>
  <figcaption>Detail of Inspire.js live coding screen. The code is on the left and the live result is on the right</figcaption>
</figure>

Once the script has been added to the slide where you want the replay to happen, there will be additional buttons on the live section of the page that will allow you to play back the content you recorded.

<figure>
  <img src='https://res.cloudinary.com/dfh6ihzvj/images/v1659595288/publishing-project.rivendellweb.net/inspirejs-rety-playback-button/inspirejs-rety-playback-button.png?_i=AA' alt='The play button is added when we use Rety to playback pre-recorded live demos' width='1052'>
  <figcaption>The play button (highlighted in a red rectangle) is added when we use Rety to playback pre-recorded live demos</figcaption>
</figure>

This has two main benefits. It saves you from making typos during the live presentation and it allows people viewing the deck after the conference to step through the video just like the presenter did.

**A final note:**

Be mindful about how you add the text to replay.

Rety will play back exactly what you tell it to, so if you copy a large block of text into the editor, it'll appear all at once when people replay the demo. This can be confusing for people who were not pressent during the original presentation.

If at all possible, type the code as you would if you were coding infront of an audience.
