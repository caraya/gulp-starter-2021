<link as="script" crossorigin="anonymous" href="js/zenscroll.js" rel="preload" type="text/javascript">

A preload for 'https://web-layout-experiments.firebaseapp.com/js/zenscroll.js' is found, but is not used because the request credentials mode does not match. Consider taking a look at crossorigin attribute.

The resource https://web-layout-experiments.firebaseapp.com/js/zenscroll.js was preloaded using link preload but not used within a few seconds from the window's load event. Please make sure it has an appropriate `as` value and it is preloaded intentionally.

      {
        "source": "**/*.js",
        "headers": [
          {
            "key": "Access-Control-Allow-Origin",
            "value": "*"
          },
          {
            "key": "Cache-Control",
            "value": "max-age=2592000"
          }
        ]
      },
      {
        "source": "sw.js",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=0"
          }
        ]
      },
