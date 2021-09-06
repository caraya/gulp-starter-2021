# Exploring WebXR

WebXR is the spiritual successor to the WebVR 1.0 and 1.1 API, sitting on top of native WebGL APIs. Where WebGL only allowed for 3D VR experiences WebXR, when fully specified and implemented in browsers, will allow for both 3D and [Augmented Reality](https://en.wikipedia.org/wiki/Augmented_reality) experiences using either phones or [Head Mounted Displays](https://en.wikipedia.org/wiki/Head-mounted_display) to interact with virtual objects in the real world.

I'm not advocating for everyone to learn WebGL, at least not initially; there will be times when you will need shaders to do specific work that can't be done with the higher level APIs but that's far down the line from where we will start this exploration.

## Creating content for VR and XR

The objectives for this reasearch are:

* Create content using Three.js and A-Frame
* Explore the difference between 2-D, 3D, and  WebXR content
* What additional contraints, if any, do the polyfills impose.
* This is also a good time to see how we can use `model-viewer` as a Magic Window type tool for displaying 3D content in a 2D environment
* Explore what it would be like to get 2D environments inside a 3D world



## Links and resources

* Libraries
  * [Three.js](https://threejs.org/)
  * [Babylon.js](https://www.babylonjs.com/)
  * [a-frame](https://aframe.io/)
* Polyfills and extensions
  * [model-viewer](https://modelviewer.dev/)
  * [WebXR Polyfill](https://github.com/immersive-web/webxr-polyfill)
  * [three.ar.js](https://github.com/google-ar/three.ar.js)
* Intel Open Source &mdash; Creating responsive VR experiences
  * [VR Concepts And The Immersive Web](https://01.org/blogs/darktears/2019/vr-concepts-and-immersive-web)
  * [Rendering immersive web experiences with Three.JS and WebXR](https://01.org/blogs/darktears/2019/rendering-immersive-web-experiences-threejs-webxr)
  * [Adding support for VR inputs with WebXR and Three.JS](https://01.org/blogs/darktears/2019/adding-support-vr-inputs-webxr-threejs)
* Examples
  * [SponzaVR](http://david.blob.core.windows.net/babylonjs/SponzaVR/index.html)
