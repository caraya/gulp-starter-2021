/**


*/

function checkReadingSystemSupport() {
  var neededFeatures = ['mouse-events', 'dom-manipulation'],
    support = typeof navigator.epubReadingSystem !== 'undefined',
    i;
  if (support) {
    for (i = 0; i < neededFeatures.length; i++) {
      if (!navigator.epubReadingSystem.hasFeature(neededFeatures[i])) {
        return false;
      }
    }
  }
  return support;
}

function togglePlay(id) {
  var video = document.getElementsid(id);
  if (video.ended || video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function toggleControls() {
  var video = document.getElementsByTagName('video')[0];
  if (video.controls) {
    video.removeAttribute('controls', 0);
  } else {
    video.controls = 'controls';
  }
}

/**
* touch and keyboard based functions
*/

window.onload = function () { //s/b jq  $(document).ready
  // var video = document.getElementsByTagName('video')[0];

  if (checkReadingSystemSupport()) {
    video.removeAttribute('controls', 0);
  }

  video.addEventListener('click', function (e) {
    e.preventDefault();
    togglePlay();
  }, false);

  video.addEventListener('dblclick', function (e) {
    e.preventDefault();
    toggleControls();
  }, false);

  video.addEventListener('keyup', function (e) {
    var k = e ? e.which : window.event.keyCode;
    if (k === 32) {
      e.preventDefault();
      togglePlay();
    }
  }, false);
};
