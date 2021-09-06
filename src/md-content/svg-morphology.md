# Interesting effects using feMorphology

## With Images

```svg
<svg width="600" height="400" viewBox="0 0 700 500">
  <title>Eroded image</title>
  <filter id="myFilter">
    <feMorphology operator="erode" radius="4"></feMorphology>
	</filter>

  <image xlink:href="path/to/IMG_0168.JPG"
         x="0" y="0"
         width="100%" height="100%"
         filter="url(#myFilter)"></image>
</svg>
```

```svg
<svg width="600" height="400" viewBox="0 0 700 500">
  <title>Dilated Image</title>
	<filter id="myFilter2">
    <feMorphology operator="dilate" radius="4"></feMorphology>
	</filter>

  <image xlink:href="path/to/IMG_0168.JPG"
         x="0" y="0"
         width="100%" height="100%"
         filter="url(#myFilter2)"></image>
</svg>
```

## With Text


```svg
<svg width="1200" height="200" viewBox="100 0 1200 200">
    <filter id="outline">
      <style>
        @font-face {
          font-family: "Marvin";
          src: url("MarvinVisionsBig-Bold.woff") format("woff");
        }

        text {
          font-family: Marvin;
        }
      </style>
        <feMorphology   in="SourceAlpha"
                        result="dilated"
                        operator="dilate"
                        radius="7"></feMorphology>

        <feFlood  flood-color="rebeccapurple"
                  flood-opacity="1"
                  result="purple"></feFlood>

        <feComposite  in="purple"
                      in2="dilated"
                      operator="in"
                      result="outline"></feComposite>

        <feMerge>
            <feMergeNode in="outline" />
            <feMergeNode in="SourceGraphic" />
        </feMerge>
    </filter>

    <text font-size="120px"
          dx="125" dy="125"
          font-weight="900"
          filter="url(#outline)"
          fill="lightblue">upgrade yourself</text>
</svg>
```

## Using SVG filters with HTML elements

```svg
<svg width="1" height="1" viewBox="0 0 900 450">
	<filter id="myFilter">
		<feMorphology operator="dilate" radius="8"
                  in="SourceGraphic" result="THICKNESS" />
		<feComposite  operator="out"
                  in="THICKNESS"
                  in2="SourceGraphic" />
	</filter>
</svg>
```

```html
<h1>SVG Rocks in HTML too!</h1>
```

```css
@import
  url('https://fonts.googleapis.com/css?family=Bangers');

h1 {
	font-family: 'Bangers', cursive;
	-webkit-filter: url(#myFilter);
	filter: url(#myFilter);
	color: deepPink;
	font-size: 7em;
	margin: 2vw;
}
```
