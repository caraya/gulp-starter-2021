# Editor for the web (March 2022 update)

I'm still looking for a good toolkit to build an editor around. Most of the solutions I've looked at have some sort of drawback that made me drop them from the project.

Even though it's in beta, [Stylo.js](https://stylojs.com/) may be the best solution I've found so far but I can't create a menu for it (it apears as just a plus signs on the side), so that disaqualifies it from being the solution that we want to use.

I cam across a [Vue Markdown Editor](https://github.com/code-farmer-i/vue-markdown-editor) that sounds interesting enough to take a further look.

The editor is a Vue component that makes a full Code Mirror based editor for your application.

It looks exactly like what I need but it has the same problem as with ProseMirror. The developers assume that you know how to build a component with Vue and skip any of the basic setup.

I can probably figure Vue components out but it seems like a lot of work.

I started with the [Vue CLI](https://cli.vuejs.org/) to automate the configuration and setup of the project at the cost of flexibility, like many 
