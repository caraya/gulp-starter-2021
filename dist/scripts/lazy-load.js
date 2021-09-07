/**
 * @name onChange
 * @param {any} changes
 * @description changes the images source
 */
function onChange(changes) {
  // 2. For each image that we want to change
  changes.forEach(change => {
    // 3. take image url from `data-src` attribute
    change.target.src = change.target.dataset.src;
    // 4. Stop observing the current target
    observer.unobserve(change.target);
  });
}

if ('IntersectionObserver' in window) {
  // 1. Create the IntersectionObserver and bind it to the function we want it to work with
  let observer = new IntersectionObserver(onChange);

  // 5. Convert node list of all images with data-src attributed to array
  const imgs = [...document.querySelectorAll('img[data-src]')];

  // 6. Observe each image derived from the array above
  imgs.forEach(img => observer.observe(img));
  console.log('images loaded');

  } else {

    // Fail early and load images directly if
  // Intersection observers are not supported
  console.log('Intersection Observers not supported');
  [...document.querySelectorAll('img[data-src]')].forEach(img => img.target.src = img.target.dataset.src);

}
