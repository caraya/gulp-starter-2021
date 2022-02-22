# Repurposing Markdown HTML Publisher as tool for docs like code projects

## Adding input formats

### Adding input formats: Mermaid

[Mermaid](https://mermaid-js.github.io/mermaid/)

[markdown-it-mermaid](https://www.npmjs.com/package/@liradb2000/markdown-it-mermaid)

### Adding input formats: Markmap

[Markmap](https://markmap.js.org/)

[markdown-it-markmap](https://github.com/deiv/markdown-it-markmap#readme)

## Output Formats

### HTML Static Site

#### Building index of all available pages

#### Linking to other pages

### PDF and PPT(X)

[Marp-core](https://github.com/marp-team/marp-core#readme)

## Packaging

Right now the project runs out of an index.js file and looks for `gdocs` under `src` for the files to convert.

Since we're adding functionality to the project, we might want to change the way the project is configured. Rather than having a single index.js file we might want to break the functionality into multiple files and leverage tools like 
