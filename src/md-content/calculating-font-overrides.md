# calculating font overrides

As a followup to the prior post on converting JSON/JSON5 to CSS, we will look at providing font override metrics for fallback fonts and how to use them.

Katie Hempenius from the Chrome team provides a [spreadsheet with the override values](https://github.com/khempenius/font-fallbacks-dataset) for all fonts in the Google Fonts collection.

If we have the font available, we could use tools like [Fontkit](https://www.npmjs.com/package/fontkit) to query the font and get metrics for font fallbacks.

The metrics that we need are:

* ascent
* descent
* lineGap
* UnitsPerEm

And we use them to calculate the override values as follows:

* `ascent-override` = ascent/unitsPerEm
* `descent-override` = descent/unitsPerEm
* `line-gap-override` = line-gap/unitsPerEm
