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
[x] Designers
[x] Developers
[] Speakers
[] Organizers
[] Kids

## Experience Level

How much experience would a participant need to get the most from this lesson? Put an "x" in the brackets for all that apply.

[] Beginner
[x] Intermediate
[x] Advanced

## Type of Instruction

Which strategies will be used for this lesson plan? Put an "x" in the brackets for all that apply.

[x] Demonstration
[x] Discussion
[x] Exercises
[] Feedback
[] Lecture (Presentation)
[] Slides
[x] Show & Tell
[] Tutorial

## Time Estimate (Duration)

IF this is just a show and tell then it should take about an hour. If we choose to run this as a hands-on workshop then I would suggest two to three hours.

[x] 1 hour or less
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
  * Create two paragraph blocks immediately underneath the header

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
    * Make sure that the `prevent removal` option is still selected
    * **The `Select All` option will become checked once you select the second option**
    * You can also click the `Select All` option to select all of the options
    * Click `Apply`

**Test the locking system.**

* Log in to your site using your non-administrator account

## Assessment

Write out the question.

1. Option
2. Option
3. Option
4. Option
5. Option

Answer: 3. Correct answer

## Additional Resources

* Resource 1
* Resource 2

An optional section which can contain a list of resources that the presenter can use to get more information on the topic.

For example:

* Link to information on the Codex
* Theme Review Team's Handbook

## Example Lesson

 (see the [block editor handbook](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-templates/#locking) entry for template locking)

## Lesson Wrap Up

 Follow with the Exercises and Assessment outlined above.
