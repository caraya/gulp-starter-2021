# Keyboard events

In addition to pointer events we should also provide a way for keyboard-only users or those users who prefer keyboard navigation to access content.  This is particularly important when using custom items like video players and others.

We'll look at how to use UI events and Keyboard Event Codes to work with our content.

## keyboard shortcuts

We can use keyboard events and the keyboard event code values to create shortcuts for our apps. In this example, also from the custom video player, we set up a `keydown` event in the window object to listen for key presses.

When the key matches one the choices in the switch statement, we do something with it depending on the key that was pressed.

If either the `space` or `enter` keys were pressed we check if the video is paused. If it is we play the video and change the pause icon to the pause one. If the video is not paused then we pause it and change the video to the play icon.

If the user pressed the left arrow key then we rewind the video 30 seconds.

If the user pressed the right arrow key then we fast forward the video 30 seconds.

```js
// Event handler for keyboard navigation
window.addEventListener('keydown', (e) => {
  switch (e.code) {
    case 'Enter': // Enter
    case 'Space': // Space
      e.preventDefault();
      if (video.paused) {
        video.play();
        playIcon.src = 'images/icons/pause.svg';
      } else {
        video.pause();
        playIcon.src = 'images/icons/play-button.svg';
      }
      break;

    case 'ArrowLeft': // Left arrow
      console.log(`back 30`);
      skip(-30);;
      break;

    case 'ArrowRight': // Right arrow
      console.log(`forward 30`)
      skip(30);
      break;
  }
});
```

So, in addition to having pointer event support for the player controls, we can also control the video playback using the keyboard.

Two things to keep in mind:

* We use the `keydown` event because it's one of the two event defined in the spec and the first event of a chain described in [Keyboard Event Order](https://w3c.github.io/uievents/#events-keyboard-event-order)
* We can get away with attaching the event to the window because the example has one large video on the page an no other elements that will interaact with the elements where we listen


## What else can we do?

As with many other web items we just scratched the surface of what we can do with keyboard events. In a full-fledged app we can add keyboard shortcuts that use different keyboard combinations, just like desktop apps.

There are more ways to use the keyboard. Still thinking about it.

## Links and Resources

* [UI Events](https://w3c.github.io/uievents/#interface-keyboardevent)
* [UI Events KeyboardEvent code Values](https://www.w3.org/TR/uievents-code/)
