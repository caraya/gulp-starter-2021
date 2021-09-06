# Creating Custom ESLint Shareable Configs

One of [ESLint](https://eslint.org/)'s strongest points is its plugin system. You can use existing shareable configurations or create your own rules.

I've been meaning to research the process and implement a few rules and a plugin to go with them and think now it's the time to do it.

## Creating a Shareable Configuration

I will model my shareable configuration after Google's ([`eslint-config-google`](https://github.com/google/eslint-config-google)) since it's the one I use the most and the one that has all the rules I follow when writing Javascript.

The idea behind a shareable configuration is to create a Node module, write the rules you want to use and publish it to NPM so others members of the community can use it.

The first step is to initialize the Node module:

```bash
npm init --yes
```

This will prefill the `package.json` file with information from your Git settings. You can always edit it later.

The next step is to write the rules that you want to use and how to handle them (error or warning).

All the rules are wrapped in a `rules` object that lives `module.exports`, this way you can export multiple rules.

```js
module.exports = {
  rules: {}
};
```

Inside the `rules` object you can add as many rules as you want.

```js
module.exports = {
  rules: {
    'curly': ['error', 'multi-line'],
    'guard-for-in': 'error',
    'no-caller': 'error',
    'no-extend-native': 'error',
    'no-extra-bind': 'error',
    'no-invalid-this': 'error',
    'no-multi-spaces': 'error',
    'no-multi-str': 'error',
    'no-new-wrappers': 'error',
    'no-throw-literal': 'error',
    'no-with': 'error',
    'prefer-promise-reject-errors': 'error',
  }
}
```

If you've created your own plugin, you can add it to the `rules` object, assuming you've loaded it in your `.eslintrc` configuration file.

## Links and References

* [Shareable Configs](https://eslint.org/docs/developer-guide/shareable-configs)
* [Working with Rules](https://eslint.org/docs/developer-guide/working-with-rules)
* [Selectors](https://eslint.org/docs/developer-guide/selectors)
* [AST selectors rule](https://dev.to/mlennox/ast-selectors-rule-286i)
* [How To Write Your First ESLint Plugin](https://dev.to/spukas/how-to-write-your-first-eslint-plugin-145)
* [Yeoman](https://yeoman.io)
* [Yeoman ESLint generator](https://www.npmjs.com/package/generator-eslint)
