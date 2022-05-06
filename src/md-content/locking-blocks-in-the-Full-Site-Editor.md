# Locking blocks in the Full Site Editor

## Description

Theme creators can now lock blocks so that editors and authors cannot modify the layout of the block in unexpected ways. In this session we’ll explore the options to lock content in the file editor and how to leverage the locking mechanism when developing themes.

## Objectives

After completing this lesson, participants will be able to:

* Identify the different locking mechanism for WordPress blocks
* Explain the differences between the available locking mechanism and give an example of each locking
* Apply different permissions to locking / unlocking blocks based on user roles

## Target Audience

[] Users / Content Writers
[] Designers
[] Developers
[] Speakers
[] Organizers
[] Kids

## Experience Level

How much experience would a participant need to get the most from this lesson? Put an "x" in the brackets for all that apply.

[] Beginner
[] Intermediate
[] Advanced

## Type of Instruction

Which strategies will be used for this lesson plan? Put an "x" in the brackets for all that apply.

[] Demonstration
[] Discussion
[] Exercises
[] Feedback
[] Lecture (Presentation)
[] Slides
[] Show & Tell
[] Tutorial

## Time Estimate (Duration)

IF this is just a show and tell then it should take about an hour. If we choose to run this as a hands-on workshop then I would suggest two to three hours.

[] 1 hour or less
[] 2-4 hours (half-day)
[] 5-8 hours (full-day)
[] 2 days
[] 3 days or more

## Prerequisite Skills

Participants will get the most from this lesson if they have familiarity with:

* Completed the Basic WordPress Concepts lesson
* Ability to edit block themes

## Readiness Questions

* Do you want to make changes to your theme?
* Do you need to prevent authors from making changes to your theme's templates?
* What elements of the selected blocks do you want to lock?

## Slides

Change the /repo-name/ in the link to match the URL name of this repo.

Slides (files included in this repo)

## Materials Needed

* A local install of WordPress
* The TwentyTwentytwo theme installed and active
* a non-administrator user to switch to when testing the locking mechanism

## Notes for the Presenter

* It is not possible to lock a block and test that it works with the same account. That's why we ask that participants have a non-administrator user available to test with.
* We ask for a specific theme so we can all be on the same page rather than having to figure out what each theme is doing
* This feature is only available in WordPress 6.0 or in older versions running the Gutenberg plugin. It will not work in version 5.9.x or earlier without Gutenberg
* This is a separate feature from template locking

## Lesson Outline

* Introduction
  * Presenter
  * Content: What are we going to cover
  * What it is
  * Why is this important?
* Setting expectations
  * This is for blocks only
  * It is different than template locking
* Locking blocks
  * Preventing removal
    * In what circumstances would this be useful?
  * Preventing movement
    * Why would this be useful?
  * Combining the two
* Demo time
  * Show how to set the locking up
  * Show that it actually works
* Working out permissions: Who can do what?
* Q & A

## Exercises

**Preparation.**

* Working with the TwentyTwentytwo theme, complete the following actions:
  * Go into the site editor
  * Select template editor > home
  * Create a group block
  * Create two paragraph blocks inside the header

**Lock movement.**

* Working with the TwentyTwentytwo theme, complete the following actions:
  * Go into the site editor
  * Select template editor > home
  * In the home template select the first paragraph block below the header
    * Click the options menu and select the lock menu item
    * In the lock popup select `disable movement`
    * Click `Apply`

**Lock removal.**

* In the TwentyTwentytwo theme, complete the following actions:
  * Go into the full site editor
  * Select template editor > home
  * In the home template select the second paragraph that you created under the header
    * Click the options menu and select the lock menu item
    * In the lock popup select `prevent removal`
    * Click `Apply`

**Locking both.**

* In the TwentyTwentytwo theme, complete the following actions:
  * Go into the full site editor
  * Select template editor > home
  * In the home template select the second paragraph you created under the header
    * Click the options menu and select the lock menu item
    * In the lock popup select `disable movement`
    * Make sure that the `prevent removal` option is still selected **The `Select All` option will become checked once you select the second option**
    * You can also click the `Select All` option to select all of the options
    * Click `Apply`

**Test the locking system.**

* Log in to your site using your non-administrator account
* Complete the following tasks
  * Try to move the second paragraph in the block underneath the header. You should not be able to remove it
  * Likewise, try removing the either paragraph. You should be able to do this
  * Try moving the block containing the two paragraphs. It should move like normal.

