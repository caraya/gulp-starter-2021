# radically simple documentation

Documentation is one of the biggest problems facing any software project. Ideally, documentation should be easy for developers to create and for users to read.

This post will explore the following topics:

* The concept of docs as code
* Possible tooling for docs as code
* Creating an experimental docs as code toolchain

## Docs as code

The idea behind [Docs as code](https://www.writethedocs.org/guide/docs-as-code/) is to treat your documentation the same way you treat your project's code; more specifically:

> Documentation as Code (Docs as Code) refers to a philosophy that you should be writing documentation with the same tools as code:
>
> * Issue Trackers
> * Version Control (Git)
> * Plain Text Markup (Markdown, reStructuredText, Asciidoc)
> * Code Reviews
> * Automated Tests
>
> This means following the same workflows as development teams, and being integrated in the product team. It enables a culture where writers and developers both feel ownership of documentation, and work together to make it as good as possible.

We will follow this methodology as we dive deepeer into g3docs and a similar tool for our projects.

Riona MacNamara is a technical writer at Google. In her presentation at SRECon 2016 has the following [description](https://www.usenix.org/conference/srecon16europe/program/presentation/macnamara) she states that:

> Solving this problem [poor documentation] is tough. It's not enough to build tooling; the culture needs to change. Google internal engineering is attacking the challenge three ways: Building a documentation platform; integrating that platform into the engineering toolchain; and building a culture where documentation &mdash; like testing &mdash; is accepted as a natural, required part of the development process.

<div class="video">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/jJ93qzj-s7Q" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

These are some of the goals to derive from docs as code:

* Docs are easy to write
* Docs are automatically built on every commit but can also be built on demand
* There is a UI built for compiled code

Now that we have a basic understanding of docs as code, we can move on to the next topic and see what other people have done to address the needs of docs as code.

## Possible tooling for docs as code

### Docusaurus

[Docusaurus](https://docusaurus.io/) is a static site generator. According to its documentation:

> Docusaurus is a **static-site** generator. It builds a **single-page application** with fast client-side navigation, leveraging the full power of **React** to make your site interactive. It provides out-of-the-box **documentation features** but can be used to create **any kind** of site (personal website, product, blog, marketing landing pages, etc).

It is React-based, not surprising since it's also a Facebook product.

It takes Markdown files as input and provides the UI and the tooling to build a single page application from them

### docToolchain

[DocToolchain](http://doctoolchain.org/docToolchain/v2.0.x/) uses the same idea as Docusaurus, using the [jBake](https://jbake.org/) for the site generation.

Some of the differences between the two products. With DocToolchain:

* You can create documentation from [multiple Git repositories](http://doctoolchain.org/docToolchain/v2.0.x/020_tutorial/050_multipleRepositories.html)
* You can [publish your documentation to Atlassian Confluence](http://doctoolchain.org/docToolchain/v2.0.x/015_tasks/03_task_publishToConfluence.html)

### VuePress

[VuePress](https://vuepress.vuejs.org/)

> VuePress is composed of two parts: a [minimalistic static site generator](https://github.com/vuejs/vuepress/tree/master/packages/%40vuepress/core) with a Vue-powered [theming system](https://vuepress.vuejs.org/theme/) and [Plugin API](https://vuepress.vuejs.org/plugin/), and a [default theme](https://vuepress.vuejs.org/theme/default-theme-config.html) optimized for writing technical documentation. It was created to support the documentation needs of Vue’s own sub projects.

The theme is written with Vue.js so, if you're familiar with the platform, it should be easier to customize the layout of your documentation.

It uses [Markdown-it](https://github.com/markdown-it/markdown-it) for Markdown rendering and Markdown-it plugins for features, so we can customize both the render behavior and capabilities.

## Repurposing a static site generator as a g3doc-like tool

My [static-gen-njk](https://github.com/caraya/static-gen-njk) tool does the first part of any documentation system: It converts content into HTML.

We just need to augment it to make it into a full documentation system

The first thing to consider is how to build a site around our content, whether it's a single page app or a regular website.

An auxiliary requirement to that is the need to provide a list of the files to act as navigation

### Adding tools

There are two additional Markdown-it plugins that I want to research for inclusion in the converter.

#### Mermaid

[Mermaid](https://mermaid-js.github.io/mermaid/) allows you to create diagrams on Markdown that will be converted to HTML later in the process.

Particularly when writing documentation about code, diagrams like [UML models](https://www.geeksforgeeks.org/unified-modeling-language-uml-introduction/) should always be available for people writing documentation.

There are multiple Markdown-it plugins to handle Mermaid diagrams. I chode [markdown-it-mermaid](https://github.com/DatatracCorporation/markdown-it-mermaid/blob/master/README.md)

This is an example of Mermaid included as Markdown-it plugin:

```markdown
~~~mermaid <optional title>
  graph TD
    A[Christmas] -->|Get money| B(Go shopping)
    B --> C{Let me think}
    C -->|One| D[Laptop]
    C -->|Two| E[iPhone]
    C -->|Three| F[Car]
~~~
```

#### Markmap

[Markmap](https://markmap.js.org/) gives us the option to use [Mindmaps](https://www.mindmapping.com/mind-map) as part of our documentation projects.

I chose to use [markdown-it-markmap](https://github.com/deiv/markdown-it-markmap#readme) for the implementation of mindmaps for this project.

```markdown
\```markmap
# root
## child1
  - child3
## child2
  - child3
\```
```

### Output Formats

The other side of the equation is to think about the formats that we want to generate from our Markdown content.

The default is HTML, the basic content unit that we need to build a website from.

Another format that would be useful is PDF. With it we can print our documentation in a more readable format.

How we generate the PDF is the main research question for this section of the project.

## Automating the documentation process
