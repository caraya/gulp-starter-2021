# Using JSON5 instead of JSON

The more I work with JSON in WordPress theme blocks, the more frustrated I become even though I understand why things are the way they are.

JSON has become the default data interchange program for the web. It is not without its issues.

Since it's meant mostly for machine to machine communication it is unforgiving of parsing and syntax errors.

However, eventhough it is meant for machine communication, JSON is still written by hand by one or more humans.

As such, I find the ideas in [Suggested improvements to JSON](http://bolinfest.com/essays/json.html) to match my thinking on the subject. They can be summarized as:

* Lack of support for comments
* All keys and string values must be quoted
* The JSON specification is ES3 compliant and, as such, optimizations like adding trailing commas at the end of object and array literals treated as errors

There are extensions to JSON that address these pain points.

This post will discuss the differences between JSON5 and JSON and how to convert JSON5 documents into CSS Variables and design tokens.

## Differences, Advantages and Drawbacks between JSON5 and JSON

JSON5 is fully compatible with JSON, all valid JSON files are also valid JSON5. The reverse is not true; depending on how you write JSON5, they may or may not be valid JSON files.

For the purposes of this post, I will concentrate on what, to me, are developer experiences enhancements:

* JSON5 allows single and multiline C-style comments
* JSON5 allows unquoted key names
* JSON5 allows dangling commas in objects and arrays

The biggest drawback is that browsers or Node don't have built in support for JSON5 so, if we want to use it, we need to load a third party module with the corresponding overhead.

This is not as much of a concern when working on a command-line tool like the converter but it is something to keep in mind.

## Converting JSON to CSS

Before we can convert JSON5 to CSS variables we need to figure out the structure of the JSON5 document that we'll start from.

We can then write the conversion script.

### Creating the JSON5 file

I'm using some of the features

### Creating the conversion script

This file uses ESM modules so you need to change the extension to `mjs` or add `"type": "module"` to your package.json.

I've broken down the script into sections so it's easier to discuss and work through some sections.

We first import the modules that we want to use. The modules using the `node:` protocol are built into Node.

The other three serve different purposes:

* [json5](https://json5.org/) parses the JSON5 input
* [color.js](https://colorjs.io/) convert hex colors to one or more formats
* We use the [kebabCase](https://lodash.com/docs/4.17.15#kebabCase) function from [lodash](https://lodash.com/) to convert camel case values into kebab-case

```js
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as url from 'node:url';
import json5 from 'json5';
import Color from 'colorjs.io';
import _ from 'lodash';
```

Working with ES modules in Node means we don't have direct access to the  `__filename` and `__dirname` variables like we would when working with CommonJS modules. So we create our own using other Node built-in methods.

```js
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
```

Next we open the json5
file and parse the content using json5's `parse` method.

We use `readFileSync` to make sure that the file is fully read and parsed before we move forward.

```js
const dirPath = path.join(__dirname, '/data/styles.json5');
const fileContent = fs.readFileSync(dirPath, 'utf-8');
const parsed = json5.parse(fileContent)
```

The four empty arrays we create in this section will receive the data from the functions that create the CSS variables later.

```js
const colorMap = [];
const variableMap = [];
const layoutMap = [];
const typographyMap = [];
```

`convertColor` uses [color.js](https://colorjs.io) to convert the colors to different color spaces supported in the CSS [Color Level 4 specification](https://www.w3.org/TR/css-color-4/)

The function takes two parameters, a name and a color.

We use the value of color to create a new color using color.js' `Color` constructor and append an empty string to conveert the color into a string.

We then build the CSS variable using a [template strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) with the name and the converted color parsed as a string. The full template string is then pushed to the `colorMap` array.

The function converts the color to [lch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals). You can duplicate the string literal and convert to any of the [color spaces supported by color.js](https://colorjs.io/docs/spaces.html).

I've left three examples commented as show of how to convert to different color spaces.

```js
function convertColor(name, color) {
  let myColor = new Color(color);
  myColor + "";
  // colorMap.push(`--rgb-${name}: ${myColor.to("srgb").toString()};\n`)
  // colorMap.push(`--p3-${name}: ${myColor.to("p3").toString({ precision: 3 })};\n`);
  // colorMap.push(`--oklab-${name}: ${myColor.to("oklab").toString({ precision: 3 })};\n`);
  colorMap.push(`--lch-${name}: ${myColor.to("lch").toString({ precision: 3 })};\n`)
}
```

`convertVariables`, `convertLayout` and `convertTypography` perform the same task, they take a name and a value and then use a string literal to create the CSS variable.

They use Lodash's [kebabCase](https://lodash.com/docs/4.17.15#kebabCase) method to convert the names into kebab-case.

```js
function convertVariables(name, value) {
  variableMap.push(`--${_.kebabCase(name)}: ${value};\n`)
}

function convertLayout(name, value) {
  layoutMap.push(`--${_.kebabCase(name)}: ${value};\n`)
}

function convertTypography(name, value) {
  typographyMap.push(`--${_.kebabCase(name)}: ${value};\n`)
}
```

We then process the data. We create a list of items in each section and then call the appropriate function passing it the two parameters that will contain the name of the item and its value.

```js
const colorList = Object.entries(parsed.styles.colors)
colorList.forEach((color) => {
  convertColor(color[0], color[1]);
})

const variableList = Object.entries(parsed.styles.variables)
variableList.forEach((variable) => {
  convertVariables(variable[0], variable[1])
})

const layoutList = Object.entries(parsed.styles.layout);
layoutList.forEach((layout) => {
  convertLayout(layout[0], layout[1])
})
```

For the typography section we need to make a few additions.

We create two lists, one with all the elements in the typography section and one with all the entries under named instances.

Once we process the first list, we pop the last item, this will be an empty `namedInstances` item.

We then process the named instances and push them into the same typography array.

```js
const typograhpyList = Object.entries(parsed.styles.typography)
const namedInstances = Object.entries(parsed.styles.typography.namedInstances)
typograhpyList.forEach((entry) => {
  convertTypography(entry[0], entry[1])
  // removes named instances item from array
  typograhpyList.pop();
})
namedInstances.forEach((instance) => {
  convertTypography(instance[0], instance[1])
})
```

We will use the `header` and `footer` to build the file on the following section.

The `header` constant holds a header comment and the opening for thr `:root` CSS element.

The `footer` element closes any CSS element that we have open.

```js
const header = `/*
Stylesheet with Token variables. Generated as part of an experiment 
to convert JSON5 to CSS variables

@author Carlos Araya
*/

:root {`;

const footer = `
}`;
```

The final step is to actually write the content to file.

We first use `writeFileSync` to create the file and assign the content of the `header` variable.

We then append the different blocks, including the content of the `footer` variable.

We use `writeFileSync` and `appendFileSync` to make sure that the content of one block is completed before the script processes the next block.

```js
const targetFile = 'styles.css'

fs.writeFileSync(targetFile, header, { encoding: "utf-8" })
fs.appendFileSync(targetFile, variableMap.join('').toString(), {encoding: "utf-8"})
fs.appendFileSync(targetFile, colorMap.join('').toString(), {encoding: "utf-8"})
fs.appendFileSync(targetFile, layoutMap.join('').toString(), {encoding: "utf-8"})
fs.appendFileSync(targetFile, typographyMap.join('').toString(), {encoding: "utf-8"})
fs.appendFileSync(targetFile, footer, { encoding: "utf-8" })
```

We've built a set of variables and assigned it to the `:root` CSS variable.

The exercise in this post is a starting point. Some future enhancement ideas:

* Convert to SCSS and to JS Objects to use in CSS-in-JS solutions
* Use commander or any other Node CLI to create a full fledged application
* Explore what it would take to create tokens for Android and other packages