## Assessment

Who can lock blocks?

1. Administrators
2. Editors
3. Anyone who can edit themes
4. Authors
5. Anyone who can log in to the site

Answer: 3. Correct answer

## Additional Resources

To be filled

## Example Lesson

# Locking blocks in the full site editor

One of the things that I wish WordPress would do is to give developers the ability to control what we can and cannot do in the full site editor.

In 6.0, we get a first set of locking features. We can lock individual block and prevent them from being moved or being deleted.

## Why do we need to lock blocks?

There are a few cases where locking blocks is useful.

* We want to keep pieces of content together (movement)
* We need a disclaimer or copyright notice to always be available where we placed it (removal)
* We would like to prevent authors from moving the content of a group individually but only move the group as a unit (both)

## Preparing the content

To start we need to create a few blocks in the template editor in order to have material to work with.

Go into the site editor by clicking the editor (beta) link under the appearance menu

<figure>
  <img src='https://res.cloudinary.com/dfh6ihzvj/images/v1651791672/publishing-project.rivendellweb.net/block-locking1/block-locking1.png?_i=AA' alt='Location of the full site editor in the Appearance menu' width='800'>
  <figcaption>Location of the full site editor in the Appearance menu</figcaption>
</figure>

Under the blog header, create a group block. You can click on the block inserter and then search for `group` and then click on the `group` block to insert it into the current template.

<figure>
  <img src='https://res.cloudinary.com/dfh6ihzvj/images/v1651793971/publishing-project.rivendellweb.net/block-locking2/block-locking2.png?_i=AA' alt='Block inserter searching for a block and preview of group block' width='693'>
  <figcaption>Block inserter searching for a block and preview of group block</figcaption>
</figure>

Add two paragraph blocks inside the group block. These are the blocks that we'll be working with in the rest of the lesson.

## Locking movement

AS we discussed earlier there might be times when we want to prevent authors from moving blocks individually.

As an example we'll be locking the first paragraph inside the group block we created earlier.

In the full site editor, select the first paragraph block inside the group block and select the options menu on the far right side.

<figure>
  <img src='https://res.cloudinary.com/dfh6ihzvj/images/v1651850251/publishing-project.rivendellweb.net/block-locking3/block-locking3.png?_i=AA' alt='Options menu for paragraph block showing the Lock option, fifth options from the bottom, highlighted in blue' width='1055'>
  <figcaption>Options menu for paragraph block showing the Lock option highlighted in blue</figcaption>
</figure>

You will then be presented with a modal dialogue to select your lock option or options:

<figure>
  <img src='https://res.cloudinary.com/dfh6ihzvj/images/v1651878505/publishing-project.rivendellweb.net/block-locking4/block-locking4.png?_i=AA' alt='Block locking modal dialogue for paragraph block with no options selected' width='906'>
  <figcaption>Block locking modal dialogue for paragraph block with no options selected</figcaption>
</figure>

Click the checkbox next to `Disable movement` and click apply.

No one without the required permissions will be able to move the block.

## Locking removal

The other type of locking that is available is preventing removal blocks. This is useful when you want to keep a block in the template but you don't want it to be removed.

In the full site editor, select the second paragraph block inside the group block and select the options menu on the far right side.

When you click the options menu and select the lock menu item, you will presented with the lock dialogue for the paragraph block.

In this case select the checkbox next to the `Prevent removal` option and then click `Apply`.

<figure>
  <img src='https://res.cloudinary.com/dfh6ihzvj/images/v1651853891/publishing-project.rivendellweb.net/block-locking5/block-locking5.png?_i=AA' alt='Block locking modal dialogue for paragraph block with no options selected' width='906'>
  <figcaption>Block locking modal dialogue for paragraph block with no options selected</figcaption>
</figure>

## Locking both

<figure>
  <img src='https://res.cloudinary.com/dfh6ihzvj/images/v1651878500/publishing-project.rivendellweb.net/block-locking6/block-locking6.png?_i=AA' alt='Block locking modal dialogue for paragraph block with no options selected' width='906'>
  <figcaption>Block locking modal dialogue for paragraph block with no options selected</figcaption>
</figure>

## Test the locked blocks

## Lesson Wrap Up

 Follow with the Exercises and Assessment outlined above.
