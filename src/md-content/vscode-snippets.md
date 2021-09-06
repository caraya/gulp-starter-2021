# My VSCode Snippets

I love Visual Studio Code for writing anything ranging from Markdown to Javascript to PHP and even some Go and C/C++.

One of the things that intrigued me the most are snippets and how they work once you insert them.

The following example shows a VS Code snippet that will inset a figure with `img` and `figcaption` children.

The elements in the JSON for the snippet are:

* **scope**: What language or languages the snippet applies to
* **prefix**: The short name for the snippet
* ***body***: The content for the snippet, including placeholders
* ***description***:

```json
{
	"HTML figure": {
		"scope": "html, markdown",
		"prefix": "fig",
		"body": [
			"<figure>",
			"  <img loading='lazy' src='$1' alt='${2:alt text}' width='${3:width}' height='${4:height}'>",
			"  <figcaption>'${5:caption text}'</figcaption>",
			"</figure>"
		],
		"description": "figure element in markup/down"
	},
```

Inside the template we can use placeholders on their own (`$1`) or placeholders with descriptive text (`${2:alt text}`) If more than one placeholder has the same number they will change at the same time and get the same text entered.

If you have many items that are similar and where there are small changes between the different types, you can use a snippet to handle the variance.

I use three different types of message boxes: info, warning and danger. They all share the same code except for the second class attribute.

In the message box snippet accepts 2 parameters, the type of box it is and the body of the box.

```json
	"<message box": {
		"prefix": "message",
		"scope": "html, markdown",
		"body": [
			"<div class='message ${1:type of box'>",
			"  ${2:content here}",
			"</div>"
		],
		"description": "message box: info, warning, danger"
	}
}
```

The last type of snippet I find useful is what I call the compound one. I use Description List a lot in my writing but I'm never quite sure of how many items I want the list to have. So, rather than create one huge DL snippet I created two.

The first snippet creates the list itself and the first item.

The second snippet creates a list item on its own

```json
  "Def List": {
	  "prefix": "dllist",
		"scope": "html, markdown",
		"body": [
			"<dl>",
			"  <dt>${1:term to define}</dt>",
			"  <dd>${2:definition of the term}",
			"</dl>"
		],
		"description": "Definition List and First Item"
	},
	"Def List Item": {
		"prefix": "dlitem",
		"scope": "html, markdown",
		"body": [
			"  <dt>${1:term to define}</dt>",
			"  <dd>${2:definition of the term}</dd>"
		],
		"description": "Individual DL item"
	}
}
```

You can build more complex snippets for whatever language you need. It is nice to have them, particularly when you know how to use them :)

Check out VS Code's [Snippets in Visual Studio Code](https://code.visualstudio.com/docs/editor/userdefinedsnippets)
