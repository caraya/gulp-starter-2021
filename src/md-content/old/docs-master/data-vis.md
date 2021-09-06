Have you seen some of the visualizatons they do at the New York Times? For example, look at [People Connections at the Oscars](http://www.nytimes.com/interactive/2013/02/20/movies/among-the-oscar-contenders-a-host-of-connections.html). Don't you wish you could build visualizations like that?

You can.

There are multiple data visualization libraries available online. I've chosen to work with D3.js and Leaflet for a variety of reasons that will be explained as we move along this article.

Leaflet, Planetary and D3 are by no means the only tools for mappin and visualization. If you google for data visualization you will find multiple lists of what people consider the best visualizaztion tools.

I've done the research and consider D3 the simplest and best supported. Mike Bostock, D3 author and lead developer, has made more than 600 examples available through <a href="http://bl.ocks.org">bl.ocks.org</a> in addition to the work he has done for the New York Times.

Leaflet is a newer concept for me and it's intriguing enough to be worth the research effort. Creating tiled maps like Google Maps without having to learn the Google Maps API really sounds like an appealing idea.

## Questions to ask before we get started

The questions below have helped me as I learn about data visualization.

***Who is your audience?*** This may sound repetitive but it's still an important question to ask. A technical audience may be ok with a scatter plot but the type of audience who reads the New York Times

***What is the data telling you?*** it's easy to pigeonhole our data into the answer (and the visualization) that you're looking for but that's not always the correct answer. One of the hardest parts of the process is to decide what is the data telling you and how to best represent the data for your intended audience.

***What's the best way to represent the data?***

We'll revisit these questions as we work on the examples below


### Data Visualization is much more than graphics

Take a look at the examples below:

- [NYT Fashion Week's Editor Picks](http://www.nytimes.com/newsgraphics/2013/09/13/fashion-week-editors-picks/)
- [Among Oscar Contenders, A Host of Connections](http://www.nytimes.com/interactive/2013/02/20/movies/among-the-oscar-contenders-a-host-of-connections.html)
- [Mobile Patent Lawsuits Visualization](http://bl.ocks.org/mbostock/1153292)
- [What does your drink say about your politics?](http://datavizblog.com/2014/01/07/dataviz-what-your-favorite-drink-says-about-your-politics/)

As you can see, the examples above the author(s) have made complicated information easier for non-technical people to understand and few if any of these visualizations are plot based.

### Data Visualization may require programming

Part of the data visualization process requires formatting the data into JSON or another format that can be read into the visualization engine.  This may sometimes require you to create scripts that will manipulate the data into the format that you need to work on. There is no easy or generic way to create the data source you need. For example, to create the data for a force layout I used the following Python code (and please don't hold it against me)

[python]
#!/usr/local/bin/python
print  "{"
print " 'nodes': ["
for i in range (155):
    print "{ 'name':" + str(i) + ", 'link' : '" + str(i+1) + ".html' },"
print "],"
print " 'links': ["
for  x in range (155):
    print "{ 'source':" + str(x+1) + ", 'target' : " + str(x+1) + " },"
print "]"
print "}"
[/python]

Code like this may not win any awards but as you will see later, code like this can save you hours of manual data entry.

## Introducing the tools

### What is D3.js

[D3.js](http://d3js.org) (for its full name: Data Driven Documents) is a Javascript library that allows you to create and manipulate documents based on data you provide. It binds your data to an arbitratry Document Object Model (DOM) and once the data is bound, it will allow you to manipulate it and present it to your audience in a way that will be easier for them to understand.  The documents that D3 produces are standard web documents which you can further manipulate or combine with other web elements that you've built for your web content.

According to Scott Murray in his book [Interactive Data Visualizations for the Web](http://shop.oreilly.com/product/0636920026938.do):

<blockquote>D3 is an elegant piece of software that facilitates generation and manipulation of web documents with data. It does this by:

<ul>
  <li>Loading data into the browser’s memory</li>
  <li>Binding data to elements within the document, creating new elements as needed</li>
  <li>Transforming those elements by interpreting each element’s bound datum and setting its visual properties accordingly</li>
  <li>Transitioning elements between states in response to user input</li>
</ul>
</blockquote>

As awesome as D3 is there are a few things that D3 can not do. According to Scott Murray some  things D3 can not do:

<blockquote>
<ul>
  <li>D3 doesn’t generate predefined or “canned” visualizations for you. This is on purpose. D3 is intended primarily for explanatory visualization work, as opposed to exploratory visualizations. Exploratory tools help you discover significant, meaningful patterns in data. These are tools like [Tableau](http://www.tableausoftware.com/) and [ggplot2](http://ggplot2.org/), which help you quickly generate multiple views on the same data set. That’s an essential step, but different from generating an explanatory presentation of the data, a view of the data that highlights what you’ve already discovered. Explanatory views are more constrained and limited, but also focused, and designed to communicate only the important points. D3 excels at this latter step, but is not ideal for the former. (For ideas on other tools, see the section Alternatives later in this chapter.)</li>
  <li>D3 doesn’t even try to support older browsers. This helps keep the D3 codebase clean and free of hacks to support old versions of Internet Explorer, for example. The philosophy is that by creating more compelling tools and refusing to support older browsers, we encourage more people to upgrade (rather than forestall the process, thereby requiring us to continue to support those browsers, and so on—a vicious cycle). D3 wants us to move forward </li>
  <li>D3’s core functionality doesn’t handle bitmap map tiles, such as those provided by Google Maps or Cloudmade. D3 is great with anything vector—SVG images or GeoJSON data—but wasn’t originally intended to work with traditional map tiles. (Bitmap images are made up of pixels, so resizing them larger or smaller is difficult without a loss in quality. Vector images are defined by points, lines, and curves—mathematical equations, really—and can be scaled up or down without a loss in quality.) This is starting to change, with the introduction of the [d3.geo.tile plug-in](https://github.com/d3/d3-plugins/tree/master/geo/tile). Prior to this plug-in, geomapping with D3 meant either going all-SVG and avoiding tiles or using D3 to create SVG visuals on top of a base layer of map tiles (which would be managed by another library, like Leaflet or Polymaps—see the section Alternatives later in this chapter). This question of how to integrate bitmap tiles and vector graphics comes up a lot in the D3 community. As of today, there is no super-simple and perfect answer, but I think you can expect to see lots of work done in this area, and possibly the new tile-handling methods integrated into the D3 core at some point in the future.</li>
  <li>D3 doesn’t hide your original data. Because D3 code is executed on the client side (meaning, in the user’s web browser, as opposed to on the web server), the data you want visualized must be sent to the client. If your data can’t be shared, then don’t use D3. Alternatives include using proprietary tools (like Flash) or prerendering visualizations as static images and sending those to the browser. (If you’re not interested in sharing your data, though, why would you bother visualizing it? The purpose of visualization is to communicate the data, so you might sleep better at night by choosing openness and transparency, rather than having nightmares about [data thieves](http://www.datathief.org/).)</li>
</ul>
</blockquote>

### What is Planetary.js

[Planetary.js](http://planetaryjs.com/) is a specialized library that sits on top of D3 and [TopoJSON](https://github.com/mbostock/topojson) and creates  globe  visualizations (interactive or not). Since it builds on top of D3 it can use the functionality provided by D3 along with the specialized extensions that are best suited for globe-based visualizations


#### JSON, GeoJSON and TopoJSON

Data visualizations take data in a variety of formats.  Some of the most common ones are CSV (comma separated values) and JSON (Javascript Object Notation). D3 also supports TopoJSON and GeoJSON, depending on the kind of work you are using the library for.  The multiple JSON formats are somewhat confusing so I thought better to make the distinction

<blockquote>JSON (JavaScript Object Notation) is a lightweight data-interchange format. It is easy for humans to read and write. It is easy for machines to parse and generate. It is based on a subset of the JavaScript Programming Language, Standard ECMA-262 3rd Edition - December 1999. JSON is a text format that is completely language independent but uses conventions that are familiar to programmers of the C-family of languages

<cite>From: <a href="http://json.org/">http://json.org/</a></cite>
</blockquote>

Take the following JSON example comes from my [CSS properties visualization project](http://labs.rivendellweb.net/data-vis/css-tree3.html). The full JSON file is located at <http: //labs.rivendellweb.net/data-vis/json/css-data.json>

[javascript]
{
    "name": "CSS Properties",
    "children": [
        {
            "name": "borders",
            "children": [
                {
                    "name": "border",
                    "size": 3938
                },
                {
                    "name": "Border After Properties",
                    "children": [
                        {
                            "name": "border-after",
                            "size": 3938
                        },
                        {
                            "name": "border-after-color",
                            "size": 3938
                        },
                        {
                            "name": "border-after-style",
                            "size": 3938
                        },
                        {
                            "name": "border-after-width",
                            "size": 3938
                        }
                    ]
                }
            ]
        }
    ]
}
[/javascript]

Because this is essentially JavaScript we can parse it with a specilized function built into most JavaScript parsers JSON.parse

JSON.parse parses a JSON file and produces a JSON tree with either the results or the results converted using the sencond parameter.

<pre><code>try {
    var transformed = JSON.parse('{"p": 5}', function(k, v) { if (k === "") return v; return v * 2; });
    // transformed is { p: 10 }
} catch (e) {
  console.error("Parsing error:", e);
}</code></pre>

GeoJSON is a specialized use of JSON meant for use with geographic data.  According to the GeoJSON specification:

[blockquote cite"http://geojson.org/geojson-spec.html"]GeoJSON is a format for encoding a variety of geographic data structures. A GeoJSON object may represent a geometry, a feature, or a collection of features. GeoJSON supports the following geometry types: Point, LineString, Polygon, MultiPoint, MultiLineString, MultiPolygon, and GeometryCollection. Features in GeoJSON contain a geometry object and additional properties, and a feature collection represents a list of features.

A complete GeoJSON data structure is always an object (in JSON terms). In GeoJSON, an object consists of a collection of name/value pairs -- also called members. For each member, the name is always a string. Member values are either a string, number, object, array or one of the literals: true, false, and null. An array consists of elements where each element is a value as described above.[/blockquote]

TopoJSON refines GeoJSON tto make large Geographical visualizations easier to produce and render. It does this by eliminating redundancies and duplications.

[blockquote cite="https://github.com/mbostock/topojson/wiki"]TopoJSON is an extension of GeoJSON that encodes topology. Rather than representing geometries discretely, geometries in TopoJSON files are stitched together from shared line segments called arcs. This technique is similar to Matt Bloch’s MapShaper and the Arc/Info Export format, .e00. TopoJSON eliminates redundancy, allowing related geometries to be stored efficiently in the same file. For example, the shared boundary between California and Nevada is represented only once, rather than being duplicated for both states. A single TopoJSON file can contain multiple feature collections without duplication, such as states and counties. Or, a TopoJSON file can efficiently represent both polygons (for fill) and boundaries (for stroke) as two feature collections that share the same arc mesh.

As a result, TopoJSON is substantially more compact than GeoJSON. The above shapefile of U.S. counties is 2.2M as a GeoJSON file, but only 436K as a boundary mesh, a reduction of 80.4% even without simplification. TopoJSON can also be more efficient to render since shared control points need only be projected once. To further reduce file size, TopoJSON uses fixed-precision delta-encoding for integer coordinates rather than floats. This is similar to rounding coordinate values (e.g., LilJSON), but with greater precision. Like GeoJSON, TopoJSON files are easily modified in a text editor and amenable to gzip compression.[/blockquote]

The one downside to GeoJSON and TopoJSON, from my perspective, is the need for specialized tools to create content. While we can edit and modify the content directly with a text editor, the transformation of shapes and object files into JSON and its specialized cousins is not as easy as creating standard JSON. The tools themselves are yet another thing you have to learn and master in order to create content.

### What is Leaflet.js

[Leaflet](http://leafletjs.com/index.html) is the answer I chose to use when confronted with the lack of tile map spport on D3. I made the decision before discovering the [d3.geo.tile plug-in](https://github.com/d3/d3-plugins/tree/master/geo/tile). It provides a quick solution for Google Map - like solutions that don't involve Google's propietary API.

It uses  Open Source tiles created by the [Open Street Map Project](http://www.openstreetmap.org/) and made available by a number of [providers](http://switch2osm.org/providers/), including [CloudMade](http://www.openstreetmap.org/) who has a free tier of up to 500k requests. While this data may not be as accurate as Googles and it does not use their API  it is built by local volunteers and the cost is free.

## Putting it all together

Now that we've looked at the tools we'll be working with let's build stuff. We'll start with D3 and move on to the other libraries.

### Building a graphic (bar, pie charts and scatterplots)

The easiest way to learn D3 is to start with basic graphics.

#### Using internal data

The simplest D3 graphic uses a JavaScript array to store data and then attached the data to D3 elements.

#### Using JSON formated data

### Building a force-directed layout

### Building a map with D3

As one of the exercises I've taken up as part of my learning how to use D3 is to build a visualization of Chile using data obtained online from [Shapes for Chile](http://juanchosierrar.blogspot.com/2011/02/shapefiles-de-chile-elaborados-por-esri.html)

- Download data from your chosen source
- Convert the shape files to GeoJSON and, if necessary, TopoJSON
- Build the data visualization using D3.js
- Create interactivity using the D3.js built in interactive tools, if needed
- Fix the page so it is aesthetically pleasing


### Map Issues with D3

- [Simplifying data](http://bost.ocks.org/mike/simplify/)
- [Simplication tools](https://github.com/nvkelso/geo-how-to/wiki/Generalize%20your%20data)

### Buillding an interactive world with Planetary.js

<p data-height="597" data-theme-id="2039" data-slug-hash="EnoIF" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/caraya/pen/EnoIF'>Planetary.js Demo</a> by Carlos Araya (<a href='http://codepen.io/caraya'>@caraya</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//codepen.io/assets/embed/ei.js"></script>

### Building a map with Leaflet

A basic Leaflet map of a city, in this case Mountain View, CA, is as simple as the code below:

<p data-height="460" data-theme-id="2039" data-slug-hash="mqLtr" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/caraya/pen/mqLtr'>Leaflet.js Example for Mountain View, CA</a> by Carlos Araya (<a href='http://codepen.io/caraya'>@caraya</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//codepen.io/assets/embed/ei.js"></script>

Working version of the code above: </http:><http: //labs.rivendellweb.net/data-vis/leaflet-ex.html>

As clean as the code is there are still a few caveats to consider:

- Leaflet does not provide the tiles that this map is made for. To get the example working I had to open an account with <http: //cloudmade.com></http:> which provides a free use tier of up to 500k tiles
- You cannot merge the Leaflet with Googe maps due to Google's license terms that you can only se ther data with their API


## Where to go from here

- [Towards Reusable Charts](http://bost.ocks.org/mike/chart/)

## Resources and sources of inspiration

- [Thematic Mapping with Three.js](http://thematicmapping.org/)
- [D3 + Leaflet](http://bost.ocks.org/mike/leaflet/)
- [D3 Sample Library](https://github.com/mbostock/d3/wiki/Gallery)
- [DataViz blog](http://datavizblog.com/)</http:>
