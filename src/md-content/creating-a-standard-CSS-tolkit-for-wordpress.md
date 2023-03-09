# Creating a standard CSS tolkit for WordPress

[Standardized Design Tokens and CSS for a consistent, customizable, and interoperable WordPress future](https://mrwweb.com/standardized-design-tokens-css-wordpress-future/) and [The Case for a Shared CSS Toolkit in WordPress](https://wptavern.com/the-case-for-a-shared-css-toolkit-in-wordpress) discuss the need for a standard design toolkit for WordPress.

These needs were articulated in Github Issue 38998: [Proposal: Standardized block markup, theme.json design tokens, and CSS classes to improve interoperability](https://github.com/WordPress/gutenberg/issues/38998) outlines the need for standardized design tokens for WordPress.

From my perspective, people who really want deep customizations are likely to use an external design system and an associated set of design tokens.

[Using design tokens in CSS](https://publishing-project.rivendellweb.net/using-design-tokens-in-css/) discusses Style Dictionary as a way to generate design tokens for multiple platforms.

This post will expand on Style Dictionary and provide a custom format to create a `theme.json` file.

The idea behind doing this is to keep the design tokens as the source of truth for our projects, regardless of where we use them.

Some caveats before we look at the code:

* This theme.json file will not contain any block-specific customizations. If you want them that's up to you
* The design tokens include a palette of colors taken from [The New Defaults](http://dudleystorey.github.io/thenewdefaults/) along with some [funky colors](https://rivendellweb-patterns.netlify.app/components/detail/lch-colors--funky.html) derived from Mopar cars from the '60s and '70s
* Where possible we will use [LCH colors](https://rivendellweb-patterns.netlify.app/components/detail/lch-colors--funky.html) and a set of [funky colors](https://rivendellweb-patterns.netlify.app/components/preview/lch-colors--funky.html) derived from Mopar colors from the 60s and 70s
  * This color space is fairly new so we'll have to provide conversion tools for browsers that don't currently support the color space
* The code in this post, along with the code in the previous post will produce the following outputs:
  * A set of CSS variables attached to the [:root](https://developer.mozilla.org/en-US/docs/Web/CSS/:root) element
  * A set of SCSS variables built as a partial
  * A Javascript object that we can use for further processing in other tools
  * a `theme.json` file that we can drop in to a WordPress block theme

We can add additional formats, both built-in and custom to create the tokens for the platforms we want.

## First Look at the code

I broke the custom code into three parts:

1. Node modules' import
2. Handlebars template compilation
3. Generating theme.json populated with design tokens

### Node Module Imports

Like any other application, we need to import and, where necessary, initialize the packages we'll use in the application

* First we require Syle Dictionary and extend an existing configuration file
* The `fs` module is necessary to read the template file for handlebars to process

```js
const StyleDictionary = require('style-dictionary').extend(__dirname + '/config.js');
const fs = require('fs');
const handlebars = require('handlebars');
```

### Handlebars template compilation

We first compile the Handlebars template before we can use it in the next step. I chose Handlebars because that's what I'm familiar with and because it gives me flexibility moving forward.

```js
const templateCustomWordpress = handlebars.compile(
  fs.readFileSync(__dirname + 
  '/templates/wordpress-template.hbs',
  'utf8'));
```

### Generating `theme.json`

The final step is to register the new format for Style Dictionary.

`transformGroup` tells Style Dictionary what transformation to apply to the file.

`formatter` defines what the format will look like. We include the template we defined in the last step.

```js
// 3
StyleDictionary.registerFormat({
  transformGroup: "web",
  name: 'wordpress',
  formatter: function(dictionary, platform) {
    return templateCustomWordpress({
      allProperties: dictionary.allProperties,
      properties: dictionary.properties,
      options: platform
    });
  }
});
```

We then build all platforms we've configured both here and in the main configuration file.

This means that instead of building with `style-dictionary build` we run `node build.js` to make out tokens.

```js
StyleDictionary.buildAllPlatforms();
```

## building out design tokens

The first thing that we need to do is figure out how we want to structure our tokens and whether the existingg structure works well enough to adopt it for our uses.

<figure>
  <img src='https://res.cloudinary.com/dfh6ihzvj/images/v1676001635/publishing-project.rivendellweb.net/style-dictionary-model/style-dictionary-model.webp?_i=AA' width='800'>
  <figcaption>Style dictionary implicit hierarchy</figcaption>
</figure>

One options is to follow the examples provided when you initialize the library. The color block looks like the block below:

```json
{
  "color": {
    "base": {
      "blue": {
        "50"  : { "value": "#E3F2FD", "attributes": {"font": "base"}},
        "100" : { "value": "#BBDEFB", "attributes": {"font": "base"}},
        "200" : { "value": "#90CAF9", "attributes": {"font": "base"}},
        "300" : { "value": "#64B5F6", "attributes": {"font": "base"}},
        "400" : { "value": "#42A5F5", "attributes": {"font": "inverse"}},
        "500" : { "value": "#2196F3", "attributes": {"font": "inverse"}},
        "600" : { "value": "#1E88E5", "attributes": {"font": "inverse"}},
        "700" : { "value": "#1976D2", "attributes": {"font": "inverse"}},
        "800" : { "value": "#1565C0", "attributes": {"font": "inverse"}},
        "900" : { "value": "#0D47A1", "attributes": {"font": "inverse"}},
        "A100": { "value": "#82B1FF", "attributes": {"font": "base"}},
        "A200": { "value": "#448AFF", "attributes": {"font": "inverse"}},
        "A400": { "value": "#2979FF", "attributes": {"font": "inverse"}},
        "A700": { "value": "#2962FF", "attributes": {"font": "inverse"}}
      }
    }
  }
}
```

it's modeled after Material Design's color palettes with values starting at 50 and then jumping to 100 and going to 900. It also adds accent colors for some values in the scale (100, 200, 400, and 700).

Another option is to create your own structure for the tokens.

This palette uses a section from [The New Defaults](http://dudleystorey.github.io/thenewdefaults/) and uses a different scheme since the colors are not purpose-based.

```json
{
  "hex_colors": {
    "whites": {
      "white": { "value": "#fffeff" },
      "alabaster": { "value": "#fefaf0" },
      "snow": { "value": "#f4fefd" },
      "ivory": { "value": "#fef7e5" },
      "cream": { "value": "#fffbda" },
      "eggshell": { "value": "#fef9e3" },
      "cotton": { "value": "#fbfcf7" },
      "chiffon": { "value": "#fafaf1" },
      "salt": { "value": "#f8efec" },
      "lace": { "value": "#faf3ea" },
      "coconut": { "value": "#fff1e6" },
      "linen": { "value": "#f2ebd3" },
      "bone": { "value": "#e7dfcc" },
      "porcelain": { "value": "#fffffc" },
      "parchment": { "value": "#fcf6df" },
      "rice": { "value": "#fbf6ef" }
    }
  }
}
```

This would be more helpful when providing a set of colors rather than a predefined palette. It puts the onus on you as the designer to pick what colors to use but it gives you a richer plaette of colors to experiment with.

So far, we've experimented with colors but we can do the same thing with basic layout elements and even with `@font-face` declarations.

The following block describes the properties of the Recursive font that I use in most of my designs.

```json
{
  "font": {
    "family": {
      "name": { "value": "Recursive Sans" },
      "stack": { "value": "Recursive, sans-serif" },
      "format": {
        "woff2": { "value": "./assets/fonts/recursive.woff2" }
      },
      "weight": { "value": "300 100" }
    }, 
    "instances": {}
  }
}
```

Recursive is a variable font so it presents additional challenges:

It has multiple possible combinations of fonts using both custom and fixed axes to represent sans-serif, serif and mono-spaced variants.

Because browsers don't support custom axes via CSS, we need to go lower and use [font-feature-settings](https://developer.mozilla.org/en-US/docs/Web/CSS/font-feature-settings) to define them. This will also address inheritance of font-feature-settings as described in [Boiled down: fixing the variable font inheritance problem](https://pixelambacht.nl/2022/boiled-down-fixing-variable-font-inheritance/)

## Putting the tokens together

Regardless of the schema we choose, we can then take these colors and usem to build our primary, secondary and additional models that we need.

We can do this using references. If using the New Default Palettes, we can do something like this:

```json
{
  "primary": {
    "color": {
      "text": { "value": "{hex_colors.blacks.charcoal}" },
      "background": { "value": "{hex_colors.whites.white}" },
      "link": { "value": "{hex_colors.reds.cherry}" }
    }
  }
}
```

## Adding metadata to the tokens

Not all formats need the same amount of data. For example, when creating a `theme.json` file for WordPress, each color needs a `name` and a `slug` in addition to the "value" in each field. Fortunately we can add them as attributes only where they are necessary. I've chosen to add the `name` and `slug` to both the LCH and HEX palettes as a way to future proof my code since I would rather not wait until WordPress CSS engine gainst support for LCH colors.

So now the colors look like this:

```json
{
  "hex_colors": {
    "whites": {
      "white": {
        "value": "#fffeff",
        "attributes": {
          "name": "White",
          "slug": "white"
        }
      },
      "alabaster": {
        "value": "#fefaf0",
        "attributes": {
          "name": "Alabaster",
          "slug": "alabaster"
        }
      },
      "snow": {
        "value": "#f4fefd",
        "attributes": {
          "name": "Snow",
          "slug": "snow"
        }
      },
      "ivory": {
        "value": "#fef7e5",
        "attributes": {
          "name": "Ivory",
          "slug": "ivory"
        }
      },
      "cream": {
        "value": "#fffbda",
        "attributes": {
          "name": "Cream",
          "slug": "cream"
        }
      },
      "eggshell": {
        "value": "#fef9e3",
        "attributes": {
          "name": "Eggshell",
          "slug": "eggshell"
        }
      },
      "cotton": {
        "value": "#fbfcf7",
        "attributes": {
          "name": "Cotton",
          "slug": "cotton"
        }
      },
      "chiffon": {
        "value": "#fafaf1",
        "attributes": {
          "name": "Chiffon",
          "slug": "chiffon"
        }
      },
      "salt": {
        "value": "#f8efec",
        "attributes": {
          "name": "Salt",
          "slug": "salt"
        }
      },
      "lace": {
        "value": "#faf3ea",
        "attributes": {
          "name": "Lace",
          "slug": "lace"
        }
      },
      "coconut": {
        "value": "#fff1e6",
        "attributes": {
          "name": "Coconut",
          "slug": "coconut"
        }
      },
      "linen": {
        "value": "#f2ebd3",
        "attributes": {
          "name": "Linen",
          "slug": "linen"
        }
      },
      "bone": {
        "value": "#e7dfcc",
        "attributes": {
          "name": "Bone",
          "slug": "bone"
        }
      },
      "porcelain": {
        "value": "#fffffc",
        "attributes": {
          "name": "Porcelain",
          "slug": "porcelain"
        }
      },
      "parchment": {
        "value": "#fcf6df",
        "attributes": {
          "name": "Parchment",
          "slug": "parchment"
        }
      },
      "rice": {
        "value": "#fbf6ef",
        "attributes": {
          "name": "Rice",
          "slug": "rice"
        }
      }
    }
  }
}
```

We can also create colors derived from our base palette.

```json
{
  "primary": {
    "color": {
      "text": {
        "value": "{ hex_colors.blacks.charcoal }",
        "attributes": {
          "name": "Text",
          "slug": "text"
        }
      },
      "background": {
        "value": "{ hex_colors.whites.white }",
        "attributes": {
          "name": "Background",
          "slug": "background"
        }
      },
      "link": {
        "value": "{ hex_colors.reds.cherry }",
        "attributes": {
          "name": "link",
          "slug": "link"
        }
      }
    }
  }
}
```

## Putting it all together

The handlebars template is fairly simple.

It's text file using the `hbs` extension that contains the text that we want to work with and interpolated content.

For this example, I've taken the colors portion of the `theme.json` template and prefiled it with values.

```handlebars
{
  "$schema": "https://schemas.wp.org/trunk/theme.json",
  "version": 2,
  "settings": {
    "appearanceTools": true,
    "color": {
      "palette": [
        {
          "color": "#ffffff",
          "name": "Base",
          "slug": "base"
        },
        {
          "color": "#000000",
          "name": "Contrast",
          "slug": "contrast"
        },
        {
          "color": "#9DFF20",
          "name": "Primary",
          "slug": "primary"
        },
        {
          "color": "#345C00",
          "name": "Secondary",
          "slug": "secondary"
        },
        {
          "color": "#F6F6F6",
          "name": "Tertiary",
          "slug": "tertiary"
        }
      ]
    }
  ]
}
```

For the `theme.json` template, I've chosen to only use the base elements, not change any custom block styles.

The goal now is to populate the template with data.

Wherever we want to insert data we use moustache syntax:
