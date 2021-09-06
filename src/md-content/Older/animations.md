# Looking at animations again... 3 ways to animate content on your page 

We've been able to animate content both in 2D and 3D for a while now. The animation effects range from the subtle UX enhancements like material design ripples for buttons and floating action buttons to full on web motion comics, animation exercises and music videos like the example below from Rachel Nabors.
 
The simplest way of understanding an animation is	that it is the change of presentational aspects of an element (height, width, color, etc.) over time. In short, animations are presentation, even if prior to CSS3 Transitions and Animations, they could only be achieved via JavaScript.
 
 <p data-height="605" data-theme-id="light" data-slug-hash="rCost" data-default-tab="result" data-user="rachelnabors" data-embed-version="2" data-pen-title="Complete CSS3 + HTML5 music video" data-preview="true" class="codepen">See the Pen <a href="http://codepen.io/rachelnabors/pen/rCost/">Complete CSS3 + HTML5 music video</a> by Rachel Nabors (<a href="http://codepen.io/rachelnabors">@rachelnabors</a>) on <a href="http://codepen.io">CodePen</a>.</p>
 <script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

For this post I will concentrate in 2D animations since they are the ones with the biggest return of investment for the work we will do. 

The post is divided in three sections:

1. Using CSS 2D animations
2. Using the Web Animation API
3. Using GSAP (Green Sock Animation Platform)

# Using CSS 2D animations

The easiest way to create an animation is using CSS. All CSS animations are keyframe based meaning that you write the number of steps that you want to use and what the status for the property you're animating is at each one of those steps. 
 
At its simplest a web animation looks like this with the following HTML representing the object I want to animate:

```html
<div class='box'></div>
```

And the CSS below defining three items for our animation

* The dimensions of the object we want to animate (`height` and `width`)
* An animation property that defines:
  * The name of the animation
  * How long does it last
  * How many times it repeats itself

When defining the element we want to animate we give it the animation properties using the animation property. In the first example we use the animation shorthand property to indicate the name of the animation, how long do we want it to last and the direction we want it to move in (in this case we tell it to alternate forward and back).

```css
/* Defines the object we'll animate */
.box {
  height: 100px;
  width: 100px;
  background-color: rebeccapurple;
  animation: move 2s 5 alternate;
}
```
You can also specify individual properties for each characteristic of the animation. The example below is equivalent to the one above but spells out each of the properties for the animation. 

```css
.box {
  height: 100px;
  width: 100px;
  background-color: rebeccapurple;
  animation-name: move;
  animation-duration: 2s;
  animation-iteration-count: 5;
  animation-direction: alternate;
}
```
We'll discuss this in more detaul when we talk about the animation shorthand versus long hand syntax. 

We then define the keyframes for our animation as two or more steps indicated by percentages and the condition we want for the property that stag e of the animation. In the example below we define a minimal `@keyframes` with an ending step (`100%`) with the background color #ff4136. We could add a starting keyframe (`0%`) with the initial color but the initial color for our box is already defined so a keyframe with it is not necessary. 

```css
@keyframes pulse {
  100% {
    background-color: #ff4136;
  }
}
```

We can also setup multiple steps of the animation together if they have the same value. In this example both the initial and final keyframes (`0%` and `100%`) have the same background color so we can chain them together using their values in a comma separated list... we could omit the `0%` value in our keyframes since the color is initially defined in the selector but I'd rather be redundant than confused. 

```css
/* defines the animation keyframes*/
@keyframes pulse {
  0%, 100% {
      background-color: rebeccapurple;
  }  
  50% {
    background-color: #FF4136;
  }
}
```


## How many keyframes do we need?

