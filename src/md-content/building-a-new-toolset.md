# Building a new toolset

I had first thought about adopting and modifying Kent C. Dodds [kcd-scripts](https://www.npmjs.com/package/kcd-scripts) and hade made a first pass at it. But it broke when I made custom changes to acommodate my needs beyond the package tools.

Rather than build something using CLI tools, the goal for this project is to modify `kcd-scripts` as I try to understand the code and what's the best way to expand the package and remove functionality I don't use in my projects.

## Ideas for packages

These are the tools that I want to incorporate into my toolset.

### WordPress related

These are the WordPress related tools that I want to incorporate into my toolset. While they can be run using [npx](https://www.npmjs.com/package/npx) I prefer to run them locally.

| Tool | Description / Purpose | Status |
| ---- | ----------- | ------ |
| [@wordpress/env](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/) | Set a local WordPress development environment for testing plugins and themes | &#9989;  |
| [@wordpress/create-block](https://www.npmjs.com/package/@wordpress/create-block) | Create plugins for Gutenberg blocks | |

### Tools

These are the tools that I want to include in the toolset. Some of these were part of kcd-scripts and some of them are my own

| Tool | Description | Status |
| ---- | ----------- | ------ |
| [Jest](https://jestjs.io/) | A Javascript testing infrastructure | &#9989; |
| [Eslint](https://eslint.org/) | Includes the [ESLint shareable config](https://github.com/google/eslint-config-google) for the Google JavaScript style guide | &#9989; |
| [Babel](https://babeljs.io/) | Javascript transpiler | &#9989;|
| [Prettier](https://prettier.io/)| Code Formatter | &#9989; |
| [PostCSS](https://postcss.org/) | CSS Pre Processor | |
| [SASS/SCSS](https://sass-lang.com/) | CSS Pre Processor | |
| [Markdownlint](https://github.com/markdownlint/markdownlint#readme) | Markdown Linter | &#9989; |
| [Docker Desktop](https://www.docker.com/products/docker-desktop) | Used by wp-env and other tools | |
| [Playwright](https://playwright.dev) | Cross Platform browser emulation tool.<br><br>Because it works with multiple browser, the download size for this tool may be prohibitive | |
| [Typescript](https://www.typescriptlang.org/) | If the project uses [Typescript](https://www.typescriptlang.org/), switch the configuration to use a Typescript configuration or build one from scratch | &#9989; |
| [React](https://reactjs.org/) | If the project uses React or Preact, switch the configuration to use a React-based configuration or build one from scratch | &#9989; |
| [Preact](https://preactjs.com/) | If the project uses Preact or Preact, switch the configuration to use a React-based configuration or build one from scratch | |
| [lint-staged](https://www.npmjs.com/package/lint-staged) | Will create precommit hooks to run our code against before comitting. It will also install [husky](https://typicode.github.io/husky/#/) to make working with precommit hooks easier | &#9989; |

## Building the package

The first script that we'll look at is the index script (`index.js`). This till check that we're using a supported version of Node and then runs the script runner.

The script runner script (`run-script`) will run the other parts of the package.

It will parse flags and arguments and pass them to the script that we want to run.

It will also account for issues in the cross-spawn library and will normalize paths between Unix-like systems and Windows.

Once we have that in place we can look at individual scripts to run the tools we want.

I will pick one tool as an example, most tools work the same.

```js
const path = require('path');
const spawn = require('cross-spawn');
const yargsParser = require('yargs-parser');
const {resolveBin, hasFile} = require('../utils');
```

```js
let args = process.argv.slice(2);
const here = (p) => path.join(__dirname, p);
const hereRelative = (p) => here(p).replace(process.cwd(), '.');
const parsedArgs = yargsParser(args);
```

```js
const useBuiltinConfig =
  !args.includes('--config') &&
  !hasFile('.markdownlint.json');

const config = useBuiltinConfig ?
  ['--config', hereRelative('../config/.markdownlint.json')] :
  [];
```

```js
const defaultExtensions = 'md,mdx,markdown';
const ext = args.includes('--ext') ? [] : ['--ext', defaultExtensions];
const extensions = (parsedArgs.ext || defaultExtensions).split(',');
```

```js
const filesGiven = parsedArgs._.length > 0;

const filesToApply = filesGiven ? [] : ['.'];

if (filesGiven) {
  args = args.filter(
      (a) => !parsedArgs._.includes(a) || extensions.some((e) => a.endsWith(e)),
  );
}

const result = spawn.sync(
    resolveBin('markdownlint'),
    [...config, ...ext, ...args, ...filesToApply],
    {stdio: 'inherit'},
);

process.exit(result.status);
```
