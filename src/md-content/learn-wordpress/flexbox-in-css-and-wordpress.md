# Flexbox in css and Wordpress

## Topic Description

A basic understanding of CSS Flexbox is needed as a prerequisite to understanding how content aligns. Show this first in plain HTML/CSS context, and share where in Site Editor one can find settings related row and column blocks (that use Flexbox under the hood).

## Related Resources

Since this lesson is about a CSS technology, I'm also including external links.

* [Flexbox](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox) &mdash; MDN
* [A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) &mdash; CSS Tricks
* [Row Block](https://wordpress.com/support/wordpress-editor/blocks/row-block/) &mdash; WordPress Support

## Description

To fully understand how Row and Column blocks work in the full site editor, you need some basic understanding of how CSS Flexbox works. In this lesson we'll cover the basics of Flexbox and how it applies to the row and column blocks.

## Objectives

After completing this lesson, participants will be able to:

* Explain the basic concepts of flexbox
* Describe how the row and column blocks use Flexbox under the hood
* Create column and row layouts in the full site editor

## Prerequisite Skills

Participants will get the most from this lesson if they have familiarity with:

* Basic experience using Git or Github
* Flexbox CSS syntax
* Working in a text/code editor
* Editing themes in the full site editor
* Completed the Basic WordPress Concepts lesson

## Readiness Questions

* Do you want to create column or row-based layouts in WordPress?
* Have you written CSS stylesheets?
* Have you worked with a text/code editor like VS Code, Atom, WebStorm, Sublime Text, Atom or other?
* Have you creased themes with the Full Site Editor?

## Slides

Change the /repo-name/ in the link to match the URL name of this repo.

Slides (files included in this repo)

## Materials Needed

* A good code editor. Possible options
  * [VS Code](https://code.visualstudio.com/)
  * [Atom](https://atom.io/)
  * [Webstorm](https://www.jetbrains.com/webstorm/)
  * [Sublime Text](https://www.sublimetext.com/)
  * [Brackets](https://brackets.io/)
* A local WordPress installation
* A working block theme (Twentytwentytwo is recommended)
* Data to populate the theme with ([Theme unit test data](https://codex.wordpress.org/Theme_Unit_Test) is recommended)

## Notes for the Presenter

* The first part of the lesson is about CSS flexbox, how it works and how do you get column and row layouts. The second part explains how WordPress uses Flexbox under the hood when using the row and column blocks

## Lesson Outline

* Introduction: What is Flexbox?
* How does it work?
  * How does it work?
  * Interaction between parents and children
  * Examples
    * Column Layout (Codepen and pasted in the full lesson plan)
    * Row Layout (Codepen and pasted in the full lesson plan)
  * Exercises
* How does it work in the full site editor?
  * Column and Row Blocks are variations of the group block
  * Examples
    * Row block
    * Column block
    * Nested rows
  * Exercises
    * Column layout
    * Row layout
    * Nested rows
* Review
* Participant Questions

## Exercises

**Before we get started.**

Because we're working with CSS, we need both an HTML and a CSS file to do our work on.

To prepare download the files from the repository [[FIXME: Needs repo location]] to a directory on your computer.

There are two versions of each file:

* The starting version (ending with `-start`) is the one we'll work with in the following exericses
  * It is mostly complete but it is missing the flexbox-based CSS code
* The final version (ending with `-final`) is a complete version of the exercise
  * You can use to compare with your work in case you get stuck

**Creating row-based flexbox layouts with CSS.**

In this exercise the participantss will create a row-based flexbox layout using CSS.

Open `gallery-start.html` in your browser. Then open `gallery-start.css` from the CSS folder in your text editor.

In `gallery-start.css`, look at the container class, presented by the `.row-layout` selector.

Change the content of `.row-layout` so that it looks like this:

```css
.row-layout {
  display: flex;
  flex-flow: row wrap;
  padding: .5vw;
}
```

The `disply: flex` rule tells the browser that we want to use Flex to display the content inside this container.

`flex-flow` can be broken in two things: the direction of the layout flow (`row` or `column`) and whether we want to wrap the content (`wrap` or blank).

delete the wrap portion of the `flex-flow` attribute and see how the browser behaves; then reload the HTML page in the browser.

You can change the images for your own and see if it changes the layout in any way.

**Creating column-based flexbox layouts with CSS.**

Open the `gallery-start.html` file in your browser. Then open the `gallery-start.css` file from the CSS folder in your text editor.

The first thing to do is to add the flex-related rules to the `.container` selector. Change the content of `.container` so it looks like this:

```css
.container {
  display: flex;
  flex-direction: column;

  margin: 0 auto;
  
  height: 600px;
  width: 400px;

  border: 5px solid rgb(40,30,93);
  border-radius: .5em;
}
```

`display: flex` tells the browser that we want to use Flexbox to layout the elements inside the container.

`flex-direction` is the direction of the layout flow, in this case indicating `column` for a vertical layout.

Because we're not wrapping the content we use this attribute instead of `flex-flow` like we did in the row exercise.

There is a second item that we need to change. Change the `.content` selector so it looks like this:

```css
.content {
  flex: 1 1 auto;
  padding: 10px;
}
```

`flex` is a shorthand for three related attributes:

* `flex-grow`: This defines the ability for a flex item to grow if necessary. It accepts a unitless value that serves as a proportion. It dictates what amount of the available space inside the flex container the item should take up

  If all items have flex-grow set to 1, the remaining space in the container will be distributed equally to all children
  
  If one of the children has a value of 2, that child would take up twice as much of the space either one of the others (or it will try, at least)
* `flex-shrink`: This defines the ability for a flex item to shrink if necessary.
* `flex-basis`: This defines the default size of an element before the remaining space is distributed.
  
  It can be a length (e.g. 20%, 5rem, etc.) or a keyword
  
  The auto keyword means “look at my width or height property” (which was temporarily done by the main-size keyword until deprecated)
  
  The content keyword means “size it based on the item’s content” – this keyword isn’t well supported yet, so it’s hard to test and harder to know what its brethren max-content, min-content, and fit-content do

Play with different values in content's flex rule and see how the layout changes.

**Creating row-based layouts in WordPress.**

This exercise will build a two column layout using the row block.

Row and stack layouts in the full site editor use flexbox under the hood so, now that we know how flexox works, we'll look at creating rows and stacks/columns in WordPress.

Go to the full site editor (`Appearance -> Editor`).

Then select toggle the navigation menu (WordPress logo on the top left corner of the browser window) and select `Template Parts`.

Create a new part template and call it `two-column` (yes, I know it's a row block but you'll see why the name fits).

You will then be taken to the editor for the part template.

Click on the `Add Block` button on the lower right corner of the editor and search for `row`.

Another way to add a block is to type `/row` in the input box and then press the `Enter` key.

Both methods provide the same result. You will be taken to the editor block.

How we add content to the first box in the row is different than how we add content to the second and subsequent boxes.

To add content to the first box, click on the `Add Block` button inside the block.

Search for `Latest Posts` and click on it. This will display the five most recent posts in your blog.

To add content to the second and subsequent boxes, use the `Add Block` button in the lower right corner of the row block.

Search for `Latest comments` and press enter to insert the block

Now that we have the blocks ready, we'll take a step back and look at the formating of the row. We will not look at the formating of content in the child blocks.

![Full site editor location](https://learn.wordpress.org/files/2022/05/wp-flexbox-wordpress-01.png)

## Assessment

There should be one assement item (or more) for each objective listed above. Each assessment item should support an objective; there should be none that don't.

Write out the question.

* Option
* Option
* Option
* Option

Answer: 3. Correct answer

A few questions to ask participants to evaluate their retention of the material presented. They should be a measure of whether the objectives were reached. Consider having a question for each objective.

## Additional Resources

* [Flexbox](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox) &mdash; MDN
* [A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) &mdash; CSS Tricks
* [Row Block](https://wordpress.com/support/wordpress-editor/blocks/row-block/) &mdash; WordPress Support

## Example Lesson

# Flexbox in CSS and WordPress

## Lesson Wrap Up

Follow with the Exercises and Assessment outlined above.