> Thanks to [Rachel Nabors](https://twitter.com/rachelnabors) for answering questions I had about this. 

This is a tricky question that depends a lot on the effect that you want to accomplish. Generally you only need as many keyframes as it takes to express the animation concisely and you can omit initial and ending values (`0%` and `100%`) when it's safe to do so and depending on the property or properties that you're animating; if the default value for the property is none rathern than 0 then you do want an initial value. 

Compare an animation like the one below with only three steps (Codepen: [http://codepen.io/caraya/full/RKWwpR/](http://codepen.io/caraya/full/RKWwpR/))  

```css
@keyframes move {
  25% {
    margin-left: 25px;
  }
  
  50% {
    margin-left: 50px;
  }
  
  100% {
    margin-left: 100px;
  }
}
```


And the same animation with 10 steps (Codepen: [http://codepen.io/caraya/full/JEYKyg/](http://codepen.io/caraya/full/JEYKyg/))

```css
@keyframes move {
  10% {
    marging-left: 10px;
  }
  
  20% {
    margin-left: 20px;
  }
  
  30% {
    margin-left: 30px;
  }
  
  40% {
    margin-left: 30px;
  }
  
  50% {
    margin-left: 50px;
  }
  
  60% {
    margin-left: 60px;
  }
  
  70% {
    margin-left: 70px;
  }
  
  80% {
    margin-left: 80px;
  }
  
  90% {
    margin-left: 90px;
  }
  
  100% {
    margin-left: 100px;
  }
}
```

Again the number of steps for your animation will depend on what your objective is and how smooth your animation has to be. The animation for a three pulse ripple-like effect needs less steps than a polished animation like Rachel Nabors' Alice in Wonderland. 

Step based animation may be another alternative to using (too) many keyframes. 

## Can we change the way an animation plays?

CSS animations have several timing functions and allows for custom bezier-curve based animations. The attribute that controls the timing function is `animation-timing-function`. 

The predefined values are the following:

```css
.foot {
  animation-timing-function: ease;
}

.foot {
  animation-timing-function: ease-in;
}

.foot {
  animation-timing-function: ease-out;
}

.foot {
  animation-timing-function: ease-in-out;
}

.foot {
  animation-timing-function: linear;
}

.foot {
  animation-timing-function: step-start;
}

.foot {
  animation-timing-function: step-end;
}
```

We can also create custom animations using custom [Bezier Curves](https://www.wikiwand.com/en/B%C3%A9zier_curve) to create the type of animation you want to have. Lea Verou create a [Bezier Curve Generator](http://lea.verou.me/2011/09/a-better-tool-for-cubic-bezier-easing/) to make it easier to generate custom bezier animation values.   

```css
/* Function values */
.foot {
  animation-timing-function: cubic-bezier(0.1, 0.7, 1.0, 0.1);
}
```

To use the tool go to [http://cubic-bezier.com/](http://cubic-bezier.com/) and play with the curve until you're happy with the results. Once you're happy then copy the `cubic-bezier` element from the site along with the values as the value of your `animation-timing-function` css. 

This is more complex than the predefined values but it's also the most flexible, if you're patient enough to play with the values you can get pretty amazing animations for your elements.

The last type of animation I want to talk about is the one I understand the least. Step based animations. 


```css
.foo {
  animation-timing-function: steps(4, start);
}

.foo {
  animation-timing-function: steps(4, end);
}
```

Rather than move the animation between states (for each step in the `@keyframes`) step based animations work by breaking the animation into a number of steps and a direction where we want the first step of our animation to happen.
  
the second parameter, direction, needs a little more explaining. The best explanation I found is from [designmodo](https://designmodo.com/steps-css-animations/):

>The second parameter defines the point at which the action declared in our @keyframes will occur. This value is optional and will default to “end” if left unspecified.  A direction of “start” denotes a left-continuous function and our animation’s first step will be completed as soon as the animation begins. It will jump immediately to the end of the first step and stay there until the end of this step duration.
 
> A direction of “end” denotes a right-continuous function and directs the movement to stay put until the duration of the first step is completed. Each option essentially moves the element from a different side and will produce different positioning for the same animation.
 
<figure>
  <img src="https://designmodo.com/wp-content/uploads/2014/03/stepsvisual.png" alt="">
  <figcaption>Difference btween steps start and end</figcaption>
</figure>

I'll update this as I learn more about steps and how to best use them.  

## Do we need to start the animation right away?

No, we can add delays to animations to make animations start after the page has loaded or create sequences of animations by delaying the starts of different animations to fit the needs of the project. 

The `animation-delay` property controls the time between the element being loaded and the start of the animation sequence. 

Let's take this two divs

```html
<div class='boxes box1'></div>
<div class='boxes box2'></div>
```

And the following CSS where we perform the following taks:

* Create a class to style the boxes `.boxes`
* Set up the animation characteristics for our first element, `.box1` 
* Set up the animation characteristics for our second element, `.box2`. Not that the animation for `.box2` will start 2 seconds after the animation for `.box1`
* We define the @keyframes for our move animation

```css
.boxes {
  height: 100px;
  width: 100px;
  background-color: rebeccapurple;
}

.box1 {
  animation-name: move;
  animation-duration: 2s;
  animation-iteration-count: 5;
  animation-direction: alternate;
}

.box2 {
  animation-delay: 2s;
  animation-name: move;
  animation-duration: 2s;
  animation-iteration-count: 5;
  animation-direction: alternate;
}

@keyframes move {
  100% {
    margin-left: 1000px;
  }
}
```

If you see the example (Codepen: [http://codepen.io/caraya/full/wgGdeO/](http://codepen.io/caraya/full/wgGdeO/)) you will see that the second block starts 2 seconds after the first, everything else is identical for both boxes. I use the longhand animation syntax because I don't trust myself not to trigger the pitfalls from the shorthand syntax. 

## Do we have any control over pre and post animation state?

There is a property for that :)

> The animation-fill-mode property defines what values are applied by the animation outside the time it is executing.

That's a mouthful. Let's unpack what it really does and what values are available. 

The attribute sets which values are applied before/after the animation. For example, you can set the last state of the animation to remain on screen, or you can set it to switch back to before when the animation began.

### Possible values

`none` is the default value. Only time when you'd set it manually is when you're working with Javascript to change it to or from none to a different value.
 
<p data-height="265" data-theme-id="light" data-slug-hash="oBxKNK" data-default-tab="css,result" data-user="caraya" data-embed-version="2" data-pen-title="animation-fill-mode  v1" data-preview="true" class="codepen">See the Pen <a href="http://codepen.io/caraya/pen/oBxKNK/">animation-fill-mode  v1</a> by Carlos Araya (<a href="http://codepen.io/caraya">@caraya</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

Using `forwards` as the value of the `animation-fill-mode` property tells the browser that we want to keep the values of the last keyframe displayed after the animation has finished. 

<p data-height="270" data-theme-id="light" data-slug-hash="VPaoLw" data-default-tab="result" data-user="caraya" data-embed-version="2" data-pen-title="animation-fill-mode  v2" class="codepen">See the Pen <a href="http://codepen.io/caraya/pen/VPaoLw/">animation-fill-mode  v2</a> by Carlos Araya (<a href="http://codepen.io/caraya">@caraya</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

A value of `backwards`, upon finishing the animation, gives the element the styles that it had before the animation began. 

<p data-height="265" data-theme-id="light" data-slug-hash="OWNKzj" data-default-tab="css,result" data-user="caraya" data-embed-version="2" data-pen-title="animation-fill-mode  v3" class="codepen">See the Pen <a href="http://codepen.io/caraya/pen/OWNKzj/">animation-fill-mode  v3</a> by Carlos Araya (<a href="http://codepen.io/caraya">@caraya</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

In this particular example we did not define an initial value it will revert to the default values for the attributes we are animating (0px and the color assigned in the CSS declaration). 
 
The final value we’ll look at is `both`. This value tells the browser to apply the effects of both forwards and backwards.

<p data-height="236" data-theme-id="light" data-slug-hash="zNqgWV" data-default-tab="result" data-user="caraya" data-embed-version="2" data-pen-title="animation-fill-mode  v4" class="codepen">See the Pen <a href="http://codepen.io/caraya/pen/zNqgWV/">animation-fill-mode  v4</a> by Carlos Araya (<a href="http://codepen.io/caraya">@caraya</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

This is another case when we don't have a beginning value so rather than take defaults and have to figure out what the results are it just takes the ending values and use those as the values for the animation. 

## can we play/pause an animation?

Yes, you can but this is another property that is better used as a starting point for workig with Javascript in your animation. `animation-play-state` controls whether the animation is playing or not. It may also be useful when working with multiple animations that we want to play at different times when used in combinations with delays in animations. 

The Pen below, based on [Sara Soueidan](https://twitter.com/SaraSoueidan) [CSS Reference Demo](https://tympanus.net/codrops-playground/SaraSoueidan/oKZxPS3X/editor) for animation-play-state adds a button that will toggle adding a `.paused` class where all we do is add `animation-play-state: paused` to pause the animation playback. 

<p data-height="265" data-theme-id="light" data-slug-hash="ZLOzBE" data-default-tab="result" data-user="caraya" data-embed-version="2" data-pen-title="animation-play-state  v1" data-preview="true" class="codepen">See the Pen <a href="http://codepen.io/caraya/pen/ZLOzBE/">animation-play-state  v1</a> by Carlos Araya (<a href="http://codepen.io/caraya">@caraya</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

## Can we have more than one animation in a given element?

Sure can. As long as we're mindful of the impact that CSS animations can have on overall browser performance (please don't blame me if 10 animations bring your page performance to the ground, you've been warned) you can attach multiple animations to the same element. 

Using our standard box div element shown below

```html
<div class='box' id='box'></div>
```

And the following CSS to configure the element (size and initial colors) and the animations we want to attach to it. We set a comma separate list of values for all attributes except duration. In this case the browser will follow the spec and duplicate existing values until all the necessary values are filled. 
 
In cases like this I prefer to use the longhand syntax. When working on the demo using shorthand I made so many mistakes that now I'm skittish and prefer the extra typing. 

```css
/* Defines the object we'll animate */
.box {
  height: 100px;
  width: 100px;
  background-color: rebeccapurple;
  animation-name: move, pulse;
  animation-duration: 5s, 2s;
  animation-iteration-count: 4, 4;
  animation-direction: alternate;
}
```

We ten define the keyframes as normal except that this time we define two of them rather than a single one like we've done so far. 

```css
@keyframes move {
  100% { 
    margin-left: 1000px;
  }
}

@keyframes pulse {
  100% {
    background-color: blue;
  }
}
```
## That's a lot of writing, is there a shorthand?

Yes, but use it at your own risk. For anything other than simple animations the shorthand syntax can get really confusing really quickly (at least it did for me). The pseudocode for the shorthand is:

```css
.foo {
  animation:
    <animation-name> ||
    <animation-timing-function> || 
    <animation-delay> || 
    <animation-iteration-count> || 
    <animation-direction> || 
    <animation-fill-mode> || 
    <animation-play-state> ||     
}
```

## What can we animate?

Saddly, or fortunately depending on how you look at animations, not all CSS properties are animatable. [Mozilla Developer's Network](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties) hosts a list of CSS animatable properties.

# An easier way the web animation API

The [Web Animation API](https://www.w3.org/TR/web-animations-1/) seeks to unify CSS transitions and animations with SMIL-based SVG animations under one API making it easier to implement on the browser side and easier to learn for designers and developers.
                                                
The first thing to notice, this is a Javascript API that manipulates animations' timings and controls. As such we need to make sure that the browser has scripting enabled and the browser supports WAAPI. If it doesn't there's a good [polyfill](https://github.com/web-animations/web-animations-js) maintained by Google that will bring older browser up to part with supporting browsers.
 
For this example we'll brake the code into three sections, the first one is the html we'll animate. It's a simple div with a number inside. 
 
```html
<div class='boxes box1'>1</div>
```

I've added CSS to center the number 1 in the box both vertically and horizontally (yay for Flexbox) and provide size and initial background color for the box. 

```css
.boxes {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  
  height: 100px;
  width: 100px;
  background-color: rebeccapurple;
}
```

In the Javascript I use `querySelector` to select the element I want to animate. I'm animating a single object. If I want to select more than one I would use `querySelectorAll` instead. 
 
Then I apply the `animate` method and pass it two arrays: 

* An array of one or more object containing the properties we want to animate
* An array with the properties of the animation (duration, count and direction in this case)

```javascript
var elem = document.querySelector('.boxes');
var animation = elem.animate({
  transform: [
    'translateX(500px)',
    'translateY(500px)',
    'translateX(500px)',
    'translateY(500px)'
  ], 
  color: [
    'rebeccapurple',
    'red',
    'blue',
    'white'
  ],
  opacity: [
    1,
    0.5,
    0.75,
    1
  ],
}, {
  direction: 'alternate',
  duration: 4000,
  iterations: 10,
});
```

We can shorten the code by creating arrays inside the animation call. Instead of using different arrays for each set of properties (transform, color and opacity) we take one element of each array and populate an array with them. 

The resulting code looks like the code below and the result of the the two versions is identical (at least when I tested both versions in Codepen). Note that you animation step arrays don't need to have the same number of items.  

```javascript
var elem = document.querySelector('.boxes');
var animation = elem.animate([
  { transform: 'translateX(500px)', color: 'rebeccapurple', opacity: '1'  },
  { transform: 'translateY(500px)', color: 'red', opacity: '0.5' },
  { transform: 'translateX(500px)', color: 'blue', opacity: '0.75' },
  { transform: 'translateY(500px)', color: 'white', opacity: '1' }
], {
    duration: 4000, //milliseconds
    easing: 'ease-in-out', //'linear', a bezier curve, etc.
    // delay: 10, //milliseconds
    iterations: Infinity, //or a number
    direction: 'alternate', //'normal', 'reverse', etc.
    fill: 'none'
    // fill: 'forwards' //'backwards', 'both', 'none', 'auto'
});
```

You can animate the same set of properties than you can in CSS animations (although this may change in the future) in a more concise and fuller API. We'll explore some of these additional features and how we'll make it work in a similar way to CSS animations.    


### Player controls

One of the things I find most frustrating about CSS animations is that there is no way to pause or reset an animation after it has started. Using WAAPI we can programmatically control the play status of an animation. 
 
First modification to our animation is to add buttons to control the playback status. I was lazy and chose not to do a toggle button for play and pause and keep them as separate buttons. In a real application I would take the extra time and code a toggle play/pause button.  
```html
<div class='boxes box1'>1</div>

<div class="nav">
  <button id="play">Play</button>
  <button id="pause">Pause</button>
  <button id="cancel">Cancel</button>
  
</div>
```

In the script we add variables to represent the buttons and event listeners that will cause the animation to do something (play, pause or reset the animation). We also start the animation paused to give the user the option of when to start it, if they want to start it at all.

```javascript
// animation starts paused
animation.pause();

// add event listener to control animation playback
var play = document.getElementById("play");
var pause = document.getElementById("pause");
var cancel = document.getElementById("cancel");


play.addEventListener("click", () => {
    animation.play()
}, false);

pause.addEventListener("click", () => {
    animation.pause()
}, false);

cancel.addEventListener("click", () => {
    animation.cancel()
}, false);
```

### controlling animation speed

We can also control the speed of the animation programmatically using the `playbackRate` method of WAAPI.  There may be cases like animations explaining a procedure in an educational site or the relationship between two concepts where it would be awesome if you coulld slow down and/or speed up the animation. 

We had three new nuttons to the page.
```html
<h2>playback speed</h2>
  <button id="slower">0.5x</button>
  <button id="normal">1x</button>
  <button id="faster">2x</button>
```

And then add the associated click event handlers to make it play at half speed, normal speed and double speed. These values are hardcoded in, we can't change how fast is the fast animation or how slow is the slow. We'll address this in the next iteration. 

```javascript
var slower = document.getElementById("slower");
var normal = document.getElementById("normal");
var faster = document.getElementById("faster");

slower.addEventListener("click", () => {
  animation.playbackRate = 0.5; 
}, false);

normal.addEventListener("click", () => {
  animation.playbackRate = 1; 
}, false);

faster.addEventListener("click", () => {
  animation.playbackRate = 2; 
}, false);
```

In the previous example we hardcoded the values for the slower and faster speeds. It wold be cool if the values were customizable. One way to do so is to use [assignment operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Assignment_Operators) to change the values by a small step every time the button is clicked. 

We modify the event listeners so that, instead of assigning a specific value to the `playbackRate` attribute we increase it or decrease it by 0.1 every time the corresponding button is clicked. The code now looks like this:

```javascript
var slower = document.getElementById("slower");
var normal = document.getElementById("normal");
var faster = document.getElementById("faster");

slower.addEventListener("click", () => {
  animation.playbackRate -=0.1; 
}, false);

normal.addEventListener("click", () => {
  animation.playbackRate = 1; 
}, false);

faster.addEventListener("click", () => {
  animation.playbackRate += 0.1; 
}, false);
```
If you use a negative value for `playbackRate` the animation will play backwards. The code below creates a button to play the animation in reverse. 

```javascript
var reverse = document.getElementById("reverse");

reverse.addEventListener("click", () => {
  animation.playbackRate =-1;
}, false);
```

One last thing to note. The code to slow the animation will eventually stop it since decreasing the playback rate will eventually makes it 0. This may be ok for some cases and not for others. If this is not ok for a specific use case we can put an if statement in the slower function to make the lowest value something we can control, something like this:
 
```javascript
slower.addEventListener("click", () => {
  animation.playbackRate -=0.1;
  // don't let the animation stop
  if (animation.playbackRate == 0) {
    animation.playbackRate = 0.1;
  }
}, false);
```

We also need to make sure that users can distinguish the difference between the steps of animation speed. Perhaps 0.1 is too subtle a speed increase or decrease. It all depends on your project and your users. 
 
## motion paths

> Work in this section is adapted with many thanks from work by Dan Wilson presented in [his blog](http://danielcwilson.com/blog/2015/09/animations-part-5/) and modified as I finally start to learn how this works. 

I've always the idea of animating objects on a path, a predefined set of coordinates. I've seen this a lot in Flash and SVG/SMIL based animations but SMIL has been retired or at least deprecated in most browsers (if it was ever implemented at all) so developers were left with hacks and using SVG to create the animation (and hope that browsers will not remove SMIL for a while yet). 

Motion is important and the W3C acknowledges that. They've put together a [Motion Pat Module, level 1](https://drafts.fxtf.org/motion-1/) that addresses how to use motion paths in CSS. WAAPI leverages this module when working with motion on a path.

We first create the HTML elements for the example. The content of the support class div will be populated from the script later in the process. 

```html
<h1>Motion Path Exercise</h1>

<div class="support"></div>

<div class="circle"><i>1</i></div>
<div class="circle"><i>2</i></div>
<div class="circle"><i>3</i></div>
<div class="circle"><i>4</i></div>
<div class="circle"><i>5</i></div>
<div class="circle"><i>6</i></div>
<div class="circle"><i>7</i></div>
<div class="circle"><i>8</i></div>
<div class="circle"><i>9</i></div>
<div class="circle"><i>10</i></div>
```

In the CSS area we define and format the HTML as circles with numbers within them. We use Flexbox to center the number inside the circle and use the [will-change](https://developer.mozilla.org/en-US/docs/Web/CSS/will-change) property. The descriptions and caveats from MDN are very important... if you abuse the property it will stop working so use it sparingly and with as few properties as possible. 

```css
.circle {
  z-index: 1;
  position: absolute;
  top: 6rem;
  left: 0;
  width: 3rem;
  height: 3rem;
  margin: 0 auto;
  display: none;
  justify-content: center;
  align-items: center;
}

.circle i {
  display: flex;
  justify-content: center;
  align-items: center; 
  width: 3rem;
  height: 3rem;  
  border-radius: 50%;
  border: 1px solid #000;
  background: #fff;
  color: #00f;
  transform-origin: 50% 50%;
  will-change: transform;
}
```

We use feature queries to detect the syntax that we need to use in a given version of a browser. If the browser doesn't support Motion Paths at all neither of these queries will be added to the document and it's left up to the developer to provide an alternative... we don't want to exclude people from our project so we use motion path as a progressive enhancement and work with a different animation technique or library (possibly GSAP) is motion path is not supported in your target browsers.
    
The CSS below tells the browser what path to animate on. The Javascript will actually execute the animation. 

> I created the path in Illustrator, export the `.ai` file as svg, open it with my text editor and extract the path element and copied it to the CSS.  

```css
/* implemented in Chrome 46+ */
@supports (motion-offset: 0) {
  .circle {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    motion-offset: 100%;
    motion-path: path("M73.6462,149.5409c42.5436-42.5436,137.2421-16.8221,211.515,57.4508s99.9944,168.9713,57.4508,211.515s-137.2421,16.8221-211.515-57.4508S31.1026,192.0845,73.6462,149.5409z");
    will-change: motion-offset;
  }
}

/* This is the latest spec as of September 2016 */
@supports (offset-distance: 0) {
  .circle {
    display: block;
    offset-distance: 100%;
    offset-path: path("M73.6462,149.5409c42.5436-42.5436,137.2421-16.8221,211.515,57.4508s99.9944,168.9713,57.4508,211.515s-137.2421,16.8221-211.515-57.4508S31.1026,192.0845,73.6462,149.5409z");
    will-change: offset-distance;
  }
}
```

We're almost there, promise. There are a few things to go in the script that we haven't discussed before and we need to unpack. 

As always we first capture all the elements we want to animate (all elements with class circle) using [querySelectorAll](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll) and assign them to a variable (m).   

We then use the [CSS Support Javascript API](https://developer.mozilla.org/en-US/docs/Web/API/CSS/supports) to test what version of the Motion Path API we support.

The last step in this section is to define the keyframes object.
 
```javascript
var m = document.querySelectorAll('.circle');

//This is the latest spec as of September 2016
var supportsOffsetDistance = CSS && CSS.supports && CSS.supports('offset-distance', 0);

// What's implemented in Chrome 46+
var supportsMotionOffset = CSS && CSS.supports && CSS.supports('motion-offset', 0);

//motion properties are the old spec
var keyframes = [{
  offsetDistance: '100%',
  motionOffset: '100%'
}, {
  offsetDistance: 0,
  motionOffset: 0
}];
```

This is the meat of the script. We only run this part of the script if we support Motion paths, otherwise it makes no sense to busy the browser with something we won't be able to use anyways. 

If we support either method of Motion Path, then create a [for loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration#for_statement) to animate each object in our 'objects to be animated' array.

The only other funky thing is the delay parameter. We set it to the value of the time variable times the element's index divided by the length of our 'objects to animate' list (querySelectorAll doesn't create an array). 

```javascript
if (supportsOffsetDistance || supportsMotionOffset) {
  var time = 9000;
  for (var i = 0, len = m.length; i < len; ++i) {
    var player = m[i].animate(keyframes, {
      duration: time,
      iterations: Infinity,
      fill: 'both',
      easing: 'ease-in',
      delay: time * (i / m.length)
    });
 }
```

After all the work is done and since this is a learning experience we tell the user if their browser supports motion path or not and, if it does, which version of the API works on their browser.
  
```javascript
  document.querySelector('.support').innerHTML = 'This browser supports it via the <code>' + (supportsOffsetDistance ? 'offset' : 'motion') + '</code> properties';
} else {
  document.querySelector('.support').textContent = 'This browser does not support it';
}
```

## Keyframe Constructor and KeyframeEffects

So far we've only used the animate style of buidling animations. To recap, this is the way we build an animation using animate. 

```javascript
var elem = document.getElementById('myAnimation');
var timings = {
  duration: 1000,
  fill: 'both'
}
var keyframes = [
  { opacity: 1 }.
  { opacity: 0 }
];

elem.animate(keyframes, timings);
```
### KeyframeEffect

A KeyframeEffect takes three parameters: the element to animate, an array of keyframes, and our timing options. We've seen all these attributes before when using animate. The difference is that the effect will not play automatically and serve as the base for the other effectss we'll discuss in this section. 

```javascript
var effect = new KeyframeEffect(elem, keyframes, timings);
```

### KeyframeConstructor

Using the same timings and keyframes as the example above we can use a constructor-style approach to build an animation. We first build a keyframeEffect 

The primary difference here is that the animation does not start playing immediately, so this will be useful when creating animations in advance to be played later.

We then create a new Animation object and pass it two parameters, the animation (in this case the keyframeEffect we created) and a timeline object (in this case we use `ownerDocument` to get the root document element and use its timeline).

When creating animations this way the animation will not play until we actually tell it to by calling the play method. This way we can build all the animations before playing them. 

```javascript
var kEffect = new KeyframeEffect(elem, keyframes, timings);
var player = new Animation(kEffect, elem.ownerDocument.timeline);
player.play();
```


## The future: GroupEffects &amp; SequenceEffects 

Neither groupEffect or SequenceEffect made it to browsers or the level 1 specification, they are part of the level 2 spec drafts.  They provide programmatic ways to group and sequence animations. 

While these features haven't made it to the browsers there is an [experimental version](https://github.com/web-animations/web-animations-js/blob/dev/docs/experimental.md) of the Polyfill that supports these upcoming features. 

### GroupEffect

The GroupEffect groups one or more KeyframeEffects to play simultaneously.

We create an array of keyframeEffects and pass it to the groupEffect constructor. We can then play the entire group simultaneously in our default document timeline whenever we're ready to do so. 

In this example we create the following HTML. It's important to remember that we are using forward-looking features so we must include the `next` polyfill to make this work. This will be required until native implementations of the level 2 specification start hitting browsers. 
  
```html
<div id="i0">1</div>
<div id="i1">2</div>
<div>
    <div id="o0">A</div>
    <div id="o1">B</div>
</div>
<button id="player">Play</button>

<script src="scripts/web-animations-next.min.js"></script>
```

We add some CSS to make it look pretty. The only special thing here is the use of [attribute selector](https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors) to match the items we want to animate. 

```css
body {
    background: #3d6644;
    text-align: center;
}

[id^="i"],
[id^="o"] {
    border-radius: 50%;
    margin-top: 1rem;
    font-size: 2rem;
    color: #f9f7fb;
    display: inline-block;
}

#player {
    margin-top: 3rem;
    font-size: 1rem;
    background: transparent;
    border: 2px solid #f9f7fb;
    color: #f9f7fb;
    padding: .6rem;
    border-radius: .6rem;
}

#player:active {
    transform: scale(.9);
}
#player:disabled {
    opacity: .2;
}
```

Again, because this is a Javascript API,  this will be the largest part of the project.
 
We create two arrays using `slice.call` to convert a list of nodes returned by `querySelectorAll`. Rach array contains elements starting with a different letter (i and o). We also initialize two objects to hold our keyframe effects. 

```javascript
let ms = Array.prototype.slice.call(document.querySelectorAll('[id^=i]'));
let ts = Array.prototype.slice.call(document.querySelectorAll('[id^=o]'));
let keyframeEffects = [];
let keyframeEffects2 = [];
```

We then define our animation effects. The only thing to notice is the offset attribute for each step: it is a 0-to-1 equivalent to setting the percentages when working with CSS based keyframes. The objective is the same.
 
The last part of this section initializes the timings for the animations. We'll use the same timing for both our animations so we keep a single array for the timings of the animations.   

```javascript
let effects = {
  translations1: [
      { transform: 'translateX(0px)', offset: 0 },
      { transform: 'translateX(500px)', offset: .7 },
      { transform: 'translateX(0px)', offset: 1 }
  ],
  translations2: [
      { transform: 'translateX(0px)', offset: 0 },
      { transform: 'translateX(-500px)', offset: .7 },
      { transform: 'translateX(0px)', offset: 1 }
  ]
};
let timing = {
  duration: 1000,
  easing: 'ease-in',
  fill: 'both',
  iterations: 1
};
```

Next we create keyframe effects and push them to our empty keyframeEffects array. This is how you create multiple objects with the same animation and timing functions. Also be aware that we are using keyframe effects rather than calling animate directly because we want to have more control regarding when we start the animations.  

```javascript
//Create a KeyframeEffect for each element (this will not kick off any animation)
ms.forEach((el) => {
  let effect = new KeyframeEffect(el, effects.translations1, timing);
  keyframeEffects.push(effect);
});
ts.forEach((el) => {
  let effect = new KeyframeEffect(el, effects.translations2, timing);
  keyframeEffects2.push(effect);
});
```

Using the keyframe effects we just create we create two group effects, one for each set of animations and a group effect to play them together. We only play the last effect we define 

```javascript
//add the six KeyframeEffects to a GroupEffect, and play it on the doucment timeline
let groupEffectA = new GroupEffect(keyframeEffects);
let anim = document.timeline.play(groupEffectA);

let groupEffectB = new GroupEffect(keyframeEffects2);
let anim2 = document.timeline.play(groupEffectB);
```

The last thing we do is create a button to play/pause the animations. We could create a separate button to control each animation independently but for the purpose of the dmeo one size controls all will be enough. 

```javascript
let btn = document.getElementById('player');

btn.addEventListener('click', function(e) {
    if (anim.playState !== 'running') {
        anim.play();
    } else {
        anim.pause();
    }
    if (anim2.playState !== 'running') {
        anim2.play();
    } else {
        anim2.pause();
    }
});
```
## SequenceEffects

SequenceEffects, as the name implies, plays a group of animations one after the other. As defined in the polyfill, you can use GroupEffect and SequenceEffect together, having a grouping of multiple sequences without using delays or other tricks.

Using the code for our grouping example we'll change it illustrate how sequences work. We first create two sequences, one for each group of animations, then we create a third sequence containing the two individual sequences.  

We change the button to play/pause to only work with the third sequence, the one containing all the keyframe effects we built. 

```javascript
let sequenceEffectA = new SequenceEffect(keyframeEffects);
let sequenceEffectB = new SequenceEffect(keyframeEffects2);

let sequenceEffectC = new SequenceEffect([sequenceEffectA, sequenceEffectB]);
let anim3 = document.timeline.play(sequenceEffectC);

let btn = document.getElementById('player');

btn.addEventListener('click', () => {
    if (anim3.playState !== 'running') {
        anim3.play();
    } else {
        anim3.pause();
    }
});
```

## Examples and demos

* [Spiral](http://codepen.io/danwilson/pen/ZGmeRO)
* [Heart](http://codepen.io/yisi/pen/zGzJYd)
* [Triangle](http://codepen.io/ericwilligers/pen/zGRdxQ)
* [Scissors](http://codepen.io/ericwilligers/pen/pJarJO)
* [Eyes](http://jsfiddle.net/ericwilligers/v79bdL3p/)

# (Yet another) easier way using GSAP

[Green Sock Animation Platform (GSAP)](https://greensock.com/) is an animation powerhouse. It's a Javascript based library designed to animate most CSS and SVG properties. 

GSAP components are (Taken from [Getting Started with GSAP](https://greensock.com/get-started-js)):

* [TweenLite](https://greensock.com/docs/#/HTML5/GSAP/TweenLite/): the core of the engine which handles animating just about any property of any object. It is relatively lightweight yet full-featured and can be expanded using optional plugins (like CSSPlugin for animating DOM element styles in the browser, or ScrollToPlugin scrolling to a specific location on a page or div, etc.)
* [TweenMax](https://greensock.com/docs/#/HTML5/GSAP/TweenMax/): TweenLite's beefy big brother; it does everything TweenLite can do plus non-essentials like repeat, yoyo, repeatDelay, etc. It includes many common plugins too like CSSPlugin so that you don't need to load as many files. The focus is on being full-featured rather than lightweight.
* [TimelineLite](https://greensock.com/docs/#/HTML5/GSAP/TimelineLite/): a powerful, lightweight sequencing tool that acts like a container for tweens, making it simple to control them as a whole and precisely manage their timing in relation to each other. You can even nest timelines inside other timelines as deeply as you want. This allows you to modularize your animation workflow easily.
* [TimelineMax](https://greensock.com/docs/#/HTML5/GSAP/TimelineMax/): extends TimelineLite, offering exactly the same functionality plus useful (but non-essential) features like repeat, repeatDelay, yoyo, currentLabel(), and many more. Again, just like TweenMax does for TweenLite, TimelineMax aims to be the ultimate full-featured tool rather than lightweight.

The platform provides additional tools such as easing, plugins, utilities like Draggable, and others. Check the [GSAP/JS documentation](https://greensock.com/gsap) for more information. 

I see two downsides to libraries like GSAP. You're loading additional libraries that may impact application performance. The other downside is now much of the library do you need to know in order to accomplish what you want. I'll explore this in more detail as I go through this demos with the understanding that this is not a full tutorial... there is no way I can (or want to) learn everything there is about GSAP. As with most of these posts, it's meant as a starting point for current and future research. 

## Loading the library

> Place any of these scripts at the bottom of the page, before the closing `body` tag and before any scripts that use the GSAP library. If you want to use a CDN use the links below instead of local references.

We have three options to load the library, all depending on the level of complexity you need for your application. The first one is to load `TweenLite.js` and `TimelineLite.min` to work with a minimal set of functionality at a small file size. 

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.1/TweenLite.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.1/TimelineLite.min.js"></script>
```

TweenMax and TimelineMax include the lite version of each plugins with additional functionality (discussed in the description of the platform) that it's meant as a single resource to load (with less HTTP requests).
 
```html
<!--CDN link for  TweenMax-->
<script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TweenMax.min.js"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TimelineMax.min.js"></script>
```
If you're working on an HTTP2 server or are more concerned with the size of the download you can pick and choose which core components and plugins to load (a common lightweight choice is TweenLite, CSSPlugin, and EasePack). For example:

```html
<!--CDN links for TweenLite, CSSPlugin, and EasePack-->
<script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/plugins/CSSPlugin.min.js"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/easing/EasePack.min.js"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TweenLite.min.js"></script>
```

## Basic effects

Now that we've covered how to load the scripts we'll work on some basic [tweening](http://www.dictionary.com/browse/tweening). We'll use the following HTML to define the element we want to animte and load the scripts at the bottom of the page before the closing `body` tag.

```html
<div class="boxes" id="box1"></div>

<script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TweenMax.min.js"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TimelineMax.min.js"></script>
<script src="scripts/gsap1.js"></script>
```

I prefer to give the element we'll animate an initial state using CSS. It's important to remember that if you don't give explicit dimensions to your elements they will not appear  on screen. This little issue bit me several time when devloping these examples... this is why we set a height and width.  

```css
.boxes {
  background-color: #3d6644;
  border: 1px solid black;
  height: 50px;
  width: 50px;
}
```

The content of the `gsap1.js` script is listed below. I chose to use `TweenLite.to` because i've already configured the intial size of the animation. There are other values like `TweenLite.from()` and `TweenLite.fromTo()` 

```javascript
let box1 = document.getElementById('box1');

TweenLite.to("#box1", 4, 
  { backgroundColor:"#ff00ff", width:"50%", height:"250px", ease:Power2.easeInOut }
);
```

Note that since we use `TweenLite.to()` the values we provide will be treated as the final values for the animation. The color we defined in the CSS (#3d66644) and width and height at their default values (0% and 0px). 

We can also create animations that have a starting and ending position. In this example we'll animate a circle (actually a div with border radius of 50%) when the user clicks a button. 
 
we begin with our styles that will define the starting properties of the object to animate and will be the values of the object when animations don't work. 


```css
body {
    background: #eee;
    text-align: center;
}

#o1 {
    border-radius: 50%;
    border: 1px solid crimson;
    background-color: indianred;
    margin: 0 auto;
}

div > #player {
    display: block;
}
```

We then define the HTML. A button and the div container we will animate; we give IDs to both of them to reference them from the script 


```html
<div>
    <button id="player">Play</button>
</div>

<div id="o1"></div>
```

The script does two things:
 
* it sets up the animation, including the easing we'll use and the initial state for the animation. We override the default of starting the animation immediately and defer to the user clicking the button to begin the animation work
* it creates a click handler for the button where we test if the animation is working using the `isTweening` property of the TweenMax object and toggles the status of the animation (play if it's paused and paused if it's playing) and the text of the button using `innerText`.

```javascript
let o1 = document.getElementById('o1');
let player = document.getElementById('player');

// animates width and height from 0 to 200
anim = TweenLite.fromTo(o1, 10,
// Initial state
{width:0, height:0},
// Final state plus options
{width:200, height:200, ease: linear.easeNone, paused: true }

);

player.addEventListener('click', () => {
    if (TweenMax.isTweening(o1) === false) {
        anim.play();
        player.innerText="Pause";
    } else {
        anim.pause();
        player.innerText='Play';
    }
});
```

### Easing 


GSAP provides an extensive easing library. TweenLite comes with a default set of easing functions and TweenMax provides an additional set. Check the [easing visualizer](https://greensock.com/get-started-js#easing) to get an idea of what's available and how you can use those functions in your animations. 


## special properties

There is an additional set of properties for `TweenLite` that provide additional control over the animation. Rather than try to explain them, I've adapted their description from the [TweenLite documentation](https://greensock.com/docs/#/HTML5/GSAP/TweenLite/TweenLite/)

* **delay**: Number - Amount of delay in seconds (or frames for frames-based tweens) before the animation should begin
* **ease**: Ease (or Function or String) - You can choose from various eases to control the rate of change during the animation, giving it a specific "feel".  You can also define an ease by name (string) like `Strong.easeOut` or reverse style (like jQuery uses) `easeOutStrong`. The default is `Quad.easeOut`
* **paused**: Boolean - If true, the tween will pause itself immediately upon creation.
* **immediateRender**: Boolean - Normally when you create a tween, it begins rendering on the very next frame (update cycle) unless you specify a delay. However, if you prefer to force the tween to render immediately when it is created, setimmediateRender to true. Or to prevent a from() from rendering immediately, set immediateRender to false. By default, from() tweens set immediateRender to true
* **overwrite**: String (or integer) - Controls how (and if) other tweens of the same target are overwritten. There are several modes to choose from, but "auto" is the default:
    * "none" (0) (or false) - no overwriting will occur.
    * "all" (1) (or true) - immediately overwrites all existing tweens of the same target even if they haven't started yet or don't have conflicting properties.
    * "auto" (2) - when the tween renders for the first time, it will analyze tweens of the same target that are currently active/running and only overwrite individual tweening properties that overlap/conflict. Tweens that haven't begun yet are ignored. For example, if another active tween is found that is tweening 3 properties, only 1 of which it shares in common with the new tween, the other 2 properties will be left alone. Only the conflicting property gets overwritten/killed. This is the default mode and typically the most intuitive for developers.
    * "concurrent" (3) - when the tween renders for the first time, it kills only the active (in-progress) tweens of the same target regardless of whether or not they contain conflicting properties. Like a mix of "all" and "auto". Good for situations where you only want one tween controlling the target at a time.
    * "allOnStart" (4) - Identical to "all" but waits to run the overwrite logic until the tween begins (after any delay). Kills tweens of the same target even if they don't contain conflicting properties or haven't started yet.
    * "preexisting" (5) - when the tween renders for the first time, it kills only the tweens of the same target that existed BEFORE this tween was created regardless of their scheduled start times. So, for example, if you create a tween with a delay of 10 and then a tween with a delay of 1 and then a tween with a delay of 2 (all of the same target), the 2nd tween would overwrite the first but not the second even though scheduling might seem to dictate otherwise. "preexisting" only cares about the order in which the instances were actually created. This can be useful when the order in which your code runs plays a critical role
* **onComplete**: Function - A function that should be called when the animation has completed
  * **onCompleteParams**: Array - An Array of parameters to pass the onComplete function. For example,TweenLite.to(element, 1, {left:"100px", `onComplete:myFunction, onCompleteParams: [element, "param2"]});` To self-reference the tween instance itself in one of the parameters, use "`{self}`", like: `onCompleteParams:["{self}", "param2"]`
  * **onCompleteScope**: Object - Defines the scope of the onComplete function (what "this" refers to inside that function).
* **onReverseComplete**: Function - A function that should be called when the tween has reached its beginning again from the reverse direction. For example, if reverse() is called the tween will move back towards its beginning and when itstime reaches 0, onReverseComplete will be called. This can also happen if the tween is placed in a TimelineLite or TimelineMax instance that gets reversed and plays the tween backwards to (or past) the beginning.
   * **onReverseCompleteParams**: Array - An Array of parameters to pass the onReverseComplete function. For example, `TweenLite.to(element, 1, {left:"100px", onReverseComplete:myFunction, onReverseCompleteParams:[mc, "param2"]});` To self-reference the tween instance itself in one of the parameters, use "`{self}`", like: `onReverseCompleteParams:["{self}", "param2"]`
   * **onReverseCompleteScope**: Object - Defines the scope of the onReverseComplete function (what "this" refers to inside that function)
* **onStart**: Function - A function that should be called when the tween begins (when its time changes from 0 to some other value which can happen more than once if the tween is restarted multiple times)
    * **onStartParams**: Array - An Array of parameters to pass the onStart function. For example, TweenLite.to(element, 1, {left:"100px", delay:1, onStart:myFunction, onStartParams:[mc, "param2"]}); To self-reference the tween instance itself in one of the parameters, use "{self}", like: onStartParams:["{self}", "param2"]
    * **onStartScope**: Object - Defines the scope of the onStart function (what "this" refers to inside that function)
* **onUpdate**: Function - A function that should be called every time the animation updates (on every frame while the animation is active)
    * **onUpdateParams**: Array - An Array of parameters to pass the onUpdate function. For example, TweenLite.to(element, 1, {left:"100px", onUpdate:myFunction, onUpdateParams:[mc, "param2"]}); To self-reference the tween instance itself in one of the parameters, use "{self}", like: onUpdateParams:["{self}", "param2"]
    * **onUpdateScope**: Object - Defines the scope of the onUpdate function (what "this" refers to inside that function)
* **useFrames**: Boolean - If useFrames is true, the tweens's timing will be based on frames instead of seconds because it is initially added to the root frames-based timeline. This causes both its duration and delay to be based on frames. An animations's timing mode is always determined by its parent timeline
* **lazy**: Boolean - When a tween renders for the very first time and reads its starting values, GSAP will automatically "lazy render" that particular tick by default, meaning it will try to delay the rendering (writing of values) until the very end of the "tick" cycle which can improve performance because it avoids the read/write/read/write layout thrashing that some browsers do. If you would like to disable lazy rendering for a particular tween, you can set lazy:false. Or, since zero-duration tweens do not lazy-render by default, you can specifically give it permission to lazy-render by setting lazy:true like TweenLite.set(element, {opacity:0, lazy:true});
* **onOverwrite**: Function - A function that should be called when the tween gets overwritten by another tween. The following parameters will be passed to that function:
  1. **overwrittenTween**: Animation - the tween that was just overwritten
  2. **overwritingTween**: Animation - the tween did the overwriting
  3. **target**: Object [only passed if the overwrite mode was "auto" because that's the only case when portions of a tween can be overwritten rather than the entire thing] - the target object whose properties were overwritten. This is usually the same as overwrittenTween.target unless that's an array and the overwriting targeted a sub-element of that array. For example, TweenLite.to([obj1, obj2], 1, {x:100}) and then TweenLite.to(obj2, 1, {x:50}), the target would be obj2
  4. **overwrittenProperties**: Array [only passed if the overwrite mode was "auto" because that's the only case when portions of a tween can be overwritten rather than the entire thing] - an array of property names that were overwritten, like ["x","y","opacity"].
  Note: there is also a static TweenLite.onOverwrite that you can use if you want a quick and easy way to be notified when any tween is overwritten (great for debugging). This saves you the hassle of defining an onOverwrite on a tween-by-tween basis
* **autoCSS**: Boolean - Animating css-related properties of DOM elements requires the CSSPlugin which means that normally you'd need to wrap css-related properties in a css:{} object like TweenLite.to(element, 2, {css:{left:"200px", top:"100px"}, ease:Linear.easeNone}); to indicate your intent (and to tell GSAP to feed those values to the CSSPlugin), but since animating css-related properties is so common, GSAP implements some logic internally that allows you to omit the css:{} wrapper (meaning you could rewrite the above tween as TweenLite.to(element, 2, {left:"200px", top:"100px", ease:Linear.easeNone});)
* **callbackScope**: Object - The scope to be used for all of the callbacks (onStart, onUpdate, onComplete, etc.). The scope is what "this" refers to inside any of the callbacks. The older callback-specific scope properties (onStartScope, onUpdateScope, onCompleteScope, onReverseComplete, etc.) are deprecated but still work.

## Animating multiple elements with the same animation

Before we jump into working with time lines we'll look at one last case. How to animate multiple object using the same animation parameters. We'll use 2 small circles defined using HTML div elements and CSS for styling. 



```css
body {
    background: #eee;
    text-align: center;
}

.circles {
    border-radius: 50%;
    border: 1px solid crimson;
    background-color: indianred;
    height: 50px;
    width: 50px;
}

div > #player {
    display: block;
}

#o1 {
    margin-bottom: 1rem;
}
```

This time we define two circles and a play button. We also add a script tag pointing to the CDN version of TweenMax. We'll have to play with this to make sure that the script is also available when offline. 

```html
<div>
  <button id="player">Play</button>
</div>

<div class="circles" id="o1"></div>
<div class="circles" id="o2"></div>

<script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TweenMax.min.js"></script>
```

The script is not too different than what we've used before. The main difference is that instead of capturing a single element by its ID we use `getElementsByClassName` to get all the elements matching the given class.

We then use `TweenLite.to` to control the final position of the element and a linear easing function. 

We reuse the player button code from earlier examples to check if the tween is running. If it is we pause it and if it's not then we play it. 

```javascript
let circles = document.getElementsByClassName('circles');
let player = document.getElementById('player');

// creates a tween for margin-left from 0 to 800
anim = TweenLite.to(circles, 10, { marginLeft: 800, ease: Linear.easeNone });

player.addEventListener('click', function() {
    if (TweenMax.isTweening(circles) === false) {
        anim.play();
        player.innerText="Pause";
    } else {
        anim.pause();
        player.innerText='Play';
    }
});
```

## Timelines

Timelines give us finer control and additional features over the tween animations offered by `TweenMax`.  

Timeline parameters:

You can use the constructor's vars parameter to define any of the special properties below (syntax example: new TimelineLite({onComplete:myFunction, delay:2});

* **delay**: Number - Amount of delay in seconds (or frames for frames-based tweens) before the animation should begin
* **paused**: Boolean - If true, the tween will pause itself immediately upon creation
* **onComplete**: Function - A function that should be called when the animation has completed.
onCompleteScope : Object - Defines the scope of the onComplete function (what "this" refers to inside that function)
* **useFrames**: Boolean - If useFrames is true, the tweens's timing will be based on frames instead of seconds because it is intially added to the root frames-based timeline. This causes both its duration and delay to be based on frames. An animations's timing mode is always determined by its parent timeline
* **tweens**: Array - To immediately insert several tweens into the timeline, use the tweens special property to pass in an Array of TweenLite/TweenMax/TimelineLite/TimelineMax instances. You can use this in conjunction with the align and stagger special properties to set up complex sequences with minimal code. These values simply get passed to the add() method
* **align**: String - Only used in conjunction with the tweens special property when multiple tweens are to be inserted immediately. The value simply gets passed to the add() method. The default is "normal". Options are:
  1. "sequence" : aligns the tweens one-after-the-other in a sequence
  2. "start" : aligns the start times of all of the tweens (ignores delays)
  3. "normal" : aligns the start times of all the tweens (honors delays)
  * The align special property does not force all child tweens/timelines to maintain relative positioning, so for example, if you use "sequence" and then later change the duration of one of the nested tweens, it does not force all subsequent timelines to change their position. The align special property only affects the alignment of the tweens that are initially placed into the timeline through the tweens special property of the vars object.

* **stagger**: Number - Only used in conjunction with the tweens special property when multiple tweens are to be inserted immediately. It staggers the tweens by a set amount of time in seconds (or in frames if useFrames is true). For example, if the stagger value is 0.5 and the "align" property is set to "start", the second tween will start 0.5 seconds after the first one starts, then 0.5 seconds later the third one will start, etc. If the align property is "sequence", there would be 0.5 seconds added between each tween. This value simply gets passed to the add() method. Default is 0.
* **onStart**: Function - A function that should be called when the tween begins (when its time changes from 0 to some other value which can happen more than once if the tween is restarted multiple times).
  * **onStartScope**: Object - Defines the scope of the onStart function (what "this" refers to inside that function).
* **onReverseComplete**: Function - A function that should be called when the tween has reached its beginning again from the reverse direction. For example, if reverse() is called the tween will move back towards its beginning and when itstime reaches 0, onReverseComplete will be called. This can also happen if the tween is placed in a TimelineLite or TimelineMax instance that gets reversed and plays the tween backwards to (or past) the beginning.
  * **onReverseCompleteScope**: Object - Defines the scope of the onReverseComplete function (what "this" refers to inside that function).
* **onUpdate**: Function - A function that should be called every time the animation updates (on every frame while the animation is active).
  * **onUpdateScope**: Object - Defines the scope of the onUpdate function (what "this" refers to inside that function).
* **autoRemoveChildren**: Boolean - If autoRemoveChildren is set to true, as soon as child tweens/timelines complete, they will automatically get killed/removed. This is normally undesireable because it prevents going backwards in time (like if you want to reverse() or set the progress lower, etc.). It can, however, improve speed and memory management. The root timelines use autoRemoveChildren:true.
* **smoothChildTiming**: Boolean - Controls whether or not child tweens/timelines are repositioned automatically (changing their startTime) in order to maintain smooth playback when properties are changed on-the-fly. For example, imagine that the timeline's playhead is on a child tween that is 75% complete, moving element's left from 0 to 100 and then that tween's reverse() method is called. If smoothChildTiming is false (the default except for the root timelines), the tween would flip in place, keeping its startTime consistent. Therefore the playhead of the timeline would now be at the tween's 25% completion point instead of 75%. Remember, the timeline's playhead position and direction are unaffected by child tween/timeline changes. element's left would jump from 75 to 25, but the tween's position in the timeline would remain consistent. However, if smoothChildTiming is true, that child tween's startTime would be adjusted so that the timeline's playhead intersects with the same spot on the tween (75% complete) as it had immediately before reverse() was called, thus playback appears perfectly smooth. element's left would still be 75 and it would continue from there as the playhead moves on, but since the tween is reversed now element's left will travel back towards 0 instead of 100. Ultimately it's a decision between prioritizing smooth on-the-fly playback (true) or consistent position(s) of child tweens/timelines (false). Some examples of on-the-fly changes to child tweens/timelines that could cause their startTime to change when smoothChildTiming is true are: reversed, timeScale, progress, totalProgress, time, totalTime, delay, pause, resume, duration, and totalDuration.
* **onCompleteParams**: Array - An Array of parameters to pass the onComplete function. For example, new TimelineLite({onComplete:myFunction, onCompleteParams:["param1", "param2"]}); To self-reference the timeline instance itself in one of the parameters, use "{self}", like: onCompleteParams:["{self}", "param2"]
* **onStartParams**: Array - An Array of parameters to pass the onStart function. For example, new TimelineLite({onStart:myFunction, onStartParams:["param1", "param2"]}); To self-reference the timeline instance itself in one of the parameters, use "{self}", like: onStartParams:["{self}", "param2"]
* **onUpdateParams**: Array - An Array of parameters to pass the onUpdate function. For example, new TimelineLite({onUpdate:myFunction, onUpdateParams:["param1", "param2"]}); To self-reference the timeline instance itself in one of the parameters, use "{self}", like: onUpdateParams:["{self}", "param2"]
* **onReverseCompleteParams**: Array - An Array of parameters to pass the onReverseComplete function. For example, new TimelineLite({onReverseComplete:myFunction, onReverseCompleteParams:["param1", "param2"]}); To self-reference the timeline instance itself in one of the parameters, use "{self}", like: onReverseCompleteParams:["{self}", "param2"]
  * **callbackScope**: Object - The scope to be used for all of the callbacks (onStart, onUpdate, onComplete, etc.). The scope is what "this" refers to inside any of the callbacks. The older callback-specific scope properties (onStartScope, onUpdateScope, onCompleteScope, onReverseComplete, etc.) are deprecated but still work.


The HTML and CSS are the same as the prior example animating multiple objects with the same animation. The script will change as we'll leverage several features available on GSAP:

1. We create a timeline to sequence the events
2. We capture the objects to animate into variables that will be used later in the script
3. We animate the objects in sequence
    1. We animate the objects as a group with the same animation
    2. We then animate each object individually with a different easing function
4. We play the timeline

```javascript
// captures the timeline
let timeline = new TimelineLite(); // 1
// all animatable elements
let circles = document.getElementsByClassName('circles'); // 2
// Individual animatable elements
let elem1 = document.getElementById('o1');
let elem2 = document.getElementById('o2');
// Play button
let play = document.getElementById('play');

// With a timeline we can work with multiple tweens
timeline.add(TweenLite.to(circles, 4, { // 3 - 1 
    marginLeft: 400, ease: Linear.easeNone }));
timeline.add(TweenLite.to(elem1, 2.5, { // 3 - 2
    ease: SlowMo.ease.config(0.7, 0.7, false), y: 500
}));
timeline.add(TweenLite.to(elem2, 2.5, {
    ease: RoughEase.ease.config({
        template:  Power0.easeNone, strength: 1, points: 20, 
        taper: "none", randomize:  true, clamp: false}), y: 500 }));
timeline.add(TweenLite.to(circles, 10, { 
    marginLeft: 800, ease: Linear.easeNone }));

timeline.play(); // 4
```

## What we're not covering about GSAP

Because it's such a big and feature rich library there is no way that I can cover all of GSAP and still have time to do what I need to do and still have a life. It is meant as a starting point for future work and most of the code can definitely be improved.

There is a whole other area of using GSAP that I will not cover: animating SVG. There are some thing that are better done with SVG than PNG; see the animations for Jake Archibald's [Offline Cookbook](https://jakearchibald.com/2014/offline-cookbook/) as an example.
 
Animating infographics and illustration will be covered in later posts. 
  
To get an idea what you can do with SVG and GSAP, see the presentation below by Sarah Drasner who covers SVG and GSAP very well and in enough detail to make it a good starting point.    

<div class="video">
<iframe width="560" height="315" src="https://www.youtube.com/embed/ZNukcHhpSXg?rel=0" frameborder="0" allowfullscreen></iframe>
</div>




# Links and resources

## Books about animation

<table>
  <thead>
    <tr>
      <th>Title</th>
      <th>Author</th>
      <th>Publisher</th>
    </tr>
  </thead>
  
  <tbody>
    <tr>
      <td><a href="http://shop.oreilly.com/product/0636920041658.do">Transitions and Animations in CSS</a></td>
      <td>Estelle Weyl</td>
      <td>O'Reilly</td>
    </tr>
    <tr>
      <td><a href="http://rosenfeldmedia.com/books/designing-interface-animation/">Designing Interface Animation</a></td>
      <td>Val Head</td>
      <td>Rosenfeld Media</td>
    </tr>
    <tr>
      <td><a href="https://www.amazon.com/gp/product/0321839609/">Learning CSS3 Animations and Transitions</a></td>
      <td>Alexis Goldstein</td>
      <td>Addison-Wesley</td>
    </tr>
  </tbody>
 </table>



## Articles and Tutorials 

<table>
  <thead>
    <th>Title</th>
    <th>Appears in</th>
  </thead>
  <tbody>
    <tr>
      <td><a href="http://www.fastcodesign.com/3055811/what-disneys-classic-animation-principles-can-teach-us-about-great-web-design">What Disney's Classic Animation Principles Could Teach Web Designers</a></td>
      <td>Fast Company</td>
    </tr>
    <tr>
      <td><a href="http://alistapart.com/article/designing-safer-web-animation-for-motion-sensitivity">Safer Web Animation for Motion Sensitivity</a></td>
      <td>A List Apart</td>
    </tr>
    <tr>
      <td><a href="http://alistapart.com/article/ui-animation-and-ux-a-not-so-secret-friendship">UI Animation & UX: A not-so-secret friendship</a></td>
      <td>A List Apart</td>
    </tr>
    <tr>
      <td><a href="http://valhead.com/2016/12/08/sketching-interface-animations-an-interview-with-eva-lotta-lamm/">Sketching Interface Animations – An Interview with Eva-Lotta Lamm</a></td>
      <td>Val Head's Blog</td>
    </tr>
    <tr>
      <td><a href="https://24ways.org/2016/animation-in-design-systems/">Animation in Design Systems</a></td>
      <td>24 ways</td>
    </tr>
    <tr>
      <td><a href="https://css-tricks.com/comparison-animation-technologies/">A Comparison of Animation Technologies</a></td>
      <td>CSS Tricks</td>
    </tr>
    <tr>
      <td><a href="https://www.wikiwand.com/en/12_basic_principles_of_animation">12 basic principles of animation</a></td>
      <td>Article at Wikipedia</td>
    </tr>
    <tr>
      <td><a href="https://medium.freecodecamp.com/nerding-out-with-bezier-curves-6e3c0bc48e2f#.ynv9pl62w">Nerding Out With Bezier Curves</a></td>
      <td>Medium</td>
    </tr>
    <tr>
      <td><a href="https://chrisruppel.com/blog/css-animation-border-radius/">Using CSS to animate border-radius</a></td>
      <td>chrisruppel.com</td>
    </tr>
    <tr>
      <td><a href="http://www.webdirections.org/blog/let-the-web-move-you-css3-animations-and-transitions/">Let the Web move you</a></td>
      <td>Web Directions</td>
    </tr>
    <tr>
      <td><a href="http://lea.verou.me/2011/09/a-better-tool-for-cubic-bezier-easing/">A better tool for cubic bezier easing</td>
      <td>lea.verou.me</td>
    </tr>
    <tr>
      <td><a href="https://designmodo.com/steps-css-animations/">Steps CSS Animations</a></td>
      <td>Designmodo</td>
    </tr>
    <tr>
      <td><a href="http://valhead.com/2016/12/16/web-animation-tutorials-roundup/">Web Animation Tutorial Roundup</a></td>
      <td>Val Head</td>
    </tr>
    <tr>
      <td><a href="https://greensock.com/get-started-js">Getting started with GSAP</a></td>
      <td>gsap.com</td>
    </tr>
    <tr>
      <td><a href="https://ihatetomatoes.net/get-greensock-101/">Greenson.com</a></td>
      <td>ihatetomatoes.net</td>
    </tr>
    <tr>
      <td><a href="https://davidwalsh.name/gsap-svg">GSAP + SVG for Power Users: Motion Along A Path</a></td>
      <td>davidwalsh.name</td>
    </tr>
    <tr>
      <td><a href="https://greensock.com/docs/#/HTML5/">GSAP HTML5 documentation</a></td>
      <td>greensock.com</td>
    </tr>
  </tbody>
</table>

## Mailing Lists

* [UI Animation Newsletter](http://uianimationnewsletter.us2.list-manage.com/subscribe?u=6fbaddc8c1fce7588d1a35cb2&id=8f4de2c2e5)
* [Web Animation Weekly](http://webanimationweekly.us1.list-manage.com/subscribe?u=0a8f219cf8284562f91a26ee9&id=d60f6683d2)
