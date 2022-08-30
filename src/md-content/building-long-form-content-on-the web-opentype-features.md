# Building long-form content on the web: OpenType features

OpenType fonts, both static and variable, make additional features available for developers to use.

CSS makes these features available via the `font-feature-settings` property.

Just like with font variations in variable fonts, we can use tools like [Wakamaifondue](https://wakamaifondue.com) to see what OpenType features are available (since they vary based on the font) and to download a stylesheet with all CSS necessary to use the features on your own project.

We first set custom properties for each of the available OpenType layout feature on the `:root` pseudo element. We set them disabled by default so we can enable them for specific elements and classes.

```css
:root {
  --recursive-aalt: "aalt" off;
  --recursive-afrc: "afrc" off;
  --recursive-case: "case" off;
  --recursive-dlig: "dlig" off;
  --recursive-dnom: "dnom" off;
  --recursive-frac: "frac" off;
  --recursive-numr: "numr" off;
  --recursive-ordn: "ordn" off;
  --recursive-pnum: "pnum" off;
  --recursive-sinf: "sinf" off;
  --recursive-ss01: "ss01" off;
  --recursive-ss02: "ss02" off;
  --recursive-ss03: "ss03" off;
  --recursive-ss04: "ss04" off;
  --recursive-ss05: "ss05" off;
  --recursive-ss06: "ss06" off;
  --recursive-ss07: "ss07" off;
  --recursive-ss08: "ss08" off;
  --recursive-ss09: "ss09" off;
  --recursive-ss10: "ss10" off;
  --recursive-ss11: "ss11" off;
  --recursive-ss12: "ss12" off;
  --recursive-ss20: "ss20" off;
  --recursive-sups: "sups" off;
  --recursive-titl: "titl" off;
  --recursive-zero: "zero" off;
}
```

We then define how we'll change and use these custom properties. Wakamaifondue uses a combination of [feature queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Conditional_Rules/Using_Feature_Queries) and classes to define where the properties will change and how to use the correct [font-variant-*](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant) in browsers that support the properties.

<div class="message info">
  <p>The `font-variant-*` properties currently in the specification are:

  <ul>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-ligatures">font-variant-ligatures</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-position">font-variant-position</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-caps">font-variant-caps</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric">font-variant-numeric</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-alternates">font-variant-alternates</a></li>
    <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-east-asian">font-variant-east-asian</a></li>
  </ul>
</div>

```css
.recursive-aalt {
    --recursive-aalt: "aalt" on;
}

.recursive-afrc {
    --recursive-afrc: "afrc" on;
}

@supports (font-variant-numeric: stacked-fractions) {
    .recursive-afrc {
        --recursive-afrc: "____";
        font-variant-numeric: stacked-fractions;
    }
}

.recursive-case {
    --recursive-case: "case" on;
}

.recursive-dlig {
    --recursive-dlig: "dlig" on;
}

@supports (font-variant-ligatures: discretionary-ligatures) {
    .recursive-dlig {
        --recursive-dlig: "____";
        font-variant-ligatures: discretionary-ligatures;
    }
}

.recursive-dnom {
    --recursive-dnom: "dnom" on;
}

.recursive-frac {
    --recursive-frac: "frac" on;
}

@supports (font-variant-numeric: diagonal-fractions) {
    .recursive-frac {
        --recursive-frac: "____";
        font-variant-numeric: diagonal-fractions;
    }
}

.recursive-numr {
    --recursive-numr: "numr" on;
}

.recursive-ordn {
    --recursive-ordn: "ordn" on;
}

@supports (font-variant-numeric: ordinal) {
    .recursive-ordn {
        --recursive-ordn: "____";
        font-variant-numeric: ordinal;
    }
}

.recursive-pnum {
    --recursive-pnum: "pnum" on;
}

@supports (font-variant-numeric: proportional-nums) {
    .recursive-pnum {
        --recursive-pnum: "____";
        font-variant-numeric: proportional-nums;
    }
}

.recursive-sinf {
    --recursive-sinf: "sinf" on;
}

.recursive-ss01 {
    --recursive-ss01: "ss01" on;
}

.recursive-ss02 {
    --recursive-ss02: "ss02" on;
}

.recursive-ss03 {
    --recursive-ss03: "ss03" on;
}

.recursive-ss04 {
    --recursive-ss04: "ss04" on;
}

.recursive-ss05 {
    --recursive-ss05: "ss05" on;
}

.recursive-ss06 {
    --recursive-ss06: "ss06" on;
}

.recursive-ss07 {
    --recursive-ss07: "ss07" on;
}

.recursive-ss08 {
    --recursive-ss08: "ss08" on;
}

.recursive-ss09 {
    --recursive-ss09: "ss09" on;
}

.recursive-ss10 {
    --recursive-ss10: "ss10" on;
}

.recursive-ss11 {
    --recursive-ss11: "ss11" on;
}

.recursive-ss12 {
    --recursive-ss12: "ss12" on;
}

.recursive-ss20 {
    --recursive-ss20: "ss20" on;
}

.recursive-sups {
    --recursive-sups: "sups" on;
}

@supports (font-variant-position: super) {
    .recursive-sups {
        --recursive-sups: "____";
        font-variant-position: super;
    }
}

.recursive-titl {
    --recursive-titl: "titl" on;
}

@supports (font-variant-caps: titling-caps) {
    .recursive-titl {
        --recursive-titl: "____";
        font-variant-caps: titling-caps;
    }
}

.recursive-zero {
    --recursive-zero: "zero" on;
}

@supports (font-variant-numeric: slashed-zero) {
    .recursive-zero {
        --recursive-zero: "____";
        font-variant-numeric: slashed-zero;
    }
}
```

The final step is to apply the current state of all custom properties whenever a class is being used.

Like with the `font-variation-settings`, we are using the low-level `font-feature-settings` property and can't just change one and expect it to work so whenever we change one custom property, we propagate the changes everywhere.

```css
.recursive-aalt,
.recursive-afrc,
.recursive-case,
.recursive-dlig,
.recursive-dnom,
.recursive-frac,
.recursive-numr,
.recursive-ordn,
.recursive-pnum,
.recursive-sinf,
.recursive-ss01,
.recursive-ss02,
.recursive-ss03,
.recursive-ss04,
.recursive-ss05,
.recursive-ss06,
.recursive-ss07,
.recursive-ss08,
.recursive-ss09,
.recursive-ss10,
.recursive-ss11,
.recursive-ss12,
.recursive-ss20,
.recursive-sups,
.recursive-titl,
.recursive-zero {
    font-feature-settings: var(--recursive-aalt), var(--recursive-afrc), var(--recursive-case), var(--recursive-dlig), var(--recursive-dnom), var(--recursive-frac), var(--recursive-numr), var(--recursive-ordn), var(--recursive-pnum), var(--recursive-sinf), var(--recursive-ss01), var(--recursive-ss02), var(--recursive-ss03), var(--recursive-ss04), var(--recursive-ss05), var(--recursive-ss06), var(--recursive-ss07), var(--recursive-ss08), var(--recursive-ss09), var(--recursive-ss10), var(--recursive-ss11), var(--recursive-ss12), var(--recursive-ss20), var(--recursive-sups), var(--recursive-titl), var(--recursive-zero);
}
```
