# Updates since WordPress 6.0 and 6.1

The following items have been added to `theme.json` since the release of WordPress 6.0.

## Styling elements in `theme.json`

WordPress 6.1 introduces a system to consistently style elements and address a significant pain point for developers. For example, many blocks display buttons (e.g., Button block, Search block, File block, etc.) but there is no way to style all these buttons together, they must be styled individually which is prone to error and creates unnecessary repetitions.

Developers no longer need to include custom CSS with the theme to ensure all these buttons look the same (although it may still be preferable for individual developers).

Prior to the 6.1 release, users could style the link and individual heading elements. With 6.1, it is now possible to style the following elements:

* button
* caption
* cite
* heading

The heading element will work for all headings, h1 to h6 whereas before you had to work with each heading level separately.

Note that the example only covers colors but you can use the same style attributes as you can in blocks, in addition to the new features we'll cover later in this section.

```json
{
  "styles": {
    "button": {
      "color": {
        "background": "#fff",
        "text": "#000"
      }
    },
    "caption": {
      "color": {
        "background": "rebeccapurple",
        "text": "white"
      }
    },
    "cite": {
      "color": {
        "background": "#0f0",
        "text": "#fff"
      }
    },
    "heading": {
      "color": {
        "background": "#000",
        "text": "#fff"
      }
    }
  }
}
```

If you use the Gutenberg plugin, some of these elements match predefined classes created by WordPress blocks. The specific mappings are:

* **button**: maps to the `wp-element-button` CSS class. Also maps to `wp-block-button__link` for backwards compatibility
* **caption**: maps to the following classes:
  * `.wp-element-caption`
  * `.wp-block-audio figcaption`
  * `.wp-block-embed figcaption`
  * `.wp-block-gallery figcaption`
  * `.wp-block-image figcaption`
  * `.wp-block-table figcaption`
  * `.wp-block-video figcaption`
  * heading maps to  the `h1` to `h6` CSS selectors

### Exercise

Insert the following block in your `theme.json` file under the `styles` element. Create it if it doesn't exist.

```json
    "button": {
      "color": {
        "background": "#fff",
        "text": "#000"
      }
    },
    "caption": {
      "color": {
        "background": "rebeccapurple",
        "text": "white"
      }
    },
    "cite": {
      "color": {
        "background": "#00f",
        "text": "#fff"
      }
    },
    "heading": {
      "color": {
        "background": "#000",
        "text": "#fff"
      }
    }
```

Test your theme with these new settings and modify them to the following:

* `button` element
  * Change the `button` background color to `rgb(34,139,34)`
  * Change the text color to `#fff`
* `cite`
  * Change the `background` color to "navy"

## Interactive states

6.1 introduces a solution for another challenge in working with block themes: how to control interactive states like `hover` of `focus` for elements and blocks from `theme.json`.

The solution introduces three new `pseudo-selectors` to Styles:

* `:active`
* `:focus`
* `:hover`

These selectors can be applied in theme.json using the following blocks as an example.

The example only changes the color of the links when you hover or click on them and give them focus. You can use all the attributes and child elements that you can use in a block.

The example uses three-digit hexadecimal values. We can use any color format supported in `theme.json`.

```json
{
  "styles": {
    "elements": {
      "link": {
        ":hover": {
          "color": {
            "text": "#000"
          }
        },
        ":active": {
          "color": {
            "text": "#0f0"
          }
        },
        ":focus": {
          "color": {
            "text": "#f00"
          }
        }
      }
    }
  }
}
```

### Exercise

Add the following content to your `theme.json` file under the `elements` block. Add the elements block if it doesn't exist in your theme.

```json
      "link": {
        ":hover": {
          "color": {
            "text": "#000"
          }
        },
        ":active": {
          "color": {
            "text": "#f00"
          }
        },
        ":focus": {
          "color": {
            "text": "#00f"
          }
        }
      }
```

Once you've added the settings block, make the following changes.

1. Change the color of the `:hover` link to `rebeccapurple`
2. Change the color of the `:focus` element to `rebeccapurple`

## Outlines

buttons can now have outlines declared as part of their definition in `theme.json`.

The following button definition includes outlines for the base element and the hover state

```json
{
  "styles": {
    "elements": {
      "button": {
        "outline": {
          "offset": "3px",
          "width": "3px",
          "style": "dashed",
          "color": "red"
        },
        ":hover": {
          "outline": {
            "offset": "3px",
            "width": "3px",
            "style": "solid",
            "color": "blue"
          }
        }
      }
    }
  }
}
```

### Exercise

Copy the following block into your theme's `theme.json` under the `elements` section. Create this section if it doesn't exist on your `theme.json` file

