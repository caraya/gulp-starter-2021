# Testing javascript in the browser without the browser

There are times that we want to test snippets of Javascript code in different browsers to make sure that it works as intended in all our target browsers. I've always fired the browsers and pasted the code into DevTools or Web Inspector to check if the results are the same.

Now there is a pair of applications that will automate this for you: [jsvu](https://www.npmjs.com/package/jsvu) and [eshost](https://www.npmjs.com/package/eshost).

In order to install these packages run the following command

```bash
npm i -g jsvu eshost
```

JSVU (JavaScript Version Updater) manages the installation and update for differnt Javascript engines avoiding the compilation process. Out of the box, it supports the following engines and OS combinations.

<table>
  <thead>
    <tr>
      <th>Vendor</th>
      <th>JavaScript engine</th>
      <th>Binary name</th>
      <th><code>mac64</code></th>
      <th><code>win32</code></th>
      <th><code>win64</code></th>
      <th><code>linux32</code></th>
      <th><code>linux64</code></th>
    </tr>
  </thead>
    <tbody>
    <tr>
      <td>Microsoft</td>
      <td><a href="https://github.com/Microsoft/ChakraCore/issues/2278#issuecomment-277301120" rel="nofollow"><strong>Chakra</strong></a></td>
      <td><code>chakra</code> or <code>ch</code></td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>❌</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>Facebook</td>
      <td><a href="https://github.com/facebook/hermes/issues/17" rel="nofollow"><strong>Hermes</strong></a></td>
      <td><code>hermes</code> &amp; <code>hermes-repl</code></td>
      <td>✅</td>
      <td>❌</td>
      <td>✅</td>
      <td>❌</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>WebKit/Apple</td>
      <td><a href="https://developer.apple.com/documentation/javascriptcore" rel="nofollow"><strong>JavaScriptCore</strong></a></td>
      <td><code>javascriptcore</code> or <code>jsc</code></td>
      <td>✅</td>
      <td>✅ <sup>*</sup></td>
      <td>✅ <sup>*</sup></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>Fabrice Bellard</td>
      <td><a href="https://bellard.org/quickjs/" rel="nofollow"><strong>QuickJS</strong></a></td>
      <td><code>quickjs</code></td>
      <td>❌</td>
      <td>❌</td>
      <td>❌</td>
      <td>❌</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>Mozilla</td>
      <td><a href="https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey" rel="nofollow"><strong>SpiderMonkey</strong></a></td>
      <td><code>spidermonkey</code> or <code>sm</code></td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>Google</td>
      <td><a href="https://v8.dev" rel="nofollow"><strong>V8</strong></a></td>
      <td><code>v8</code></td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>Google</td>
      <td><a href="https://v8.dev" rel="nofollow"><strong>V8 debug</strong></a></td>
      <td><code>v8-debug</code></td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>Moddable-OpenSource</td>
      <td><a href="https://github.com/Moddable-OpenSource/moddable-xst" rel="nofollow"><strong>XS</strong></a></td>
      <td><code>xs</code></td>
      <td>✅ <sup>(32)</sup></td>
      <td>✅</td>
      <td>✅ <sup>(32)</sup></td>
      <td>✅</td>
      <td>✅</td>
    </tr>
  </tbody>
</table>

When you first run it it will prompt you to select the JS engines to install. After initial install running the `jsvu` commannd will update the engines as appropriate.

Once we have the engines that we want to work with we can configure `ESHost` to run the same command with these multiple js engines. In this example we're adding the major browser's JS engines to work with ESHost.

```bash
# Chakra is old Edge's JS engine
eshost --add 'Chakra' ch ~/.jsvu/chakra
# JSCore is Safari's JS engine
eshost --add 'JavaScriptCore' jsc ~/.jsvu/javascriptcore
# Spider Monkey is Firefox JS engine
eshost --add 'SpiderMonkey' jsshell ~/.jsvu/spidermonkey
# V8 is Chrome's JS engine
eshost --add 'V8' d8 ~/.jsvu/v8
```

Once we have the engines set up, ESHost is ready to go.

We have multiple ways to run scripts in ESHost. We can run a short script in all configured browsers with the `-e` flag like this:

```bash
eshost -e "12*12"
```

You can also run complete scripts in the configured browsers with the following command:

```bash
eshost my-script.js
```

The only flags I will refer to are `-m` and `-s`.

The `-m` flag will treat the script as a module with the corresponding differences in syntax.

The `-s` flag will consolidate results when different engines produce the same result. For example, the following command:

```bash
eshost -se "console.log(112*12)"
```

will produce the following result where only JavaScriptCore produces a different result. This will help in researching browser differences that need workarounds

```bash
eshost -se "console.log(122*12)"
#### Chakra, SpiderMonkey, V8
1464
undefined

#### JavaScriptCore

TypeError: undefined is not an object (evaluating 'console.log')
```

For more information use the following command:

```bash
eshost --help
```
