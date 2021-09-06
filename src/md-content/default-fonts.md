# Default font stack

Using the default fonts for the operating system saves bandwidth (we don't have to download the font since it's already installed in the system) and improves performance (fewer assets to download) but it requires testing in all the platforms you're targetting.

These are not the browsers you're targetting, those may have ther issues when working with system fonts (particularly Chrome on Mac that needs a special declaration for the system font).

The browser looks for each successive font, and will use the first font that it finds either on the system or defined in CSS.

The font-family declaration looks like this:

```css
body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', Helvetica, Arial, sans-serif;
}
```

Each of the fonts are explained below:

* `system-ui` is the new family defined in Fonts Module level 4 to represent the native OS font family
* `-apple-system` is San Francisco, used on iOS and macOS (not Chrome however)
* `BlinkMacSystemFont` is San Francisco, used on Chrome for macOS
* `Segoe UI` is used on Windows 10
* `Roboto` is used on Android
* `Oxygen-Sans` is used on GNU+Linux
* `Ubuntu` is used on Linux
* `"Helvetica Neue"` and `Helvetica` is used on macOS 10.10 and below (wrapped in quotes because it has a space)
* `Arial` is a font widely supported by all operating systems
* `sans-serif` is the fallback sans-serif font if none of the other fonts are supported

### Caveats and warnings

If you've downloaded any of the fonts (particularly Roboto and Ubuntu) in browsers that don't use them as default they may produce unexpected results.

If working with Oxygen Sans you need to pay special attention. Google Fonts offers a different font with the name Oxygen (both serif and sans) so, if you download it, you may get unexpected results.

## System Fonts

<table>
  <thead>
  <tr>
  <th>OS</th>
  <th>Version</th>
  <th>System Font</th>
  </tr>
  </thead>
  <tbody>
    <tr>
    <td>Mac OS X</td>
    <td>El Capitan, Sierra and High Sierra</td>
    <td><a href="https://github.com/supermarin/YosemiteSanFranciscoFont">San Francisco</a></td>
    </tr>
    <tr>
    <td>Mac OS X</td>
    <td>Yosemite</td>
    <td><a href="https://www.myfonts.com/fonts/linotype/neue-helvetica/">Helvetica Neue</a></td>
    </tr>
    <tr>
    <td>Mac OS X</td>
    <td>Mavericks</td>
    <td><a href="https://en.wikipedia.org/wiki/Lucida_Grande">Lucida Grande</a></td>
    </tr>
    <tr>
      <td>Windows</td>
      <td>Vista</td>
      <td><a href="http://www.microsoft.com/typography/Fonts/family.aspx?FID=331">Segoe UI</a></td>
    </tr>
    <tr>
      <td>Windows</td>
      <td>XP</td>
      <td><a href="http://www.microsoft.com/typography/fonts/family.aspx?FID=19">Tahoma</a></td>
    </tr>
    <tr>
      <td>Windows</td>
      <td>3.1 to ME</td>
      <td><a href="http://www.microsoft.com/typography/fonts/family.aspx?FID=244">Microsoft Sans Serif</a></td>
    </tr>
    <tr>
      <td>Android</td>
      <td>Ice Cream Sandwich (4.0)+</td>
      <td><a href="https://fonts.google.com/specimen/Roboto">Roboto</a></td>
    </tr>
    <tr>
      <td>Android</td>
      <td>Cupcake (1.5) to Honeycomb (3.2.6)</td>
      <td><a href="https://fonts.google.com/specimen/Droid+Sans">Droid Sans</a></td>
    </tr>
    <tr>
      <td>Ubuntu</td>
      <td>All versions</td>
      <td><a href="http://font.ubuntu.com/">Ubuntu</a></td>
    </tr>
  </tbody>
</table>

## Links and Resources

* Specs
  * [CSS Fonts Module Level 3](https://drafts.csswg.org/css-fonts-3/)
  * [CSS Fonts Module Level 4](https://drafts.csswg.org/css-fonts-4/)
* Articles
  * [System Font Stack](https://css-tricks.com/snippets/css/system-font-stack/)
  * [System Fonts in CSS](https://furbo.org/2018/03/28/system-fonts-in-css/) (furbo.org)
  * [Using UI System Fonts In Web Design: A Quick Practical Guide](https://www.smashingmagazine.com/2015/11/using-system-ui-fonts-practical-guide/) (Smashing Magazine)
  * [System Font CSS Code](https://github.com/jonathantneal/system-font-css/blob/gh-pages/system-font.css)
  * [OS Specific Fonts in CSS](https://css-tricks.com/os-specific-fonts-css/)
  * [system-ui](https://drafts.csswg.org/css-fonts-4/#system-ui-def) font family definition, part of CSS Fonts Level 4
  * [Implementing system fonts on Booking.com — A lesson learned](https://booking.design/implementing-system-fonts-on-booking-com-a-lesson-learned-bdc984df627f)
