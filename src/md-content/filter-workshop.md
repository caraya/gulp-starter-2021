# Filter Workshop

## Step 1: Capture Image to work with

```html
<div id="uploader">
  <div>
    Select an image file:
    <input type="file" id="fileInput">
  </div>
</div>

<div id="fileDisplayArea"></div>
```

```js
window.addEventListener('DOMContentLoaded', function() {
  const fileInput = document.getElementById('fileInput');
  const fileDisplayArea = document.getElementById('fileDisplayArea');

  fileInput.addEventListener('change', function(e) {
    const file = fileInput.files[0];
    const imageType = /image.*/;

    if (file.type.match(imageType)) {
      const reader = new FileReader();

      reader.onload = function(e) {
        fileDisplayArea.innerHTML = '';
        const img = new Image();
        img.src = reader.result;
        fileDisplayArea.appendChild(img);
      };

      reader.readAsDataURL(file);
    } else {
      fileDisplayArea.innerHTML = 'File not supported!';
    }
  });
});
```

## Adding filters to the application

## Adding more bells and whistles

* https://blog.teamtreehouse.com/reading-files-using-the-html5-filereader-api
* https://developer.mozilla.org/en-US/docs/Web/API/FileReader
* https://www.w3.org/TR/FileAPI/#FileReader-interface
