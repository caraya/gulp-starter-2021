# Alternate and User Style Sheets

We normally work with the stylesheets we develop for the content we create. This is one of the style sheets available and that interact in the CSS cascade:

- The browser has a basic style sheet that gives a default style to any document. These style sheets are named user-agent style sheets
- The author of the Web page defines styles for the document. These are the most common style sheets
- The reader, the user of the browser, may have a custom style sheet to tailor its experience

The user-agent is outside our control and it should stay that way. It's the browser's default that will apply to all content.

Alaternative style sheets allow for theming without having to write additional code to switch styles. But you still have to create the themes.

Reader style sheets allow end-users to override user-agent and alternate style sheets to acommodate their needs and provide different styles to do so.

In this post we'll talk about alternate and reader style sheets.

## Alternate Stylesheets

[Alternate style sheets](https://developer.mozilla.org/en-US/docs/Web/CSS/Alternative_style_sheets) give you a way to deploy multiple stylesheets for the same app or site.

As far as I know only Firefox supports alternate stylesheets using the syntax below.

In this example we have four `link` elements. The first one will always run and will not show in your page styles menu.

The next three are the ones for the actual page styles. Pay attention to the `rel` attribute in the links, that's what makes the magic happens.

The first stylesheet, the one with the `rel="stylesheet"` attribute is the default stylesheet that will load when the page is first loadded.

The other two stylesheets, with `rel="alternate stylesheet"` attribute are optional and the user can load them on demand. One of these alternate stylesheets could be a high contrast version of the site or one with a different color scheme for people whom bright colors are a problem.

```html
<link href="reset.css" rel="stylesheet" type="text/css">

<link href="default.css" rel="stylesheet" type="text/css" title="Default Style">
<link href="fancy.css" rel="alternate stylesheet" type="text/css" title="Fancy">
<link href="basic.css" rel="alternate stylesheet" type="text/css" title="Basic">
```

Firefox (screenshot from Firefox 57.0.1) has a menu under `View` that gives you access to any alternate style sheet available for the page.

<figure>
  <img src="images/alternate-stylesheets-firefox.png">
  <figcaption>Accessing Alternate Stylesheets In Firefox 57 </figcaption>
</figure>

### User Stylesheets

So far we've only dealt with Style sheets we create as part of the website. If we choose to provide high contrast or no background image stylesheets, it's still our best guess as to what will users with disabilities need from our sites/apps.  Because of this we will never be able to cover all bases.

Users who need them probably have created custom stylesheets that will override a site's styles with rules that make more sense for their disabilities. In the case of color or contrast they may completely remove background images or make background colors solid rather than semi transparents or use fonts specially designed for their needs.

Unfortunately, only Firefox (both pre- and post-Quantum) supports adding reader style sheets directly but we can target other browsers, Chrome and Safari with Extensions that will accomplish the same goal.

- Adding User Style Sheets To Browsers
  - [Microsoft Edge](https://mcmw.abilitynet.org.uk/microsoft-edge-using-your-own-stylesheet/)
- Browser Extensions
  - [Stylish - Custom themes for any website](https://chrome.google.com/webstore/detail/stylish-custom-themes-for/fjnbnpbmkenffdnngjfgmeleoegfcffe) **Chrome**
  - [User Style Manager](https://addons.mozilla.org/en-US/firefox/addon/user-style-manager/) **Firefox Before 57.0**
