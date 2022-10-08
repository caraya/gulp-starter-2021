# Using clamp() to constraint a container width

Reading [min(), max(), and clamp(): three logical CSS functions to use today](https://web.dev/min-max-clamp/) presented an interesting case for using [clamp()](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp): Controlling the width of a text-container.

In typography books we're told that text should be between 45 and 75 characters wide. Until I saw the example, I hadn't thought about using clamp in combination with the [ch](https://developer.mozilla.org/en-US/docs/Web/CSS/length) length unit to express this requirement.

In the following code snippet, we tell the browser that we want the width of the article to be 50% of the screen width but no smaller than 45ch or larger than 75ch, regardless of the viewport size.

```css
article {
  width: clamp(45ch, 50%, 75ch);
}
```
