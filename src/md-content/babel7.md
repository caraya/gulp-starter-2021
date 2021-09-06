## Babel 7 and beyond

After a long time, [Babel 7 has been released](https://babeljs.io/blog/2018/08/27/7.0.0). If you use Babel at all, it's important to do the following things to make sure you're good to go:

* Make sure that the project's package.json file points to the right version of Babel
* If you use yearly presets (ES2015 / ES2017) or the latest preset change to using preset-env
  * The yearly presets have been deprecated and will be removed in future versions of Babel
  * Preset-env produces a smaller transpiled file by only transpiling what's needed for your target browsers
* Note that all packages for version 7 have been [scoped](https://docs.npmjs.com/misc/scope). This will require you to rename your Babel packages
  * `babel-core` is now `@babel/core`
  * `babel-cli` changed to `@babel/cli`
  * Safe bet is to replace `babel-` with `@babel/`

To make sure that you didn't miss anything, you can run [babel-upgrade](https://github.com/babel/babel-upgrade) which will automate some of the tasks we discussed... it helps knowing what the automated tool does before the tool does it and, potentially, break things in unexpected ways.

You have two way to install `babel-upgrade`

* Install globally and run

```bash
npm install babel-upgrade -g
babel-upgrade --write
```

* Install it as dev-dependency and run it with npx (NPM 5.2 and later)

```bash
npm i -D babel-upgrade
npx babel-upgrade --write
```

See babel-upgrade's [README](https://github.com/babel/babel-upgrade/blob/master/readme.md) for more detailed instructions.