```json
      "button": {
        "outline": {
          "offset": "3px",
          "width": "3px",
          "style": "dashed",
          "color": "red"
        },
        ":hover": {
          "outline": {
            "offset": "3px",
            "width": "3px",
            "style": "solid",
            "color": "blue"
          }
        }
      }
```

Once you've added the block, make the following changes:



## Styling elements within blocks

You can apply the element inside block declarations. These declarations apply the rules to the elements nested within the block you wish to target.

Currently, this feature only lets you insert `link` and `button` elements inside blocks.

In this example we add a `:hover` color to links inside a `core/paragraph` block so that all the links inside paragraphs will change to red when users hover over them.

```json
{
  "blocks": {
    "core/paragraph": {
      "elements": {
        "link": {
          ":hover": {
            "color": {
              "text": "red"
            }
          }
        }
      }
    }
  }
}
```

### Exercise

Add the following block inside `core/paragraph` block. Add the `core/paragraph` block if it's not in your `theme.json` file.

```json
      "elements": {
        "link": {
          ":hover": {
            "color": {
              "text": "blue"
            }
          }
        }
      }
```

Once you add the block, make the following changes.

Change the value of the text color from blue to red.

Test different hover colors to see what matches your theme the best.

## Padding, margin and block gap presets

WordPress 6.1 introduces `spacingScale`, used to generate an array of spacing preset sizes for use with padding, margin, and gap settings.

The `spacingScale` section takes the following attributes:

* `operator`: specifies how to calculate the steps with either `*` for multiplier, or `+` for sum
* `increment`: the amount to increment each step by. Core by default uses a `perfect 5th` multiplier of 1.5
* `steps`: the number of steps to generate in the spacing scale. The default is 7
  * To prevent the generation of the spacing presets, and to disable the related UI, this can be set to 0.
* `mediumStep`: the steps in the scale are generated descending and ascending from a medium step, so this is the size value of the medium space, without the unit. The default medium step is `1.5rem` so the `mediumStep` value is 1.5
* `unit`: the unit the scale uses, eg. px, rem, em, %. The default is `rem`

```json
"spacing": {    
  "spacingScale": {
    "operator": "*",
    "increment": 1.5,
    "steps": 7,
    "mediumStep": 1.5,
    "unit": "rem"
  }
},
```

Once you've added the settings to your theme's `theme.json` file the spcing settings like margins and paddings will look slightly different.

As the animation below shows, the editor will provide the slider by default and will configure it with the parameters you set.

The biggest difference is that it won't tell you what the value of each step is, it will just show the number of the step, from 0 to 6.

<video autoplay="true" loop="true" src="https://videos.files.wordpress.com/suAQdvMU/wp61-spacing-scale-01-2.mp4"><video>

The default setting for spacing scales will change all values (top, right, bottom left) simultaneously. They will all be set to the same value.

<figure>
  <img src="https://learn.wordpress.org/files/2022/11/wp61-spacing-presets-02.png">
  <figcaption>Dimensions step selector with the link to individual selectors highlihted in blue</figcaption>
</figure>

You can set individual values for each padding or margin property. If you click in the link icon to the right of the name of the dimension you want to modify you will get four separate items you can select from.

The four items: top, right, bottom, and left present the selector scale and a link to enter a custom value.

<figure>
  <img src="https://learn.wordpress.org/files/2022/11/wp61-spacing-presets-03.png">
  <figcaption>Padding setting showing four separate selectors for the for individual padding properties</figcaption>
</figure>

You can still get something similar to the behavior by clicking the set custom size button located to the right of the dimension you're modifying.

<figure>
  <img src="https://learn.wordpress.org/files/2022/11/wp61-spacing-presets-06.png">
  <figcaption>Location of the <code>Set custom size</code> button to the right of the name of the setting you want to change</figcaption>
</figure>

You can type in a value and indicate what unit you want to use. The new item is the slider to the right, it will allow you to increase or decrease the value for the dimension, all four values will be set together, you can't indicate separate values.

<figure>
  <img src="https://learn.wordpress.org/files/2022/11/wp61-spacing-presets-07.png">
  <figcaption>Custom dimension settings. Slider on the right gives more flexibility in setting the value</figcaption>
</figure>

You can also click both the `set custom size` and `unlink sides` buttons to create a fully customizable sizing experience. You now can customize each value separately.

<figure>
  <img src="https://learn.wordpress.org/files/2022/11/wp61-spacing-presets-08.png">
  <figcaption>Individual settings for dimensions. The default shows the scale selector</figcaption>
</figure>

You can also set custom sizes for each either as a custom value or using the presets.

