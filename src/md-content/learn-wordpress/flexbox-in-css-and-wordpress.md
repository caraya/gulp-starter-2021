# Flexbox in css and Wordpress

## Topic Description

A basic understanding of CSS Flexbox is needed as a prerequisite to understanding how content aligns. Show this first in plain HTML/CSS context, and share where in Site Editor one can find settings related to Flex.

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
* Q & A

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

**Creating column-based flexbox layouts with CSS.**

Open the `gallery-start.html` file in your browser. Then open the `gallery-start.css` file from the CSS folder in your text editor.

**Creating row-based layouts in WordPress.**

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

An example of how the lesson plan can be implemented. Written in script form as one possible way an presenter might use this lesson plan at an event, with screenshots and instructions if necessary.

## Lesson Wrap Up

Follow with the Exercises and Assessment outlined above.
