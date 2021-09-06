# CSS Selectors: :has()

<div class="message warning">
<p>Although the feature is specified in Selectors Level 4 currently no browser has implemented it due to concerns about its performance with complex selectors.</p>
</div>

Another interesting selector is `:has`. This is part of the selectors level 4 specification but has yet to be implemented in any browser.

Igalia is doing work this pseudo class in Blink. It's explained in their [Explainer](https://github.com/Igalia/explainers/tree/main/css/has).

I'm documenting it here to keep track of it. Once it lands it'll be very cool to have and use.

The idea is that the selector will match only if any of the children in the parameter list matches. This means that we're selecting the parent based on the children's value:  

<dl>
  <dt>figure:has(> img)</dt>
  <dd>Matches only &lt;figure> elements that contain an &lt;img> child</dd>
  <dd>If we use figures for different purposes, images, code listing, named list or tables, we can style each type differently</dd>

  <dt>dt:has(+ dt)</dt>
  <dd>Matches a &lt;dt> element immediately followed by another &lt;dt> element</dd>
  <dd>We can style &lt;dt> elements differently if they are the last one on the list
</dl>
