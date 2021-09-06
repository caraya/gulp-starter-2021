# Dropcaps in CSS

Dropcaps have always been a pain in terms of implementation and cross browser support. Perhaps you've seen somehting like this in CSS style sheets bebfore:

```css
p::first-letter {
  color: #FE742F;
  float: left;
  font-size: 5em;
  margin: 0 .2em 0 0;
}
```

This will create a 5em first letter for paragraph elements. Which is good if you only have one paragraph worth of text but, as [this codepen](https://codepen.io/caraya/pen/WaGyqN) illustrates, longer text gets more drop caps than intended.

There is a pseudo-selector that will help with this. `first-of-type` selects the first child of the chosent type inside its parent. So, for our drop cap example, we can say that we want the first-of-type paragrah and then the first letter of that element.

The result works as intended, like[version 2 of the codepen](https://codepen.io/caraya/pen/jeMKgb)

```css
p:first-of-type::first-letter {
  color: #FE742F;
  float: left;
  font-size: 5em;
  margin: 0 .2em 0 0;
}
```

It would be nice to have something in CSS that would let us just use drop caps. There sorta is one... the `::first-letter` select the first letter of the content of the parent element and make it as tall as the specified numbers of rows of text.

[Version 3](https://codepen.io/caraya/pen/PyGBwv) of the code shows how the code looks like.

```css
p::first-letter {
    -webkit-initial-letter: 4;
    initial-letter: 4;
    color: #FE742F;
    font-weight: bold;
    margin-right: 0.5em;
}
```

It only works in Safari (MacOS and iOS) so we need to make sure to wrap it in a feature query to ensure that browsers that don't support the feature don't behave all weird on us.

So we wrap the `initial-letter` call with a `@support` feature query that will only run if the browser supports either the unprefixed propery or the property with a webkit vendor prefix.

If the browser doesn't support it, then we fall back to the old way to doing drop caps.

```css
@supports (initial-letter: 4)
       or (-webkit-initial-letter: 4) {
  p::first-letter {
     -webkit-initial-letter: 4;
     initial-letter: 4;
     color: #FE742F;
     font-weight: bold;
     margin-right: 0.5em;
  }
}

p::first-letter {
  color: #FE742F;
  float: left;
  font-size: 5em;
  font-weight: bold;
  margin: 0 .5em 0 0;
}
```

The code from example three adds dropcaps to all paragraphs. So we need our old friend `:first-of-type` to make sure that only the first paragraph gets the drop cap.

The [final version](https://codepen.io/caraya/pen/NORBJd) of the Codepen shows the code similar to the one below, where we wrap the feature in a feature query and the original code in case the feature is not supported.

```css
@supports (initial-letter: 4)
       or (-webkit-initial-letter: 4) {
  p:first-of-type::first-letter {
     -webkit-initial-letter: 4;
     initial-letter: 4;
     color: #FE742F;
     font-weight: bold;
     margin-right: 0.5em;
  }
}

p:first-of-type::first-letter {
  color: #FE742F;
  float: left;
  font-size: 5em;
  margin: 0 .2em 0 0;
}
