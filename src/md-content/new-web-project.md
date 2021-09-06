# Starting a new Node Project

I hate to admit it but all my web projects nowadays need some sort of Javascript and a build process to make sure they support older browsers.

The first step is to follow Tierney Cyren's suggestion below

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">How to start any new Node.js project:<br><br>$ npx license mit &gt; LICENSE<br>$ npx gitignore node<br>$ npx covgen YOUR_EMAIL_ADDRESS<br>$ npm init -y<br><br>You&#39;re ready to start coding.</p>&mdash; Tierney Cyren (@bitandbang) <a href="https://twitter.com/bitandbang/status/1082331715471925250?ref_src=twsrc%5Etfw">January 7, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

A brief explanation of the commands:

* **npx license mit -o "author's name" > LICENSE** will add the MIT license to the project on the `LICENSE` file
* **npx gitignore node** will create a `.gitnore` file based on Github's files
* **npm init -y** creates an empty `package.json` configured with your default information. More on setting your NPM information below.

The basic initial information in your NPM account can be viewed with the following command:

```bash
npm config list | grep init
```

It should return the list of values below with the information that you've already entered if you've done it beforehand.

To make sure that your information is up to date you can run the following commands:

```bash
npm set init.author.name "Your name"
npm set init.author.email "your@email.com"
npm set init.author.url "https://your-url.com"
npm set init.license "MIT"
npm set init.version "1.0.0"
```

Once you have set the init commands they will always produce the same results for new projects.

Running the commands is not hard, but it can be tedious to coopy and paste over and over. To fix that we can create a shell function (Linux, Mac and WSL on Windows) to make it easier to reproduce the configuration.

I've also removed the covgen command because I can't get it to work, either with NPX or installing the package globally.

```bash
function node-project {
  git init
  npx license $(npm get init.license) -o "$(npm get init.author.name)" > LICENSE
  npx gitignore node
  npm init -y
}
```

With this or a similar function you can get a fast and reproducible initial configuration for your Node-based projects.

Thanks to [Phil Nash](https://philna.sh/blog/2019/01/10/how-to-start-a-node-js-project/) for the idea and the shell function that closes the post.
