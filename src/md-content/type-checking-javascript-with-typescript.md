# Type checking Javascript with Typescript

Because Typescript is a superset of Javascript, we can use Typescript to validate regular Javascript files.

* Make sure your file structure works
* Install and Configure Typescript
* Add Lint command to `package.json`
* Use JSDoc to tell Typescript the types of our variables
* Exclude files as needed

Since I will be adding this to an existing project, we assume there's already a `package,json` file for the project.

We first install Typescript as a development dependency.

```bash
npm i -D typescript
```

Installing Typescript locally will make the `tsc` command available to you.

We then need to initialize an empty configuration file.

```bash
tsc --init
```

With the generated configuration file in place we can edit it to make the changes we need.

Uncomment the followng fields and set them to the values indicated below.

```json
"allowJs": true,
"checkJs": true,
"rootDir": "./src"
```

If Typescript cannot guess what type to use for a given file it will add red "wavy underlines" to the places where there are problems and, if you mouse over the item, it will tell you what the problem is.

If you want to prevent Typescript from checking a file, place the following comment as the first line of the file.

```javascript
// @ts-nocheck
```

This will prevent Typescript from checking the file at all.
