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

[Docusaurus](https://docusaurus.io/docs/configuration)

### docToolchain

[DocToolchain](http://doctoolchain.org/docToolchain/v2.0.x/)

### VuePress

[VuePress](https://vuepress.vuejs.org/guide/)

### Gatsby

[Gatsby](https://www.gatsbyjs.com/)

[Gatsby static site generator](https://www.gatsbyjs.com/docs/glossary/static-site-generator/)

## Repurposing Markdown HTML Publisher as a g3doc-like tool

### Adding tools

#### Mermaid

[Mermaid](https://mermaid-js.github.io/mermaid/)

#### Markmap

[Markmap](https://markmap.js.org/)

### Output Formats

#### HTML

#### PDF

#### EPUB?

## Conclusion
