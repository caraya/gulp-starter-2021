# Links can look and work better, can they?

## In the beginning: CSS and CSS 2

Links have been on the web since the beginning as a representation of a connection to another document. In the beginning you could only change the color of the link itself and its underline. By default, text links are blue and underlined. This underlining strikes through descenders - letters that dip below the baseline, such as a lowercase j – making some links more difficult to read. 

with CSS level 2 we got the `text-decoration` keyword that allowed to change the way underlines in links and other elements looked like. With it you could do something like this to create lines above and below a matching element:

```css
.over {
  text-decoration: overline;
}

.regular {
  text-decoration: underline;
}
```

This was good but limited. The values available were:

* none to remove any underline
* underline
* overline to create a line above the content
* line-through to strike through the text
* blink
* inherit from the parent element

you could change the color of the link (and the text) using the color keyword and the position of the link using text-decoration but that was the extent of it. The underline would still run through the descenders of letters and number 

## CSS 3
CSS has nove developed an entire module dedicated to text decorations. [CSS Text Decoration Module Level 3](https://www.w3.org/TR/css-text-decor-3/) has been sitting at the candidate recommendation stage for almost 4 years yet it provides very interesting properties concerning underlines and other text decorations. We will only concentrate on the decorations part of the spec. 


### text-decoration-color

This rule defines the color of the underline. It can be any of the CSS color formats: color names, hexadecimal, rgb, rgba, hsl or the transparent  and currentColor keywords. The example below shows some possibilities for the text-decoration-color keyword. 

```css
.demo {
  /* <color> values */
  text-decoration-color: currentColor;
  text-decoration-color: red;
  text-decoration-color: #00ff00;
  text-decoration-color: rgba(255, 128, 128, 0.5);
  text-decoration-color: transparent;
}
```

### text-decoration-line

This rule defines the type of line that will be used with text decoration. It is the successor of the CSS 2 property with a different name. The rule also allows two or more selectors but be careful not to go overboard like the last example of the CSS block below shows.

```css
.demo2 {
  /* Possible text-decoration-line values */
  text-decoration-line: none;
  text-decoration-line: underline;
  text-decoration-line: overline;
  text-decoration-line: line-through;
  text-decoration-line: blink;
   /* Two decoration lines */
  text-decoration-line: underline overline;               
  /* Multiple decoration lines */
  text-decoration-line: overline underline line-through;   
}
```

The table below explains the different values for the text-decoration-line keyword.

<table summary="Explanation of different values for the text-decoration-line css keyword">
  <caption>Explanation of the values for text-decoration-style</caption>
  <thead>
    <tr>
      <th>Value</th>
      <th>Description</th>
    <tr>
  </thead>
  <tbody>
    <tr>
      <td>underline</td>
      <td>Each line of text is underlined.</td> 
    </tr>
    <tr>
      <td>overline</td>
      <td>Each line of text has a line above it.</td>
    </tr>
    <tr>
      <td>line-through</td>
      <td>Each line of text has a line through the middle.</td>
    </tr>
    <tr>
      <td>blink</td>
      <td>The text blinks (alternates between visible and invisible). This value is deprecated in favor of Animations.</td> 
    </tr>
  </tbody>
</table>

### text-decoration-style 

The `text-decoration-style` keyword defines what type of underline we use. 

```css
.demo3 {
  /* Possible text-decoration-style values */
  text-decoration-style: solid;
  text-decoration-style: double;
  text-decoration-style: dotted;
  text-decoration-style: dashed;
  text-decoration-style: wavy;
}
```



<table summary="definition of the values for text-decoration-style" >
  <caption>Definition of the values for text-decoration-style</caption>
  <thead>
    <tr>
      <th>Keyword</th>
      <th>Description</th>
    <tr>
  </thead>
  <tbody>
    <tr>
      <td>solid</td>
      <td>Draws a single line</td>
    </tr>
    <tr>
      <td>double</td>
      <td>Draws a double line</td>
    </tr>
    <tr>
      <td>dotted</td>
      <td>Draws a dotted line</td>
    </tr>
    <tr>
      <td>dashed</td>
      <td>Draws a dashed line</td>
    </tr>
    <tr>
      <td>wavy</td>
      <td>Draws a wavy line</td>
    </tr>
  </tbody>
</table>

### text-decoration
  
text-decoration is a shorthand for text-decoration-color, text-decoration-line, and text-decoration-style CSS properties. Like for any other shorthand property, it means that it resets their value to their default if not explicitly set in the shorthand.

### text-decoration-skip

The text-decoration-skip CSS property specifies what parts of the element’s content any text decoration affecting the element must skip over. It controls all text decoration lines drawn by the element and also any text decoration lines drawn by its ancestors.

```css
.demo4 {
/* Possible values for text-decoration-skip */
text-decoration-skip: none;
text-decoration-skip: objects;
text-decoration-skip: spaces;
text-decoration-skip: ink;
text-decoration-skip: edges;
text-decoration-skip: box-decoration;

/* We can also combine values */
text-decoration-skip: ink spaces;
text-decoration-skip: ink edges box-decoration;
}
```

<table summary="Description of the values for text-decoration-skip">
  <thead>
    <tr>
      <th>Value</th>
      <th>Description</th>
    <tr>
  </thead>
  <tbody>
    <tr>
      <td>none</td>
      <td>
        <p>Nothing is skipped, i.e. text decoration is drawn for all text content and across atomic inline-level boxes.</p>
      </td>
    </tr>
    <tr>
      <td>objects</td>
      <td>
        <p>The entire margin box of the element is skipped if it is an atomic inline such as an image or inline-block.</p>
      </td>
    </tr>
    <tr>
      <td>spaces</td>
      <td>
        <p>All spacing is skipped, i.e. all Unicode white space characters and all word separators, plus any adjacent letter-spacing or word-spacing.</p>
      </td>
    </tr>
    <tr>
      <td>ink</td>
      <td>
        <p>The text decoration is only drawn where it does not touch or closely approach a glyph. I.e. it is interrupted where it would otherwise cross over a glyph.</p>      
        <p><img src="https://mdn.mozillademos.org/files/13464/decoration-skip-ink.png" alt="example of decoration-skipink">  
      </td>
    </tr>
    <tr>
      <td>edges</td>
      <td>
        <p>The start and end of the text decoration is placed slightly inward (e.g. by half of the line thickness) from the content edge of the decorating box. E.g. two underlined elements side-by-side do not appear to have a single underline. (This is important in Chinese, where underlining is a form of punctuation).</p>
        <p><img src="https://mdn.mozillademos.org/files/13466/decoration-skip-edges.png" alt="example of decoration-skip-edges"></p>
      </td>
    </tr>
    <tr>
      <td>box-decoration</td>
      <td>
        <p>The text decoration is skipped over the box's margin, border and padding areas. This only has an effect on decorations imposed by an ancestor; a decorating box never draws over its own box decoration.</p>
      </td>
    </tr>

  </tbody>
</table>

## Support and managing multiple browsers

Support for the level 3 text decoration properties is not even. The specification has been sitting at candidate recommendation stage for almost 4 years and only now different browsers have come out with implementations. 

How do we handle working with multiple browsers? We use the cascade and rely on the fact that browsers will not work with rules they don't understand. For example we can do something like this:

```css
a {
  /* CSS 1 */
  color: blue;
  /* CSS 2 */
  text-decoration: underline;
  /* CSS 3 */
  text-decoration: underline navy solid;   
}
```

* Browsers who only support CSS 1 will change the color to blue. 
* Browsers that support CSS 2 will ignore the first rule and apply the second one and use underine as the text decoration
* Browsers that support the CSS level 3 specification will use the last rule where it controls the decoration colory and style in one declaration


## Further ideas

There are other features that we can use to further refine links. 

If you're working with languages other than English you can use [text-underline-position](https://developer.mozilla.org/en-US/docs/Web/CSS/text-underline-position) to control where the underline will appear on the text. 


