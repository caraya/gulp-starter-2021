# theme.json lesson plan

## Objectives

Participants will be able to:

* Explain the purpose of theme.json (what the file does)
* Understand the different parts of theme.json and explain their purpose (what each part does)
* build a basic theme.json file for their block theme

## Setting up the instructor machine

Before you start the lesson, you will need the following:

* A local installation of WordPress
* A block-enabled theme. Some examples:
  * [TwentyTwentyTwo](https://wordpress.org/themes/twentytwentytwo/) **Recommended and bundled with WordPress**
  * [Archeo](https://wordpress.org/themes/archeo/)
  * [Armando](https://wordpress.org/themes/armando/)
* The latest version of the Gutenberg Plugin
  * Theme.json runs fine without the plugin but some features may not work
  * The content will note if a features requires Gutenberg and the version the feature was introduced in
* Data to populate the theme. Choose from the following:
  * Existing data
  * A copy of the [WordPress Theme Unit Test](https://codex.wordpress.org/Theme_Unit_Test) data
  * A copy of the [gutenberg-theme-data](https://github.com/Automattic/theme-tools/tree/master/gutenberg-test-data)
  * Look at [How to add demo content in WordPress](https://learn.wordpress.org/lesson-plan/how-to-add-demo-content-in-wordpress/) for more information on how to add demo content to your WordPress site.
* A code editor. Possible options:
  * [VS Code](https://code.visualstudio.com/)
  * [Atom](https://atom.io/)
  * [Webstorm](https://www.jetbrains.com/webstorm/)
  * [Sublime Text](https://www.sublimetext.com/)
  * [Brackets](https://brackets.io/)

## Instructor Notes

* Theme.json is large enough that it may need more than one session to cover in its entirety
* Depending on the audience, you may want to work through each individual section and break for questions.
* This lesson plan deals only with `theme.json` as it works with block themes but there is a note on how theme.json handles some older declarations using add_theme_support()

## Content Outline

* Participants Introduction
  * Where are you in your Gutenberg journey?
* Introduction
  * What is theme.json?
  * What does it do?
  * About JSON and JSON requirements
* theme.json structure
  * version
  * settings
    * Presets
    * Custom
  * Styles
    * Top-level
    * Block-level
    * Elements
  * Typography
    * fontFaces (new in Gutenberg 12.8)
  * customTemplates
  * templateParts
  * patterns
* Putting it all together
  * Building a basic theme.json configuration file

----

## Introduction

`Theme.json` allows you customize your WordPress theme from one central location.

It takes over `functions.php` for most of a theme's configuration settings and provides new functionality that may not have a direct equivalent in `functions.php`.

While theme.json will work on any WordPress theme, for these lessons we'll concentrate on block-based themes.

See [Using theme.json in a classic theme](https://mkaz.blog/wordpress/using-theme-json-in-a-classic-theme/) for more information about theme.json as applied to classic themes.

### About JSON and JSON requirements

`theme.json` is a JSON file and, as such, presents some things that may not be familiar if you haven't worked with the format before.

All strings in JSON must be enclosed in double quotes. This is not legal and will be flagged as an error.

```json
  'version': 2
```

Boolean values (true or false) and numbers must not be quoted.

Even a single misplaced comma or colon can cause a JSON file to not work. You should be careful to validate thw file you're creating with tools like [JSONLint](https://jsonlint.com/) or CodeBeautify's [JSON Validator](https://codebeautify.org/jsonvalidator).

For a good introduction to working with JSON, see [Working with JSON](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON) at MDN.

## Necessary tools

In order to use `theme.json`, you will need the [latest version of WordPress](https://wordpress.org/download/) and the [latest version of the Gutenberg Plugin](https://wordpress.org/plugins/gutenberg/).

We use Gutenberg to take advantage of new features that are under development outside of WordPress core, and will eventually be merged back into core.

## `theme.json` structure

The structure of `theme.json` follows the JSON conventions as defined in [ECMA-404](https://www.ecma-international.org/publications-and-standards/standards/ecma-404/).

An empty `theme.json` file looks like this:

```json
{
  "$schema": "https://schemas.wp.org/trunk/theme.json",         
  "version": 2,
  "settings": {},
  "styles": {},
  "customTemplates": {},
  "templateParts": {}
}
```

We will look at each major section of the theme.json file in turn.

### $schema

The location of the [json schema](https://json-schema.org/) for the theme.json file.

Adding this string will allow you to validate the theme.json against the schema.

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

If you set any value to false, the attribute will not be shown to the administrator working on your theme.

```json
"settings": {
  "appearanceTools": true,
  "border": {
    "color": true,
    "radius": true,
    "style": true,
    "width": true
  },
```

The color block combines both controls for what UI attributes will appear in the editor and what values will be available to the user.

`duotones`, `gradients` and `colors` provide additional values for the Gutenberg editor to use in additions to whatever defaults may be available.

You can disable either the custom values (`customGradient` and `customDuotone`) or the default values (`defaultDuotone`, `defaultGradient` or `defaultPalette`) by setting them to false in the configuration.

I would suggest you remove the default values and only leave the `color` array in place if you have branding requirements or have a prefered color scheme for your site.

When choosing colors you should always consider accessibility, particularly color blindness and contrast between your text and background colors.

```json
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
```

The `duotone` array uses a common pattern that we'll see moving forward:

* The slug, the machine-readable name of the item
  * Usually lowercase, camel-cased if it has more than one word, the second and subsequent words are capitalized
* The (human-readable) label
  * Can be capitalized as needed
  * Can have spaces in it
  * This will be shows to the user in the UI
* One more more values for the item
  * In the case of `duotone` it is an array of two colors, representing the color for highlights and shadows

**Because duotone filters are high specialized, It is strongly recommended that you test the duotone colors that you add to your theme since the use of colors may have accessibility implications.**

`gradients` use a similar schema:

* The slug, the machine-readable name of the item
* The (human-readable) name
* The gradient, indicating the CSS gradient that you want to use. The possible options are:
  * [Linear Gradients](https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient)
  * [Radial Gradients](https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/radial-gradient)
  * [Conic Gradient](https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/conic-gradient)

Most of the time you will use linear gradients with default settings that you can modify in the editor's UI when you enable gradients for the theme.

If you don't plan to add duotone pairs and gradients, you can remove your theme settings for them.

```json
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
    ],
```

The `palette` object presents a list of colors that you want to be available in the editor's UI.

You can present the colors in any color format supported by CSS. The example block presents three of the most common formats:

* `Strong Magenta` is written using a six-digit hexadecimal number format where every pair of digits represents a color channel (red, green, blue)
* `Rebecca Purple` is written as a CSS [named color](https://www.w3.org/TR/css-color-4/#named-colors)
* `Very Dark Grey` is written using an [RGB](https://www.w3.org/TR/css-color-4/#rgb-functions) function that indicate the percentage of red, green and blue in the color

```json
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
  },
```

----

**IMPORTANT:**

* **Do not use color as the only way to convey information. For example: If you want to convey success, use text or another way to indicate success in addition to the color green.**
* **This is also important from a cultural standpoint. Not everyone using your site may understand your use of green or any other color the way you do.**

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

You control the display for t he following typographical items

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
        "fontFamily": "-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,Oxygen-Sans,Ubuntu,Cantarell,\"Helvetica Neue\",sans-serif",
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
--wp--custom--<variable-name>: value
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

{{ NOTE TO SELF: RESEARCH IF THIS WORKS FOR CUSTOM BLOCKS TOO OR ONLY CORE BLOCKS. HAVEN'T FOUND INFORMATION ABOUT THIS WORKING WITH CUSTOM BLOCKS YET }}

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

{{ NOTE TO SELF: RESEARCH IF THE CLOSED SET MENTIONED IN DOCS AND LISTED BELOW IS CORRECT OR IF WE CAN USE OTHER ELEMENTS }}

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

If you have the Gutenberg plugin installed, you can add custom template that are present in the theme's templates folder to `theme.json` to indicate what types kinds of content can use the template.

The three children of `customTemplates` are:

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

{{
  NOTE TO SELF: THIS NEEDS FURTHER RESEARCH TO FIGURE OUT IF THIS WILL WORK WITH CUSTOM TEMPLATES CREATED IN THE THEME EDITOR OR ONLY THE DEFAULT TEMPLATES. I'M RUNNING WITH THE ASSUMPTION ONLY CORE TEMPLATES WILL WORK
}}

**This feature is only available if you have the Gutenberg plugin installed.**

Within this field themes can list the template parts present in the parts folder associated with a given template.

For example, for a template part named `my-template-part.html`, the theme.json can declare the area for the template part responsible for rendering the corresponding block variation in the editor.

Defining this area term in the json will allow the setting to persist across all uses of that template part entity, as opposed to a block attribute that would only affect one block. Defining area as a block attribute is not recommended as this is only used ‘behind the scenes’ to aid in bridging the gap between placeholder flows and entity creation.

Currently block variations exist for “header” and “footer” values of the area term, any other values and template parts not defined in the json will default to the general template part block. Variations will be denoted by specific icons within the editor’s interface, will default to the corresponding semantic HTML element for the wrapper (this can also be overridden by the tagName attribute set on the template part block), and will contextualize the template part allowing more custom flows in future editor improvements.

name: mandatory.
title: optional, translatable.
area: optional, will be set to uncategorized by default and trigger no block variation.

```json
  "templateParts": [
    {
      "name": "my-template-part",
      "title": "Header",
      "area": "header"
    }
  ]
```

### patterns

**This feature is only available if you have the Gutenberg plugin installed.**

### Putting it all together

Building a basic theme.json configuration file