<figure>
  <img src="https://learn.wordpress.org/files/2022/11/wp61-spacing-presets-09.png">
  <figcaption></figcaption>
</figure>

### Exercise

```json
"spacing": {    
  "spacingScale": {
    "operator": "*",
    "increment": 1.5,
    "steps": 7,
    "mediumStep": 1.5,
    "unit": "rem"
  }
}
```

## Fluid Typography Presets

In 6.0 WordPress added the capability to use CSS [min](https://developer.mozilla.org/en-US/docs/Web/CSS/min), [max](https://developer.mozilla.org/en-US/docs/Web/CSS/max) and [clamp](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp) functions in the values for typography presets

```json
"settings": {
  "custom": {
    "typography": {
      "font-size": {
        "huge": "clamp(2.25rem, 4vw, 2.75rem)",
        "gigantic": "clamp(2.75rem, 6vw, 3.25rem)",
        "colossal": "clamp(3.25rem, 8vw, 6.25rem)"
      }
    }
  }
}
```

WordPress 6.1 changes the way fluid typography works by introducing the `fluid` attribute.

You use the attribute in two places.

The first place is under typography with a boolean value; `true` to enable and `false` to disable.

The second place we use it is inside font sizes.

Inside `fontSizes` array, create an object with the following properties:

* `size` a string containing the desired size. For example "2rem"
* `fluid`, an object containing the following properties
  * `min` the smallest value passed as a string along with the unit. For example, "2rem"
  * `max` the largest value passed as a string along with the unit. For example, "2.5rem"
* `slug`, the computer-readable name for the preset
* `name`, the human-readable name for the preset

You can creaate as many presets as you need for your theme.

If you’ve configured your theme.json with static font sizes you choose which ones to keep as fixed sizes and which ones to convert to fluid dimensions. This example contains only fluid font sizes.

```json
"settings": {
  "typography": {
    "fluid": true,
    "fontSizes": [
      {
        "size": "2rem",
        "fluid": {
          "min": "2rem",
          "max": "2.5rem"
        },
        "slug": "medium",
        "name": "Medium"
      }
    ]
  }
}
```

### Exercise

Add the following block under `typography`.

If there is no `fontSizes` block, this will create it. If there is already a `fontSizes` block configured you will have to replacce it with the fluid sizes block we're configuring now.

```json
  "typography": {
    "fluid": true,
    "fontSizes": [
      {
        "size": "2rem",
        "fluid": {
          "min": "2rem",
          "max": "2.5rem"
        },
        "slug": "medium",
        "name": "Medium"
      }
    ]
  }
```

Once you've added the `fontSizes` section, make the following changes.

1. Add a new font size with the following characteristics
   1. size: 1em
   2. fluid
      1. min: 1em
      2. max: 2em
   3. slug: small
   4. name: Small
2. Add a new font size with the following characteristics
   1. size: 3em
   2. fluid:
      1. min: 3em
      2. max: 4em
   3. slug: large
   4. name: Large

## Custom spacing sizes

In addition to creating fluid typography settings, we can create fluid spacing presets starting with WordPress 6.1.

The idea is that you can create your own spacing presets with both static or fluid sizes.

We can use these spacing sizes to override WordPress built-in presents.

This example creates custom presents matching the names of those in core but using custom values that better match your theme.

You can also change the default spacing values in your theme.

The example below shows how to create custom spacing size blocks to use accros your theme.

Each entry has three elements:

* `size`: a string with the value for this preset
* `slug`: the machine-readable name for the preset
* `name`: the human-readable name for the preset

```json
{
"settings": {
     "spacing": {
      "spacingSizes": [
        {
          "size": "min(16px, 2vw)",
          "slug": "20",
          "name": "2"
        },
        {
          "size": "min(40px, 4vw)",
          "slug": "30",
          "name": "3"
        }
       ]
    }
  }
}
```

### Exercise

Copy the following block into your `spacing` settings. If the `spacing` block doesn't exist create under `settings`.

```json
{
      "spacingSizes": [
        {
          "size": "min(16px, 2vw)",
          "slug": "20",
          "name": "2"
        },
        {
          "size": "min(40px, 4vw)",
          "slug": "30",
          "name": "3"
        }
       ]
    }
```

Once you've added the block, complete the following tasks:

* Add the following elements to the `spacingSizes` object:
  * 5 preset
    * Size: "min(64px, 5vw)"
    * Slug: "50"
    * Name: "5"
  * 6 preset
    * Size: "min(86px, 6vw)"
    * Slug: "60"
    * Name: "6"
  * 7 preset
    * Size: "min(110px, 7vw)"
    * Slug: "70"
    * Name: "7"
