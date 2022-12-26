# Configuring Typescript for new projects

I've finally given into working with TypeScript despite some of my misgivings about the technology.

My misgivings include:

* The need to set up a transpiler toolchain
* You can't run the code directly in the browser
* You have to decide on what version of Javascript to transpile the code to. This decision will be hardcoded in the Typescript configuration file

We'll look at setup and configuration of a Typescript project, along with some gotchas I've learned along the way.

These instructions assume you've initialized a `package.json` file.

## Installing Typescript

You have two options to configure Typescript. You can install it globally to work on any project and any directory.

To install Typescript globally run the following command.

```bash
npm install -g typescript
```

You can also install Typescript on individual projects. This is preferred as you can work with different versions of Typescript for each project.

The command for project installation uses the `-D` flag to install it as a developer dependency.

```bash
npm install -D typescript
```

## Adding scripts to `package.json`

The next step is to add the commands to run Typescript-related commands.

The first command, `tsc`, will just run TSC to compile all TSC files in the project. It will exit when compilation is complete.

The second command, `watch` sets the Typescript compiler's watch mode. It will compile all files and then wait for your to make changes at which point will automatically run the compilation process again.

```json
{
  "scripts": {
    "tsc": "tsc",
    "watch": "tsc -w"
  }
}
```

To run the commands use `npm run tsc` and `npm run watch`.

## Configuring Typescript

So far, we've installed Typescript and set up the commands to run Typescript in the project's `package.json` file.

We now have to configure Typescript. Rather than manually type the configuration, I'll leverage Typescript to generate one for me.

```bash
npm run tsc --init
```

This will generate a `tsconfig.json` file with all the possible settings for your project.

We will not cover all the possible settings. You can do that by inspecting the generated files and the comment after each setting or by checking the [TSConfig Reference](https://www.typescriptlang.org/tsconfig) documentation.

The `target` attribute indicates the version of Javascript that we want to transpile our code to.

The `lib` attribute is an array of the libraries that we want to use in the Typescript project.

I also include the `DOM` and `WebWorker` libraries since most of the work I do is web-related and I want to use web workers in future projects so I better add it now.

```json
"target": "ES2017",
"lib": [
  "ES2017",
  "DOM",
  "WebWorker"
]
```

I chose ES2017 my target because it provides a sane set of features that work in at least 90% of browsers today.

According to Houssein Djirdeh and Jason Miller's [Publish, ship, and install modern JavaScript for faster applications](https://web.dev/publish-modern-javascript/)

> This means that 95% of global web traffic comes from browsers that support the most widely used JavaScript language features from the past 10 years, including:
>
> * Classes (ES2015)
> * Arrow functions (ES2015)
> * Generators (ES2015)
> * Block scoping (ES2015)
> * Destructuring (ES2015)
> * Rest and spread parameters (ES2015)
> * Object shorthand (ES2015)
> * Async/await (ES2017)
>
> Features in newer versions of the language specification generally have less consistent support across modern browsers. For example, many ES2020 and ES2021 features are only supported in 70% of the browser market—still the majority of browsers, but not enough that it's safe to rely on those features directly. This means that although "modern" JavaScript is a moving target, ES2017 has the widest range of browser compatibility while including most of the commonly used modern syntax features. In other words, ES2017 is the closest to modern syntax today.

ES2017 is the earliest version of the Javascript standard that supports modules. This enables the `module/nomodule` pattern as an imperfect solution to supporting older browsers.

Targetting 2017 and ES5 would allows to create two bundles, one for modern code and one for older, legacy code, and use them like this:

```html
<script type="module" src="bundle.modern.js"></script>
<script nomodule src="bundle.legacy.js"></script>
```

Browsers that support modules will load the modern bundles and bundles that don't will load the legacy bundle with all the necessary polyfills.

One of the biggest problems with the `module/nomodule` pattern are third-party libraries. Gary Chew documented the problem in [Bringing Modern JavaScript to Libraries](https://dev.to/garylchew/bringing-modern-javascript-to-libraries-432c)

I also want to allow Javascript files in this project. Allowing `.js` files in a Typescript project doesn't mean that the Javascript files will be type checked.

That is a separate setting that I've chosen not to enable since most of the Javascript files will come from third parties.

```json
"allowJs": true
```

The largest chunk of options are for type checking.

```json
"strict": true,
"noImplicitAny": true,
"strictNullChecks": true,
"strictPropertyInitialization": true,
"noImplicitThis": true,
"useUnknownInCatchVariables": true,
"noUnusedLocals": true,
"noImplicitReturns": true,
"noFallthroughCasesInSwitch": true,
"allowUnusedLabels": true,
"allowUnreachableCode": true,
```

Several checks in this list will help check assumptions I make about the code.

For example, `noImplicitAny` will flag if Typescript can't infer/guess the type of a variable and fall back to the implicit default type `any`.

This may be ok in some cases but can cause unpected errors if we pass a variable that was not expected.

Some fo these settings will prevent footguns. `noFallthroughCasesInSwitch` will flag any non-empty case inside a switch statement that doesn't include either break or return statements.

Rather than relying on case fall through behavior if you want to group cases together, be explicit about the grouping with something like this:

```typescript
const pet:string = "dog";

switch (pet) {
  case "lizard":
  case "snake":
    console.log("I own a reptile");
    break;
  case "dog":
  case "cat":
    console.log("I own a house pet");
    break;
  case "parrot":
    console.log("I own a parrot");
    break;
  default:
    console.log("I don't own a pet");
    break;
}
```

And I'm still in the fence about some of these tests, specifically `allowUnusedLabels` abd `allowUnreachableCode`. While they may make sense during development they are not useful or meaningful in a production script or app.

For example, in the code below, the final `return true` statement will never be reached. Was that meant to be another `else` block so the first one would be an `else if` or another `if` block?

```typescript
function fn(n: number) {
  if (n > 5) {
    return true;
  } else {
    return false;
  }
  // This will never be reached
  // Is the code structured correctly?
  return true;
}
```

## Conclusion: why go through all the trouble?

Setting up Typescript by hand is not trivial.

Yes, we could setup [Vite](https://vitejs.dev/) with the vanilla-ts template, and it would make perfect sense for some projects. But we still have to change the configuration to what makes the most sense to us and the projects we are working on.

Why I chose to switch? Typescript keeps me honest. It makes me think about the code as I'm writing it rather than figuring out problems after the code is written and published.

Yes, I know Typescript is not the solution to all problems, but I'll take all the help I can get.
