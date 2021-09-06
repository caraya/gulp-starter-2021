# Generating randon numbers with Sass

I've been working on a crazy idea. Create content that is randomly positioned in the page and then rotated a random percentage between a negative and a positive number. Something similar to what Dudley Storey did in [Random Stacked Images with the Web Animation API and Progressive JS](http://thenewcode.com/1093/Random-Stacked-Images-with-the-Web-Animation-API-and-Progressive-JS) but using as little Javascript as possible and without animation, just positioning the images in a random position.

The rough shape of the SCSS looks like this:

```scss
.post-it {
  top: random(400) - 100 + px;
  left: random(400) - 100 + px;
  transform: rotate(random(90) - 45 + deg);
  width: random(400) - 100 + px;
}
```

```scss
var animate = photo.animate([
  { opacity: '0', transform: 'rotate('+getRandom(-12,12)+'deg) scale(1.2)',
      boxShadow: '0 0 12px 12px rgba(0,0,0,.3)' },
  { opacity: '1', transform: 'rotate('+getRandom(-8,8)+'deg)',
      boxShadow: '0 0 6px 6px rgba(0,0,0,.3)' }
], {
  duration: 2000,
fill: 'forwards'
```
