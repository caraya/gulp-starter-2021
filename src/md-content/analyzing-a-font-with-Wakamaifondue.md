# Analyzing a font with Wakamaifondue

When I wrote my article reviewing `font-variant-*` attributes I realized that I needed a way to see what OpenTypes features the font I'm using supports.

My goto tool is [Wakamaifondue](https://wakamaifondue.com/) to see what the font has to offer. The screen shots below use [Recursive](https://www.recursive.design/), my favorite variable font, run through Wakmaifondue.

If you've used Wakamaifondue before the screenshots may look a little different. These are from the beta version of the site. I chose it because the UI is better than the original.

The site will first ask you to "upload" a font. All the processing is donw on the browser so you can rest assured that the font is safe.

One Wakamaifondue processes the font, it will show you the information it gathered about it.

The top of the screen will give you information about the font, including the OpenType features it supports.

<figure>
  <img src='https://res.cloudinary.com/dfh6ihzvj/images/v1635547303/publishing-project.rivendellweb.net/new-wakamaifondue-01/new-wakamaifondue-01.png?_i=AA' alt='Top section of the Wakamaifondue website' width='800px'>
  <figcaption>Top section of the Wakamaifondue website</figcaption>
</figure>

As you scorll down you will see a tex box, a lit of OpenType features and a list of the variable fonts axes available to the font (if any).

The text box is editable so you can use your own text to test the features. The OpenType feature status buttons and the variable font axes are also editable so you can play with the font using your own test and see which available features and axes best suit your design needs.

<figure>
  <img src='https://res.cloudinary.com/dfh6ihzvj/images/v1635547323/publishing-project.rivendellweb.net/new-wakamaifondue-02/new-wakamaifondue-02.png?_i=AA' alt='Section of the Wakamaifondue site showing OpenType features and variable fonts axes' width='800px'>
  <figcaption>Section of the Wakamaifondue site showing OpenType features and variable fonts axes</figcaption>
</figure>

The final block I want to highlight shows another editable box, a list of the available axes, the range of values for each, and a list of all the predefined instances (combination of different axes values) that the font author created.

Clicking in an instance will automatically shift the axes to match the selected instance so you don't have to. Playing with the sliders will also shift the axes to match the values you select, allowing you to creaate your own custom instance.

<figure>
  <img src='https://res.cloudinary.com/dfh6ihzvj/images/v1635547303/publishing-project.rivendellweb.net/new-wakamaifondue-03/new-wakamaifondue-03.png?_i=AA' alt='Section provides an editable textbox, a list of variable font axes with sliders to change their values and a list of predefined instances' width='800px'>
  <figcaption>Section provides an editable textbox, a list of variable font axes with sliders to change their values and a list of predefined instances</figcaption>
</figure>

What I like the best about Wakamaifondue is that it provides you with a downloadable CSS stylesheet with all the information about the font and classes for each OpenType feature and predefined instance. This makes it easier to use the fonts in your designs while also allowing you to pick and choose which features you want to include on your existing CSS.
