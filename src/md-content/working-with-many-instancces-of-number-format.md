# Formating numbers with Javascript

When working with numbers on Javascript I've most frequently seen `toLocaleString` as the solution to format numbers.

The following example uses US Dollars as the currency and `accounting` as the currency sign, it will display negative numbers in parenthesis.

```js
const n1 = 199874;
const n2 = -199874.

console.log(n1.toLocaleString('en-US', {
  style: 'currency',
  currency: 'USD',
  currencySign: 'accounting',
}));

console.log(n2.toLocaleString('en-US', {
  style: 'currency',
  currency: 'USD',
  currencySign: 'accounting',
}));
```

Sadly if we work with more than a few numbers it gets cumbersome as we have to add the `toLocaleString` object to the number with all its children.

We may be able to shorten it some if we move the options to an object, and then reference the object wherever we need to format numbers.

```js
const n1 = 199874;
const n2 = -199874;

const enProperties = {
  style: "currency",
  currency: "USD",
  currencySign: "accounting"
};

console.log(n1.toLocaleString("en-US", enProperties));

console.log(n2.toLocaleString("en-US", enProperties));
```

```js
const usCurrencyFormat = new Intl.NumberFormat('en-US', {
  style: "currency",
  currency: "USD",
  currencySign: "accounting",
});

console.log(usCurrencyFormat.format(12345.6789));
// $12,345.68

console.log(usCurrencyFormat.format(-12345.67891));
// ($12,345.68)
```

This is awesome but it has its drawbacks. The `Intl` API is part of the most recent version of ECMAScript (2020) and, as such, browser support is limited; some aspects of the are not supported in Safari.

Fortunately there are polyfills to cover this until support improves.

[Format.js](https://formatjs.io/) provides a series of libraries to support i18n on your applications. The want that we want to work with is `@fotmatjs/intl-numberformat/`. This will provide support for both number formatting libraries discussed in the post for older browsers.

```bash
npm install @formatjs/intl-numberformat
```

Then we can use either `toLocaleString` or `Int.numberFormat` in our code without having to worry about native support.

The [codesandbox](https://codesandbox.io/) below is forked and modified from the original by [Elijah Manor](https://elijahmanor.com/format-js-numbers).

<iframe src="https://codesandbox.io/embed/zealous-flower-h3vjv?fontsize=14&hidenavigation=1&module=%2Fsrc%2Findex.js&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="zealous-flower-h3vjv"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
