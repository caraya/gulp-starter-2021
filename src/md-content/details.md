# Quick Note: Using details to create no-script accordions

**_Hat Tip to : [CSS Tricks](https://css-tricks.com/quick-reminder-that-details-summary-is-the-easiest-way-ever-to-make-an-accordion/)._**

An accordion is a UX element to group related items like Frequently asked questions. Most libraries give you a way to create accordions. But there is an easier way to accomplish the same goal, use the `details` and `summary` elements.

The [details](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details) element creates a disclosure widget where information is visible only in its "open" state. A summary or label can be provided using the `<summary>` element.

The companion [summary](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/summary) element specifies a summary, caption, or legend for a `<details>` element's disclosure box. Clicking the `<summary>` element toggles the state of the parent `<details>` element open and closed.

You also get keybaord navigation for free. Thanks to HTML!

The following HTML...

```html
<h2>Frequently Asked Questions</h2>

<details>
  <summary>What is the population of New Orleans?</summary>
<p>Every year, I took a holiday. I went to Florence, this cafe
on the banks of the Arno. Every fine evening, I would sit there
and order a Fernet Branca. I had this fantasy, that I would look
across the tables and I would see you there with a wife maybe a
couple of kids. You wouldn't say anything to me, nor me to you.
But we would both know that you've made it, that you were happy.
I never wanted you to come back to Gotham. I always knew there
was nothing here for you except pain and tragedy and I wanted
something more for you than that. I still do.</p>
</details>
```

And this CSS code:

```css
@import url('https://fonts.googleapis.com/css?family=Raleway:400,400i,700|Roboto:700');

details {
  margin: 1rem;
}
summary {
  font-family: 'Roboto', sans-serif;
}

p {
  text-indent: 1em;
  font-family: 'Raleway', sans-serif;
}

h2 {
  font-family: 'Roboto', sans-serif;
  font-size: 2.5em;
  font-weight: bold;
}
```

Produce the following page (shown as a Codepen Pen):

<p data-height="326" data-theme-id="dark" data-slug-hash="WzYmGO" data-default-tab="html,result" data-user="caraya" data-embed-version="2" data-pen-title="Deatils Accordion" data-editable="true" class="codepen">See the Pen <a href="https://codepen.io/caraya/pen/WzYmGO/">Deatils Accordion</a> by Carlos Araya (<a href="https://codepen.io/caraya">@caraya</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
