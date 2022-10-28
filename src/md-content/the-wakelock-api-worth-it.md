# The Wakelock API: worth it?

The Wakelock API presents a way to to prevent devices from dimming or locking the screen when an application needs to keep running.

For example:

Applications like [Art Space Tokyo](https://read.artspacetokyo.com/) would benefit from the browser not going to sleep while using maps to reach the different art spaces and museums discussed in the book.



[Stay awake with the Screen Wake Lock API](https://web.dev/wake-lock/)

```js
if ('wakeLock' in navigator) {
  // Screen Wake Lock API supported 🎉
}
```
