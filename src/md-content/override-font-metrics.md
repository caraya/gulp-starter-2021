# Overriding Font Metrics with CSS

One of the things about web fonts that may be problematic is the care we need to take when choosing a fallback font. Unless we pick fonts with similar characteristics, there will be a layout shift that will negatively impact the LCS core web vitals metric.

CSS has a potential solution to this problem. In CSS we can use special override descriptors in the @font-face at-rule to specify the exact dimensions for the following attributes:

* [Ascenders](https://en.wikipedia.org/wiki/Ascender_(typography))
* [Descenders](https://en.wikipedia.org/wiki/Descender)
* line gap
* extra advance for horizontal character spacing

The example `@font-face` declaration below shows how these descriptors work. 

```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap');

@font-face {
  font-family: "Times New Roman";
  /* These values are based on Fair Play's table data */
  ascent-override: calc(138.496 / 128 * 100%);
  descent-override: calc(32.128 / 128 * 100%);
  line-gap-override: 0%;  
  advance-override: 0.049;
  src: local("Times New Roman");
}
```

For each of the new descriptors we provide a value we've calculated from the web font we're downloading so that the fallback font, Times New Roman, will use the same dimensions and reduce or eliminate layout shift because of font metric differences

## Proposed Descriptors

These are the descriptors implemented in Chrome and being discussed in the CSS working group

### **ascent-override, descent-override, line-gap-override**

* Syntax: `<percentage>` | `normal`
* Initial value: `normal`

These descriptors allow us to completely eliminate vertical layout shift.

Having these values enables browsers to match fallback font metrics to those of the web font they are replacing, reducing layout shift.

It is important to remember that **the values for these descriptors are used in the fallback local font but use the values from the web font being replaced**

### **advance-override**

* Syntax: `<number>`
* Initial value: 0

This descriptor allows us to reduce horizontal layout shift, and helps to reduce vertical layout shift caused by different line wrapping.

The descriptor sets an extra advance for each character using the font face. The amount of extra advance equals the descriptor value multiplied by the used font size.

## Some remaining questions

The values of these descriptors should be set according to the `head` and `hhea` table of the target web font.

Because of this, it's hard to use the overrides well. We need a way to pull this data from the web font file without having to code it ourselves, maybe with tools like [wakamaifondue](https://wakamaifondue.com/) or the browser's DevTools (Firefox does an awesome job with their DevTools font editor already).

I filed an [issue](https://github.com/Wakamai-Fondue/wakamai-fondue-site/issues/106) in the Wakamai Fondue Github repository asking for the application to provide these metrics for you.

## Links and References

* CSS Fonts Module Level 4
  * [Default font metrics overriding: the ascent-override, descent-override and line-gap-override descriptors](https://drafts.csswg.org/css-fonts-4/#font-metrics-override-desc)
* CSS Inline Layout Module Level 3
  * [Ascent and Descent Metrics](https://www.w3.org/TR/css-inline-3/#ascent-descent)
  * [Line Gap Metrics](https://www.w3.org/TR/css-inline-3/#font-line-gap)
* Chrome specifics
  * [Explainer](https://gist.github.com/xiaochengh/da1fa52648d6184fd8022d7134c168c1)
  * [New @font-face descriptors for overriding font metrics](https://docs.google.com/document/d/1PW-5ML5hOZw7GczOargelPo6_8Zkuk2DXtgfOtJ59Eo/edit#heading=h.gfb598lfv3wp)
