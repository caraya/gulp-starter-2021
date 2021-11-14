# Revisiting D3

I like data visualization and I'm sad that I don't get to use it more often in my work.

I came to D3 when I was trying to create a data visualization of CSS properties as documented in the Web Platform Documentation project and shown in [this Codepen](https://codepen.io/caraya/full/bgxhz) and shown below:

<!-- <p class="codepen" data-height="689" data-theme-id="dark" data-default-tab="result" data-user="caraya" data-slug-hash="bgxhz" style="height: 689px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="CSS Hierarchy Demo - D3">
  <span>See the Pen <a href="https://codepen.io/caraya/pen/bgxhz">
  CSS Hierarchy Demo - D3</a> by Carlos Araya (<a href="https://codepen.io/caraya">@caraya</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script> -->

<p>&nbsp;</p>

I wrote the original visualization with D3 version 1 and upgraded it to work with version 3 and to take into account that the WPD project no longer exists.

D3 has changed in significant ways since I first looked at it and worked creating my visualization from an existing example.

This post will look at the latest version of D3, how it works and how to use it to create a visualization. I will re-create the same visualization I created in D3 1.0.
