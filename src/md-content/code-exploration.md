# Code exploration tool

A lot of the code I write for blog posts gets tested in one or more browsers through the console. It's tedious and errors are hard to debug (not that it's the console's job but...) so I'd like to use something other than DevTools to do exploratory coding in Javascript, similar but not quite the same as, doing [Literate Programming](http://www.literateprogramming.com/)

## Jupyter, JupyterLab and JupyterHub

I first heard of [iPython](https://ipython.org/), now Jupyter, when I was looking at doing work in Data visualization. Over time there have been [additional language kernels](https://github.com/jupyter/jupyter/wiki/Jupyter-kernels) including [Javascript](https://github.com/n-riesco/ijavascript) and [Go](https://github.com/gopherdata/gophernotes).

Working with Javascript in such an environment is intriguing as it allows you to work in a Node environment with immediate feedback, as if you were working in a web-based REPL with the possibility of adding things like [JSDOM](https://github.com/jsdom/jsdom) or an alternative to simulate a browser environment.

<figure>
  <img src="https://cdn-images-1.medium.com/max/1600/1*_jDTWlZNUySwrRBgVNqoNw.png" alt="JupyterLab notebook">
  <figcaption>PythonLab, the next generrationn Jupyter notebook</figcaption>
</figure>

<figure>
  <img src="https://github.com/n-riesco/ijavascript/raw/master/images/screenshot-notebook-hello.png" alt="Jupyter Notebook working in Javascript">
  <figcaption>Jupyter Notebook working in Javascript</figcaption>
</figure>

So what can we use Jupyter and its ecosystem for?

* To work on code problems (our own or someone elses') in a fully interactive environment
* To share code results either by sharing notebooks or publishing to a collaborative environment
* Integrate code with other elements such as external images, visualizations generated from code, PDF, Markdown and other formats
* Allow for multiple simultaneous edits to a notebook, similar to what G Suite files (docs, sheets, slides) do

There are more areas where tools like Jupyter may be useful but these are the oness that come to mind first.

### Getting Started: Jupyter and Notebook

These instructions are the basis for what comes next and assume a level of familiarity with command line tools and python. It also asumes that Python 3 has been installed on your system as `python3` with Pip installed by default as `pip3`.

First, install pip3; if it's already installed it'll check if it's the latest version and upgrade it if it's not.

```bash
pip3 install -U pip
```

Then install the Jupyter Notebook using the same technique as we did for Pip. Install it if it's not available and upgrade it if installed and not the latest version.

```bash
pip3 install -U jupyter
```

To test that it works just run the notebook using the following command:

```bash
jupyter notebook
```

### Getting Started: Javascript

Now that we have the basic Jupyter installed we can install Javascript support. Run the following command

```bash
npm install -g ijavascript
```

This will make Javascript available as a language for new notebooks.

If you use `nvm` make sure that you're using the version of Node where you installed the `ijavascript` package, otherwise you will get errors when starting a new Javascript notebook.

### Testing the installation: Jupyter Notebook

IF it works it should open your default web browser and provide a list of files in your current directory.

<figure>
  <img src="https://publishing-project.rivendellweb.net/wp-content/uploads/2019/05/python-notebook-start.png" alt="Jupyter Notebook Starting Screen">
  <figcaption>Jupyter Notebook Starting Screen</figcaption>
</figure>

You can click the new button (on the right side of the screen) and it'll give you a list of available languages; this particular configuration Python2, Python3, Go and Javascript/Node available.

<figure>
  <img src="https://publishing-project.rivendellweb.net/wp-content/uploads/2019/05/python-notebooks-languages.png" alt="Python Notebook list of available languages">
  <figcaption>List of available languages available when creating a new Jupyter notebook</figcaption>
</figure>

### Getting Started: JupyterLab

Jupyter notebooks do a lot of awesome things but the UI is not the best. There is another way to view Jupyter notebooks: `JupyterLab`.

As shown in the image below, the interface for JupyterLab is cleaner and easier to use than the notebook interface discussed earlier.

<figure>
  <img src="https://publishing-project.rivendellweb.net/wp-content/uploads/2019/05/ipython-lab-launcher.png" alt="JupyterLab launcher showing available languages">
  <figcaption>JupyterLab launcher in dark mode showing available languages</figcaption>
</figure>

To install `JupyterLab` run the following command

```bash
pip3 install -U jupyterlab
```

and then test it by running

```bash
jupyter lab
```

If it works, it will automatically open a browser and show the luncher discussed earlier.

### Now what?

We've installed all the components for `JupyterLab` and are ready to go, what do we do with it?

I normally test code for my blog posts in Chrome's console. This gives me a browser environment without having to install anything.

But it's tedious and debugging is harder than working with code embedded on the hosting page. If we're working in Node we should be able to use a Jupyter Javascript notebook as is but, if we're working on browser code then we might have a problem as Node doesn't have the same globals as browsers do and may not support the same exact set of features.

<figure>
  <img src="https://publishing-project.rivendellweb.net/wp-content/uploads/2019/05/jupyter-lab-javascript2.png" alt="Javascript code running inside Jupyter Lab">
  <figcaption>Javascript code running inside Jupyter Lab</figcaption>
</figure>

We can import code from Node packages.

```bash
npm init --yes
```

```bash
npm i axios handlebars
```

In this case we import `axios` to handle fetching the data and `handlebars` to display the resulting data.

```js
const axios = require('axios');
const handlebars = require('handlebars');
```

In our first iteration we use Axios to `get` JSON daata from our API and, for now, loog the data to the console.

```js
axios.get('https://publishing-project.rivendellweb.net/wp-json/wp/v2/posts')
  .then(function (response) {
    // This will display the data
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
```

The first problem I hit with this demo is that I need the following HTML to work so the example works properly and I can't get it to work so, until I do that means that we're limited to working with Node APIs amd modules.

```js
$$.html(`<div id="myContent">hello world</div>

<template id="post-list-template">

  {{#each posts}}
  <div class="post">
    <h1>{{title.rendered}}</h1>
    <div>
      {{{content.rendered}}}
    </div>
  </div>
  {{/each}}

</template>`)

console.log($$.html)
```

```html
<div id="myContent"></div>

<template id="post-list-template">

  {{#each posts}}
  <div class="post">
    <h1>{{title.rendered}}</h1>
    <div>
      {{{content.rendered}}}
    </div>
  </div>
  {{/each}}

</template>
```

The alternative is the [jsdom](https://github.com/jsdom/jsdom) package to

# Observable (FKA: d3.express)

# Links

* Jupyter
  * [Jupyter](https://jupyter.org/)
  * [JupyterLab is Ready for Users](https://blog.jupyter.org/jupyterlab-is-ready-for-users-5a6f039b8906)
  * [Setting Up Jupyter Notebook with JavaScript, Python2 and Python3 Support](https://www.sean-lan.com/2016/09/12/jupyter-notebook-set-up/)
  * [The Littlest JupyterHub](https://the-littlest-jupyterhub.readthedocs.io/)
    * [Installing on Google Cloud](https://the-littlest-jupyterhub.readthedocs.io/en/latest/install/google.html)
    * [Installing on Digital Ocean](https://the-littlest-jupyterhub.readthedocs.io/en/latest/install/digitalocean.html)
    * [Installing on Amazon Web Services](https://the-littlest-jupyterhub.readthedocs.io/en/latest/install/amazon.html)
  * [JupyterLab](https://github.com/jupyterlab/jupyterlab)
    * [JupyterLab extensions on NPM](https://www.npmjs.com/search?q=keywords:jupyterlab-extension)
    * [JupyterLab extensions in Github]()
* Emulating a browser
  * [JSDOM](https://github.com/jsdom/jsdom)
* Observable
  * [A better way to code](https://medium.com/@mbostock/a-better-way-to-code-2b1d2876a3a0)
  * [Observable Site](https://observablehq.com/)
  * [Downloading and embedding notebooks](https://observablehq.com/@observablehq/downloading-and-embedding-notebooks)
