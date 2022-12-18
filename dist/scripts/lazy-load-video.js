console.log('preparing video embeds');

document.addEventListener("DOMContentLoaded",
  function() {
    let div;
    let n;
    let v = document.getElementsByClassName("youtube-player");
    for (n = 0; n < v.length; n++) {
      div = document.createElement("div");
      div.setAttribute("data-id", v[n].dataset.id);
      div.innerHTML = buildThumb(v[n].dataset.id);
      div.onclick = buildIframe;
      v[n].appendChild(div);
    }
  });

/**
 * Builds the thumbnail for the video
 * @param {String} id
 */
function buildThumb(id) {
  let thumb = '<img src="https://i.ytimg.com/vi/ID/hqdefault.jpg">';
  let play = '<div class="play"></div>';
  return thumb.replace("ID", id) + play;
}

/**
 * Builds the video iframe
 */
function buildIframe() {
  let iframe = document.createElement("iframe");
  let embed = "https://www.youtube.com/embed/ID?autoplay=1&rel=0";
  iframe.setAttribute("src", embed.replace("ID", this.dataset.id));
  iframe.setAttribute("frameborder", "0");
  iframe.setAttribute("height", this.dataset.height);
  iframe.setAttribute("width", this.dataset.width);
  this.parentNode.replaceChild(iframe, this);
}
