# How to Configure Your Site with Theme.json

In this presentation, we will talk about theme.json, what it is and how to use it to configure your block-based theme.

## Objectives

After completing this lesson, participants will be able to:

* Explain the purpose of theme.json (what the file does)
* Distinguish between the different parts of theme.json and explain their purpose (what each part does)
* Build a basic theme.json file for a block theme

## Prerequisite Skills

Participants will get the most from this lesson if they have familiarity with:

* Completed the Basic WordPress Concepts lesson
* Basic experience with a text-editor
* Familiarity with the JSON format and basic experience writing JSON files

## Readiness Questions

* Have you built a theme?
* Do you want to configure a theme?
* Have you worked in a text editor?
* Have you created JSON files?
* Can you locate WordPress files?
* Do you know how to navigate WordPress source files using a text editor?
  
## Slides

* <a data-external="true" href="https://wptrainingteam.github.io/lesson-plans/repo-name/slides/">Slides</a>

## Materials Needed

* A local installation of WordPress
  * Local by Flywheel **(WordPress specific and ready to run)**
  * MAMP / WAMP + A WordPress installation
* A block-enabled theme. Some examples:
  * [Twenty TwentyTwo](https://wordpress.org/themes/twentytwentytwo/) **(recommended and bundled with WordPress)**
  * [Archeo](https://wordpress.org/themes/archeo/)
  * [Armando](https://wordpress.org/themes/armando/)
* The latest version of the [Gutenberg Plugin](https://wordpress.org/plugins/gutenberg/)
* Data to populate the theme. Possible alternatives
  * Your existing data
  * A copy of the [WordPress Theme Unit Test data](https://codex.wordpress.org/Theme_Unit_Test)
  * A copy of the [Gutenberg Theme Data](https://github.com/Automattic/theme-tools/tree/master/gutenberg-test-data)
  * Look at [How to add demo content in WordPress](https://learn.wordpress.org/lesson-plan/how-to-add-demo-content-in-wordpress/) for more information on how to add demo content to your WordPress site
* A code editor. Possible options:
  * [VS Code](https://code.visualstudio.com/)
  * [Atom](https://atom.io/)
  * [Webstorm](https://www.jetbrains.com/webstorm/)
  * [Sublime Text](https://www.sublimetext.com/)
  * [Brackets](https://brackets.io/)
  
## Notes for the Presenter/Reviewers

* `theme.json` will still work if Gutenberg is not installed but some features may not work with just WordPress core
* If there are participants who don't have the necessary setup then, downloading [Local by Flywheel](https://localwp.com/) should help; it comes with WordPress ready to go and WordPress comes bundled with the Twenty TwentyTwo theme so they can follow up
* theme.json is large enough that it may need more than one session to cover in its entirety
* This lesson plan deals only with `theme.json` as it works with block themes
  * There will be auxiliary content related to equivalency between features we used to add with `add_theme_support()` and their `theme.json` equivalents. You can skip that section if your audience is not familiar with add_theme_support
* The 10000 feet will work through the main sections and briefly describe what they are before going into details

## Lesson Outline</h2>

* Participant Introductions
  * Where are you in your Gutenberg Journey?
  * Have you built or configured a theme?
* Introduction (discussion)
  * What is theme.json?
  * What does it do?
  * Why is it important?
* theme.json structure (combination of show and tell and discussion)
  * The 10000 feet overview
    * Demo
* More detailed overview
  * $schema
  * Version
  * Settings
  * Presets
  * Custom
  * Styles
    * Top-level
    * Block-level
    * Elements
  * Typography
    * fontFace (new in Gutenberg 12.8)
  * Custom Templates
  * Template Parts
  * Patterns
* Putting it all together
  * Building a basic theme.json configuration file
  
## Exercises: Build your own theme.json

In this series of exercises we will build a `theme.json` file that you will be able to drop onto an existing theme or use it to experiment with different values.

For illustration purposes, each exercise has its own completed sample file that you can compare your work on, but for a production `theme.json` file, all the sections are grouped in one file and that's how we'll work on it.

Fromm the repository , open `theme.json` in the `starter-template` folder in the repository. FIXME: add link to the repository.

### Exercise 1: Basic settings

The first portion we'll work with is border settings. These settings will display border settings for all the block types that support borders (not all blocks support all properties that we'll cover in these exercises).

Boolean values represent items that will be enabled or disabled in the post or full site editor.

```json
  "border": {
    "color": true,
    "radius": true,
    "style": true,
    "width": true
  },
```

### Exercise 2: Color and duotone settings

The next section deals with colors in the theme. The first set of attributes will enable or disable color settings for the the theme.

The main item to highlight are duotone and gradient settings. There are two sets of attributes that can be enabled independently from each other: custom and default duotones and gradients.

In this block we'll define a single default duotone color going from black to white.

Copy the following code after the code from the previous exercise:

```json
    "color": {
      "background": true,
      "custom": true,
      "customDuotone": true,
      "customGradient": true,
      "defaultGradients": true,
      "defaultPalette": true,
      "link": false,
      "text": true,
      "duotone": [
        {
          "colors": [
            "#000",
            "#FFF"
          ],
          "slug": "black-and-white",
          "name": "Black and White"
        }
      ]
    },
    "gradients": [
      {
        "name": "Red to blue",
        "slug": "red-blue",
        "gradient": "linear-gradient(90deg, rgb(255,0,0) 0%, rgb(0,0,255) 50%"
      }
    ],
```

For additional exercises, add new duotones and gradients. Experiemnt with the values of the linear gradient attribute.

### Exercise 3: Custom palette colors

Adding colors come next. The `palette` is an array of colors that will be used in the theme.

```css
      "palette": [
        {
          "slug": "link-red",
          "color": "#cd2653",
          "name": "Link red"
        }
      ],
```

These colors are in addition to what you'll see as default for your WordPress theme.

### Exercise 4: Layout width

When setting the layout dimensions you specify the width of the content area and the dimensions of the wide layout.

```json
    "layout": {
      "contentSize": "800px",
      "wideSize": "1000px"
    },
```

### Exercise 5: Spacing

The spacing section has two areas, defining what elements are allowed in the theme and then defining what units of measurements we want to use.

These are all valid CSS measurement units. If you've done work with CSS in the past, these should look familiar to you.

```json
    "spacing": {
      "blockGap": true,
      "padding": true,
      "margin": true,
      "units": [
        "%",
        "px",
        "em",
        "rem",
        "vh",
        "vw"
      ]
    },
```

## Assessment

`theme.json` acts as a theme's configuration file

1. Yes
2. Yes, but only for block themes
3. No

**Answer:**  1. Correct answer

Settings in `theme.json` control what content creators see in the UI

1. No
2. Yes

**Answer:** 2. Correct answer

When adding colors to `theme.json` you can add colors in the following formats

1. RGB
2. Named Colors
3. RGB, Named Colors, Hexadecimal
4. Hexadecimal

**Answer**: 3. Correct Answer

The `$schema` element allows supporting editors to validate your work

1. True
2. False

**Answer**: 1. Correct answer

## Additional Resources

* [Theme.json schema](https://make.wordpress.org/themes/2021/11/30/theme-json-schema/) by [Alex Lende](https://make.wordpress.org/themes/2021/11/30/theme-json-schema/)
* [https://raw.githubusercontent.com/WordPress/gutenberg/trunk/schemas/json/theme.json](theme.json schema) (updated when new items are added to the schema)

## Full Sample Lesson Plan

## Introduction

`Theme.json` allows you customize your WordPress theme from one central location.

It takes over `functions.php` for most of a theme's configuration settings and provides new functionality that may not have a direct equivalent in `functions.php`.

While theme.json will work on any WordPress theme, for these lessons we'll concentrate on block-based themes.

See [Using theme.json in a classic theme](https://mkaz.blog/wordpress/using-theme-json-in-a-classic-theme/) for more information about theme.json as applied to classic themes.

### About JSON and JSON requirements

`theme.json` is a JSON file and, as such, presents some things that may not be familiar if you haven't worked with the format before.

All strings in JSON must be enclosed in double quotes. anything else will be flagged as an error.

  The first example below will work as intended:

  The second example is a valid part of the `theme.json` schema but will fail validation because of the single quotes around the version string.

| Valid  | Invalid|
| :---:  | :---:  |
| "version": 2 | 'version': 2 |

Boolean values (true or false) and numbers must not be quoted.

Even a single misplaced comma or colon can cause a JSON file to not work. You should be careful to validate the file you're creating with tools like [JSONLint](https://jsonlint.com/) or CodeBeautify's [JSON Validator](https://codebeautify.org/jsonvalidator).

For a good introduction to working with JSON, see [Working with JSON](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON) at MDN.

## Necessary tools

In order to use `theme.json`, you will need the [latest version of WordPress](https://wordpress.org/download/) and the [latest version of the Gutenberg Plugin](https://wordpress.org/plugins/gutenberg/).

We use Gutenberg to take advantage of new features that are under development outside of WordPress core, and will eventually be merged back into core.

## `theme.json` structure: The 10000 view

The structure of `theme.json` follows the JSON conventions as defined in [ECMA-404](https://www.ecma-international.org/publications-and-standards/standards/ecma-404/).

An empty `theme.json` file looks like this:

```json
{
  "$schema": "https://schemas.wp.org/trunk/theme.json",         
  "version": 2,
  "settings": {},
  "styles": {},
  "customTemplates": [],
  "templateParts": [],
  "patterns": []
}
```

The settings section provides a way to enable or disable features in the post editor and establish theme settings like colors, duotones, and gradients.

Styles allow theme developers to customize styles for the theme.

customTemplates and customParts provide places where to add metadata about templates and template parts

Finally, patterns enable you to associates patterns available in the WordPress Pattern directory

We will look at each major section of the theme.json file in turn.

### $schema

The location of the [json schema](https://json-schema.org/) for the theme.json file.

Adding this string will allow you to validate the theme.json against the schema in your text editor.

The only valid value is the string: `https://schemas.wp.org/trunk/theme.json` that points to the latest revision of the schema.

```json
"$schema": "https://schemas.wp.org/trunk/theme.json",
```

### version

The version attribute represents the version of the schema the `theme.json` conforms to.

Possible values are 1 and 2. The default value is 2 and indicates the latest version of the schema:

```json
"version": 2
```

It is expected that the number will increase as new features are introduced or features from the Gutenberg plugin are integrated to WordPress core.

If the default version value changes, your theme won't break, the items in the new version will not be available and you will need to update the theme.json file and figure out if any existing part of the file needs to be changed.

### presets / settings

The `theme.json` file provides a canonical way to define the settings of the block editor. These settings includes things like:

* The customization options that will be available or hidden from the user
* The default colors, font sizes available to the use customizing the theme
* Default layout of the editor and layout-related items for the given theme

----

**Note:**

**Not all blocks support all the features we'll configure in theme.json. This is intentional and may change over time.**

----

The first setting, `appearanceTools` is special. Rather than specify a single setting, it enables a group of settings:

* **border**: color, radius, style, width
* **color**: link
* **spacing**: blockGap, margin, padding
* **typography**: lineHeight

The first example shows the `border` family of attributes. The code below indicates that all the border attributes are enabled.

If you set any value to false, the attribute will not be shown to the user working with your theme.

```json
"settings": {
    "appearanceTools": true,
  "border": {
    "color": true,
    "radius": true,
    "style": true,
    "width": true
  }
}
```

The color block combines both controls for what UI attributes will appear in the editor and what values will be available to the user.

`duotones`, `gradients` and `colors` provide additional values for the Gutenberg editor to use in additions to whatever defaults may be available.

You can disable either the custom values (`customGradient` and `customDuotone`) or the default values (`defaultDuotone`, `defaultGradient` or `defaultPalette`) by setting them to false in the configuration.

I would suggest you remove the default values and only leave the `color` array in place if you have branding requirements or have a prefered color scheme for your site.

When choosing colors you should always consider accessibility, particularly color blindness and contrast between your text and background colors.

```json
"settings": 
  "color": {
    "background": true,
    "custom": true,
    "customDuotone": true,
    "customGradient": true,
    "defaultDuotone": true,
    "defaultGradients": true,
    "defaultPalette": true,
    "link": true,
    "text": true
  }
}
```

The `duotone` array uses a common pattern that we'll see moving forward:

* The slug, the machine-readable name of the item
  * Usually lowercase, camel-cased if it has more than one word, the second and subsequent words are capitalized
* The (human-readable) label
  * Can be capitalized as needed
  * Can have spaces in it
  * This will be shows to the user in the UI
* Translators will take this value when translating the content of your theme
* One more more values for the item
* In the case of `duotone` it is an array of two colors, representing the color for highlights and shadows

----

**Because duotone filters are high specialized, It is strongly recommended that you test the duotone colors that you add to your theme since the use of colors may have accessibility implications.**

----

`gradients` use a similar schema:

* The slug, the machine-readable name of the item
* The (human-readable) name
* The gradient, indicating the CSS gradient that you want to use.
  * Most of the time you will use [linear gradients](https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient) with default settings that you can modify in the editor's UI when you enable gradients for the theme.

If you don't plan to add duotone pairs and gradients, you can remove your theme settings for them.

```json
"settings": {
    "colors": {
      "duotone": [{
        "slug": "black-and-white",
      "name": "Black and White",
      "colors": [
          "#000",
        "#FFF"
      ]
    }],
    "gradients": [
      {
        "slug": "blush-bordeaux",
        "gradient": "linear-gradient(135deg,rgb(254,205,165) 0%,rgb(254,45,45) 50%,rgb(107,0,62) 100%)",
        "name": "Blush bordeaux"
      }
    ]
  }
}
```

The `palette` object presents a list of colors that you want to be available in the editor's UI.

You can present the colors in any color format supported by CSS. The example block presents three of the most common formats:

* `Strong Magenta` is written using a six-digit hexadecimal number format where every pair of digits represents a color channel (red, green, blue) using [hexadecimal notation](https://en.wikipedia.org/wiki/Hexadecimal)
* `Rebecca Purple` is written as a CSS [named color](https://www.w3.org/TR/css-color-4/#named-colors)
* `Very Dark Grey` is written using an [RGB](https://www.w3.org/TR/css-color-4/#rgb-functions) function that indicate the percentage of red, green and blue in the color

```json
"settings": {
    "colors": {
      "palette": [
      {
        "slug": "strong-magenta",
        "color": "#a156b4",
        "name": "Strong magenta"
      },
      {
        "slug": "rebeccapurple",
        "color": "rebeccapurple",
        "name": "Rebecca Purple"
      },
      {
        "slug": "very-dark-grey",
        "color": "rgb(131, 12, 8)",
        "name": "Very dark grey"
      }
    ]
  }
}
```

----

**IMPORTANT:**

**Do not use color as the only way to convey information. For example: If you want to convey success, use text or another way to indicate success in addition to the color green.**

**This is also important from a cultural sensitivity standpoint. Not everyone using your site may understand your use of color.**

**For more information see: [Creating Culturally Customized Content for Website Translation](https://www.globalizationpartners.com/2011/08/10/creating-culturally-customized-content-for-website-translation/).**

----

The `Layout` object defines the width of the default and wide layouts in the editor.

The `wideSize` attribute defines the value of the wide layout that you can configure in the editor's UI

```json
  "layout": {
    "contentSize": "800px",
    "wideSize": "1000px"
  },
```

In the spacing block we do two things:

We define the aspect-related spacing items that will be available to the author in the editor.

`blockGap` controls the space between blocks. The direction for the spacing depends on what block and alignment you're using.

We also define what units the spacing items will be expressed in. If you don't specify a unit then the unit will not be available to use.

```json
  "spacing": {
    "blockGap": true,
    "padding": true,
    "margin": true,
    "units": [
        "%",
      "px",
      "em",
      "rem",
      "vh",
      "vw"
    ]
  },
```

The `typography` block defines items related to your site's typography.

The block editor gives you a lot of control as to the typographical elements that you can make available on your theme.

You control the display for the following typographical items

```json
  "typography": {
    "customFontSize": true,
    "dropCap": true,
    "fontStyle": true,
    "fontWeight": true,
    "letterSpacing": true,
    "lineHeight": true,
    "textDecoration": true,
    "textTransform": true,
```

You can also define the font stacks (one or more fonts) that you want to use.

The attribute that defines the font stack is `fontFamily`. Note that defining the stack here will not actually load the font. You still have to enqueue the font and load it using `@font-face` in CSS.

```json
    "fontFamilies": [
      {
        "fontFamily": "-apple-system,BlinkMacSystemFont,\\"Segoe UI\\",Roboto,Oxygen-Sans,Ubuntu,Cantarell,\\"Helvetica Neue\\",sans-serif",
        "slug": "system-fonts",
        "name": "System Fonts"
      },
      {
        "fontFamily": "Geneva, Tahoma, Verdana, sans-serif",
        "slug": "geneva-verdana",
        "name": "Geneva, Verdana"
      },
      {
        "fontFamily": "Cambria, Georgia, serif",
        "slug": "cambria-georgia",
        "name": "Cambria, Georgia"
      },
```

If you're using Gutenberg (**as of version 12.8**) there are additional attributes you can use that will actually load the font for you from the theme.json file.

The first attribute you can add is `provider`. This tells the editor where the font is coming from, either a local file or an external font provider like Google.

The values are equivalent to those on the CSS [@font-face](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face) at-rule.

The attributes inside a `fontFace` object are:

* [fontFamily](https://developer.mozilla.org/en-US/docs/Web/CSS/font-family): The name of the font or the font stack you choose to use
* [fontWeight](https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight): one or two numbers that indicate the weight of the font (if one value) and the range of weight values (if you add two values)
  * The higher the number the bolder the font will be
  * The numeric values available depend on the font you use
* [fontStyle](https://developer.mozilla.org/en-US/docs/Web/CSS/font-style): Indicates if the fone is italic or not. It takes one of the following values:
* `normal`: normal font style
* `italic`: italic font style
* `oblique`: oblique font style
* [fontStretch](https://developer.mozilla.org/en-US/docs/Web/CSS/font-stretch): Let's you choose if the font is condensed or expanded. It takes a percentrage value between 50 and 200% or one of the following keywords:
  * `normal`: normal font stretch
  * `ultra-condensed`: ultra condensed font stretch
  * `extra-condensed`: extra condensed font stretch
  * `condensed`: condensed font stretch
  * `semi-condensed`: semi condensed font stretch
  * `semi-expanded`: semi expanded font stretch
  * `expanded`: expanded font stretch
  * `extra-expanded`: extra expanded font stretch
  * `ultra-expanded`: ultra expanded font stretch
* `src`: the path to the font relative to the location of the `theme.json` file

```json
      {
        "fontFamily": "Recursive, sans-serif",
        "name": "Recursive",
        "slug": "recursive",
        "fontFace": [
          {
            "fontFamily": "Recursive",
            "fontWeight": "300 1000",
            "fontStyle": "normal",
            "fontStretch": "normal",
            "fontDisplay": "swap",
            "src": [
                "file:./assets/fonts/recursive-latin-subset.woff2"
            ]
          }
        ]
      }
    ],
```

We can also define custom font sizes to use in our theme. The individual font sizes use the same format that we've seen elsewhere:

* Slug
* Name
* Size containing the value (including the unit) as a string (encased in quotation marks)

You can define as many sizes as you want or need and multiple entries can have the same value. In the example below, both `normal` and `medium` have the value `20px`.

```json
    "fontSizes": [
      {
        "slug": "tiny",
        "size": "16px",
        "name": "Tiny"
      },
      {
        "slug": "small",
        "size": "18px",
        "name": "Small"
      },
      {
        "name": "Medium",
        "slug": "medium",
        "size": "20px"
      },
      {
        "name": "Normal",
        "slug": "normal",
        "size": "20px"
      }
    ]
  },
```

The custom area of the theme.json file is where you can define your own custom CSS properties to use in your content.

Any values declared within the custom field will be transformed to CSS Custom Properties following this naming schema:

```css
--wp--custom--: value
```

Using the following custom section of a `theme.json` file

```json
  "custom": {
      "baseFont": 16,
      "lineHeight": {
      "small": 1.2,
      "medium": 1.4,
      "large": 1.8
    }
  },
```

will generate the following CSS:

```css
body {
    --wp--custom--base-font: 16;
    --wp--custom--line-height--small: 1.2;
    --wp--custom--line-height--medium: 1.4;
    --wp--custom--line-height--large: 1.8;
}
```

Note how the camelCased properties were converted into dash separated properties and that they all use two dashes as separators insted of one.

We will revisit these custom styles when we talk about styles in later sections

## A note for people who worked developing and customizing classic themes

If you've worked on classic theme, you may remember adding features to `functions.php` using [add_theme_support](https://developer.wordpress.org/reference/functions/add_theme_support/).

To retain backward compatibility, the block editor retrofits existing add_theme_support declarations in different `theme.json` settings.

The current set of `add_theme_support` declarations and the equivalent `theme.json` settings are:

| add_theme_support | theme.json setting |
|---- | ---- |
|custom-line-height | Set `typography.lineHeight` to true |
| custom-spacing | Set `spacing.padding` to true |
| custom-units | Provide the list of units via `spacing.units`
| disable-custom-colors | Set `color.custom` to false |
| disable-custom-font-sizes | Set `typography.customFontSize` to false. |
| disable-custom-gradients | Set `color.customGradient` to false |
| editor-color-palette | Provide the list of colors via `color.palette` |
| editor-font-sizes | Provide the list of font size via `typography.fontSizes` |
| editor-gradient-presets | Provide the list of gradients via `color.gradients` |

### styles

`theme.json` provides three levels of configurable styles:

* Top level styles where you can set site-wide configurations
* Per block configuration
* Per element configuration for HTML elements.

These styles generate [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties), also known as CSS variables.

#### Top level styles

The top level styles are applied to the entire site by attaching them to the `body` css element, the top level element of a page.

The styles are built hierarchically and require a little bit of explanation.

When you see the name of the variable value, it's made of several parts:

* `--wp` as the prefix used to differentiate the WordPress generated CSS from other CSS you may use on your theme
* `--preset` indicates the type of variable that you're creating
. in this care `preset`
* `--color` indicates which preset category the variable belongs to
* `--primary` shows the name of the item and the subtype of the resource you're using.

```json
"styles": {
    "color": {
      "text": "var(--wp--preset--color--primary)"
  }
}
```

The JSON above produces the following CSS. Since we have already created the custom properties earlier, we don't need to worry about them again here.

WordPress will add the top level style to the body element so the cascade and inheritance of CSS works properly. The idea is that, unless you override them at lower, more specific levels, the top level styles will be applied throughout the site.

```css
body {
    color: var( --wp--preset--color--primary );
}
```

For more information about the CSS Cascade and how it works see [Cascade and inheritance](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Cascade_and_inheritance)

#### Block level styles

The next set of style rules applies to blocks.

The structure of the block level styles is made of two parts:

* The full qualified name of the block that the styles apply to
* A block of one or more styles to apply

When we talk about fully qualified name, we use the prefix that we defined in the name property of the block **and** the slug of the block.

For blocks built into Gutenberg, the fully qualified name is `core` + `name`, like `core/paragraph` or `core/block` as shown in the examples below.

```json
"styles": {
    "blocks": {
      "core/paragraph": {
        "color": {
          "text": "var(--wp--preset--color--secondary)"
      }
    },
    "core/group": {
      "color": {
        "text": "var(--wp--preset--color--tertiary)"
      }
    }
  }
}
```

The previous JSON will producce the following CSS:

```css
p { 
    color: var( --wp--preset--color--secondary );
}

.wp-block-group {
    color: var( --wp--preset--color--tertiary );
}
```

The CSS classes WordPress generates for each block are prefixed with `wp-block-` and the slug of the block.

The `core/paragraph` block opts out from the default behaviour and uses p as a selector.

#### Element styles

In addition to top-level and block-level styles, there's a set of preconfigured elements that can used in both places. The set of available elements and what they map to in CSS:

| element in theme.json | CSS Selector Equivalent |
| :----:  | :----:  |
| link    | a       |
| h1      | h1      |
| h2      | h2      |
| h3      | h3      |
| h4      | h4      |
| h5      | h5      |
| h6      | h6      |

When a style is defined at the root of the styles element it will be applied to the `body` element and then propagate down the CSS cascade, unless it's overriden at a lower level either in styles or by more specific elements.

```json
"styles": {
    "elements": {
      "typography": {
        "fontSize": "var(--wp--preset--font-size--normal)"
    },
    "h1": {
      "typography": {
        "fontSize": "var(--wp--preset--font-size--huge)"
      }
    },
    "h2": {
      "typography": {
        "fontSize": "var(--wp--preset--font-size--big)"
      }
    },
    "h3": {
      "typography": {
        "fontSize": "var(--wp--preset--font-size--medium)"
      }
    }
  },
}
```

The base `fontSize` attribute from the styles block, will be added to the `body` element and will act as the default for all elements that don't have a more specific style rule.

the three levels of headings, `h1`, `h2`, and `h3` will be aplied to corresponding CSS selectors.

```css
body {
  font-size: var( --wp--preset--font-size--normal );
}

h1 {
  font-size: var( --wp--preset--font-size--huge );
}

h2 {
  font-size: var( --wp--preset--font-size--big );
}

h3 {
  font-size: var( --wp--preset--font-size--medium );
}
```

If you use the elements styles inside a block, the result will be slightly different.

The example we are using defines `h2` and `h3` styles inside the `core/group` block.

This means that the values we're changing will only be available inside the `group` block and not elsewhere.

```json
"styles":
  "blocks": {
    "core/group": {
      "elements": {
        "h2": {
          "typography": {
            "fontSize": "var(--wp--preset--font-size--small)"
        }
      },
        "h3": {
          "typography": {
            "fontSize": "var(--wp--preset--font-size--smaller)"
          }
        }
      }
    }
  }
```

The resulting CSS will reflect this restriction by attaching the style to `h2` elements inside the `group` block, represented by the `.wp-block-group` class and not anywhere else.

```css
.wp-block-group h2 {
  font-size: var( --wp--preset--font-size--small );
}
.wp-block-group h3 {
  font-size: var( --wp--preset--font-size--smaller );
}
```

Learning about CSS is a long topic worth a workshop or two,and it is outside the scope of this presentation. Some good starting points for your CSS journey:

* [CSS Basics](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/CSS_basics) from [MDN](https://developer.mozilla.org/)
* [Learn CSS](https://web.dev/learn/css/) from [Web.dev](https://web.dev/)

### customTemplates

**This feature is only available if you have the Gutenberg plugin installed.**

If you have the Gutenberg plugin installed, you can provide additional information about templates that are stored in the theme's `template` folder.

The information you provide about your templates includes:

* `name`: the name of the template. This is required
* `title`: the title of the template. This is required
* `postTypes`: the types of content that the post applies to. The default is `page`

In the example, we define a template called `my-custom-template` and assign it to posts, pages and my-cpt custom post types.

```json
"customTemplates": [
  {
    "name": "my-custom-template",
    "title": "The template title",
    "postTypes": [
      "page",
      "post",
      "my-cpt"
    ]
  }
]
```

### templateParts

**This feature is only available if you have the Gutenberg plugin installed.**

In this section, you can add metadata about the template parts stored in your theme's `parts` folder.

*Behind the scenes, WordPress will use this information to generate template specific variations of the template parts for each supported area (header and footer).*

Each template part declaration has three components:

* **name** the name of the template part. This is required
* **title** the (human readable) title of the template part. This is required
* **area** the area where the part is used. If not included the template will be set to uncategorized by default and will not trigger any template part variations.

```json
"templateParts": [
  {
    "name": "comments",
    "title": "Comments"
  },
  {
    "name": "footer",
    "title": "Footer",
    "area": "Footer"
  },
  {
    "name": "header",
    "title": "Header",
    "area": "Header"
  },
  {
    "name": "main",
    "title": "Main"
  },
  {
    "name": "sidebar-left",
    "title": "Sidebar Left"
  },
  {
    "name": "sidebar-right",
    "title": "Sidebar Right"
  }
]
```

### patterns

----

**Notes:**

**This feature is only available if you have the Gutenberg plugin installed and in themes using theme.json version 2.**

**This feature will only work with patterns in the WordPress pattern directory, not with patterns local to your site.**

----

This section will associate names with patterns from the [WordPress pattern directory](https://wordpress.org/patterns/pattern/).

The `patterns` fields in an array of objects matching the slugs of URLs in the pattern directory.

To declare we're using the [Text and links with image on the side](https://wordpress.org/patterns/pattern/text-and-links-with-image-on-the-side) and [do's and don'ts](https://wordpress.org/patterns/pattern/dos-and-donts) patterns from the directory, we capture the slugs (the string after the final slash on the URL), and add them to the `patterns` array.

```json
  "patterns": [
    "text-and-links-with-image-on-the-side",
    "dos-and-donts"
  ]
```

### Putting It All Together: A Full Working Example

This is a full working demo of the theme.json file. I've set all boolean values set to true, and all string values set to the default values discussed earlier in this presentation.

```json
{
  "$schema": "https://schemas.wp.org/trunk/theme.json",
  "version": 2,
  "settings": {
    "appearanceTools": true,
    "border": {
      "color": true,
      "radius": true,
      "style": true,
      "width": true
    },
    "color": {
      "background": true,
      "custom": true,
      "customDuotone": true,
      "customGradient": true,
      "defaultDuotone": true,
      "defaultGradients": true,
      "defaultPalette": true,
      "link": true,
      "text": true,
      "duotone": [
        {
          "colors": [
            "#000",
            "#FFF"
          ],
          "slug": "black-and-white",
          "name": "Black and White"
        }
      ],
      "gradients": [
        {
          "slug": "blush-bordeaux",
          "gradient": "linear-gradient(135deg,rgb(254,205,165) 0%,rgb(254,45,45) 50%,rgb(107,0,62) 100%)",
          "name": "Blush bordeaux"
        }
      ],
      "palette": [
        {
          "slug": "strong-magenta",
          "color": "#a156b4",
          "name": "Strong magenta"
        },
        {
          "slug": "rebecca-purple",
          "color": "rebeccapurple",
          "name": "Rebecca purple"
        },
        {
          "slug": "link-red",
          "color": "#cd2653",
          "name": "Link red"
        },
        {
          "slug": "very-dark-grey",
          "color": "rgb(131, 12, 8)",
          "name": "Very dark grey"
        }
      ]
    },
    "custom": {},
    "layout": {
      "contentSize": "800px",
      "wideSize": "1000px"
    },
    "spacing": {
      "blockGap": true,
      "padding": true,
      "margin": true,
      "units": [
        "%",
        "px",
        "em",
        "rem",
        "vh",
        "vw"
      ]
    },
    "typography": {
      "customFontSize": true,
      "dropCap": true,
      "fontStyle": true,
      "fontWeight": true,
      "letterSpacing": true,
      "lineHeight": true,
      "textDecoration": true,
      "textTransform": true,
      "fontFamilies": [
        {
          "fontFamily": "-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,Oxygen-Sans,Ubuntu,Cantarell,\"Helvetica Neue\",sans-serif",
          "slug": "system-fonts",
          "name": "System Fonts"
        },
        {
          "fontFamily": "Recursive, sans-serif",
          "name": "Recursive",
          "slug": "recursive",
          "fontFace": [
            {
              "fontFamily": "Recursive",
              "fontWeight": "300 1000",
              "fontStyle": "normal",
              "fontStretch": "normal",
              "fontDisplay": "swap",
              "src": [
                "file:./assets/fonts/recursive-latin-subset.woff2"
              ]
            },
            {
              "provider": "local",
              "fontFamily": "Recursive",
              "fontWeight": "300 1000",
              "fontStyle": "normal",
              "fontStretch": "normal",
              "fontDisplay": "swap",
              "src": [
                "file:./assets/fonts/recursive-latin-subset.woff2"
              ]
            }
          ]
        }
      ],
      "fontSizes": [
        {
          "slug": "tiny",
          "size": "16px",
          "name": "Tiny"
        },
        {
          "slug": "small",
          "size": "18px",
          "name": "Small"
        },
        {
          "name": "Medium",
          "slug": "medium",
          "size": "20px"
        },
        {
          "name": "Normal",
          "slug": "normal",
          "size": "20px"
        },
        {
          "slug": "large",
          "size": "24px",
          "name": "large"
        },
        {
          "slug": "post-title-large",
          "size": "32px",
          "name": "Post Title Large"
        },
        {
          "slug": "extra-large",
          "size": "40px",
          "name": "Extra Large"
        },
        {
          "slug": "gigantic",
          "size": "96px",
          "name": "Gigantic"
        }
      ]
    }
  },
  "styles": {
    "color": {
      "background": "var(--wp--preset--color--white)",
      "text": "var(--wp--preset--color--black)"
    },
    "typography": {
      "fontSize": "var(--wp--preset--font-size--medium)",
      "fontFamily": "var(--wp--preset--font-family--recursive)",
      "lineHeight": "1.4"
    },
    "spacing": {
      "margin": {
        "top": "0px",
        "right": "0px",
        "bottom": "0px",
        "left": "0px"
      }
    },
    "elements": {
      "link": {
        "color": {
          "text": "var(--wp--preset--color--link-red)"
        },
        "typography": {
          "fontWeight": "bold"
        }
      },
      "h1": {
        "color": {
          "text": "var(--wp--preset--color--black)"
        },
        "typography": {
          "fontSize": "var(--wp--preset--font-size--extra-large)"
        }
      },
      "h2": {
        "color": {
          "text": "var(--wp--preset--color--black)"
        },
        "typography": {
          "fontSize": "var(--wp--preset--font-size--large)"
        }
      },
      "h3": {
        "color": {
          "text": "var(--wp--preset--color--black)"
        }
      },
      "h4": {
        "color": {
          "text": "var(--wp--preset--color--black)"
        }
      },
      "h5": {
        "color": {
          "text": "var(--wp--preset--color--black)"
        }
      },
      "h6": {
        "color": {
          "text": "var(--wp--preset--color--black)"
        }
      }
    },
    "blocks": {
      "core/search": {
        "color": {
          "text": "var(--wp--preset--color--black)"
        },
        "typography": {
          "fontSize": "var(--wp--preset--font-size--large)"
        }
      },
      "core/post-title": {
        "color": {
          "text": "var(--wp--preset--color--black)"
        },
        "typography": {
          "fontSize": "var(--wp--preset--font-size--post-title-large)"
        }
      },
      "core/navigation": {
        "color": {
          "text": "var(--wp--preset--color--link-red)"
        }
      },
      "core/paragraph": {
        "color": {
          "text": "var(--wp--preset--color--black)"
        },
        "typography": {
          "fontSize": "var(--wp--preset--font-size--large)"
        }
      },
      "core/archives": {
        "color": {
          "text": "var(--wp--preset--color--black)"
        }
      },
      "core/post-date": {
        "color": {
          "text": "var(--wp--preset--color--black)"
        },
        "typography": {
          "fontSize": "var(--wp--preset--font-size--small)"
        }
      },
      "core/post-terms": {
        "color": {
          "text": "var(--wp--preset--color--black)"
        },
        "typography": {
          "fontSize": "var(--wp--preset--font-size--small)"
        }
      },
      "core/button": {
        "border": {
          "width": "0px",
          "radius": "4px"
        }
      },
      "core/query-pagination": {
        "elements": {
          "link": {
            "color": {
              "background": "var(--wp--preset--color--white)"
            },
            "spacing": {
              "padding": {
                "top": "calc(.667em + 2px)",
                "right": "calc(1.333em + 2px)",
                "bottom": "calc(.667em + 2px)",
                "left": "calc(1.333em + 2px)"
              }
            },
            "border": {
              "radius": "4px"
            }
          }
        }
      },
      "core/post-excerpt": {
        "elements": {
          "link": {
            "color": {
              "background": "var(--wp--preset--color--light-white)"
            },
            "spacing": {
              "padding": {
                "top": "calc(.667em + 2px)",
                "right": "calc(1.333em + 2px)",
                "bottom": "calc(.667em + 2px)",
                "left": "calc(1.333em + 2px)"
              }
            },
            "border": {
              "radius": "4px"
            }
          }
        }
      },
      "core/post-navigation-link": {
        "elements": {
          "link": {
            "color": {
              "background": "var(--wp--preset--color--light-grey)"
            },
            "spacing": {
              "padding": {
                "top": "calc(.667em + 2px)",
                "right": "calc(1.333em + 2px)",
                "bottom": "calc(.667em + 2px)",
                "left": "calc(1.333em + 2px)"
              }
            },
            "border": {
              "radius": "4px"
            }
          }
        }
      },
      "core/latest-posts": {
        "spacing": {
          "padding": {
            "left": "0px"
          }
        }
      },
      "core/latest-comments": {
        "spacing": {
          "padding": {
            "left": "0px"
          }
        }
      },
      "core/post-featured-image": {
        "spacing": {
          "margin": {
            "bottom": "2.5rem"
          }
        }
      },
      "core/template-part": {
        "spacing": {
          "margin": {
            "top": "0px",
            "bottom": "0px"
          }
        }
      }
    }
  },
  "templateParts": [
    {
      "name": "comments",
      "title": "Comments"
    },
    {
      "name": "footer",
      "title": "Footer",
      "area": "Footer"
    },
    {
      "name": "header",
      "title": "Header",
      "area": "Header"
    },
    {
      "name": "main",
      "title": "Main"
    },
    {
      "name": "sidebar-left",
      "title": "Sidebar Left"
    },
    {
      "name": "sidebar-right",
      "title": "Sidebar Right"
    }
  ],
  "customTemplates": [
    {
      "name": "post-sidebar-right",
      "title": "Two columns, right sidebar",
      "postTypes": [
        "page",
        "post"
      ]
    },
    {
      "name": "post-sidebar-left",
      "title": "Two columns, left sidebar",
      "postTypes": [
        "page",
        "post"
      ]
    },
    {
      "name": "page-template-patterns",
      "title": "Template for block pattern layouts",
      "postTypes": [
        "page",
        "post"
      ]
    }
  ],
  "patterns": [
    "text-and-links-with-image-on-the-side",
    "dos-and-donts"
  ]
}
```
