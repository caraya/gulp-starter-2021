# Block Locking Updates Wordpress 6.1

The following features related to block locking were introduced in WordPress 6.1.

## Block Locking UI Changes for group block

Locking all children of a group element means that the UI for locking group blocks changed slightly to accomodate the new functionality in blocks that need it.

When locking content in a group or other container, you now have the option of applying the same settings to all the children blocks inside the container

<figure>
  <img src='https://learn.wordpress.org/files/2022/12/block-locking-group-locking-0.png' alt='Block Locking UI' width='800' >
  <figcaption>Block locking UI showing the toggle to apply to all blocks inside the container</figcaption>
</figure>

## Locking content inside container block

<figure>
  <img src='https://learn.wordpress.org/files/2022/12/block-locking-new-setting.png' alt='Block Locking UI' width='800' >
  <figcaption>Block locking UI showing the toggle to apply to all blocks inside the container. The toggle button to apply changes to all blocks is highlighted in red</figcaption>
</figure>

Because now we can choose whether to apply the locks to a group's child elements, there are additional considerations that we need to keep in mind

### Where you make the changes matter

If you make the changes to an individual block then the blocks apply only to that block, regardless of the parent container.

<figure>
  <img src='https://learn.wordpress.org/files/2022/12/block-locking-individual-block.png'
  width='800'>
  <figcaption>Block locking settings for an individual block. These settings will only apply to a single paragraph.</figcaption>
</figure>

Likewise, if you lock the containing group block and apply the lock to all blocks inside, the same settings will be applied to all blocks.

<figure>
  <img src='https://learn.wordpress.org/files/2022/12/block-locking-group-locking-0.png' alt='Block Locking UI' width='800' >
  <figcaption>Block locking UI showing the toggle to apply to all blocks inside the container</figcaption>
</figure>

To change the behavior of individual items inside a group, you need to work on the block you want to change individually either in the list view or in the editor.

## Block Lock Status in List View

You can see whether a block is locked in the list view. Locked blocks have a padlock icon to the right.

<figure>
  <img src='https://learn.wordpress.org/files/2022/12/block-locking-group-locking.png' width='800'>
  <figcaption>List View showing an example of a group block and its children being locked</figcaption>
</figure>

However, we only know that the block is locked. We can't tell if the block was part of a group block that was locked together with the parent or if it was locked independently.

## Benefits for theme developers

The ability to lock blocks from being moved or deleted presents an interesting possibility.

Locking blocks means that people with less permissions cannot change or remove the locks but they can edit the content of the blocks but not move them or delete them.

There is also an option for `content-only editing` that would combine locking the status of child blocks with removing styling options. Rich Tabor documents it in [How to simplify WordPress patterns with content-only block editing](https://richtabor.com/content-only-editing/) but it is offered as additional material for your review since it's beyond the scope of this lesson plan.
