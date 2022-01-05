I'm sad to see the potential of exclusions not being used. No browser vendor supports the complete exclusion specification. IE 10+ is the one that comes the closes but doesn't support the full set of exclusion features. 

This is the best we have (and yes, it still feels weird to say that IE is the best we have in terms of a web feature)

The idea of exclusions is complementary to that of shapes. As a matter of fact, there was only one specification addressing both shapes and exclusions but they were split in 2012, I guess to ease development of at least one of the sections of the specification.

The spec has two primary CSS attributes: <code>wrap-flow</code> and <code>wrap-through</code>. 

## wrap-flow

Wrap-flow tells the browser how to wrap the content. One thing to notice is that instead of using left and right as attribute values it uses start and end to avoid confusions with right-to-left and top to bottom languages where the meaning of start and end is different. 

I based the definition of each attribute in the how the [specification](http://www.w3.org/TR/css3-exclusions/) defines it.

* wrap-flow: auto;

This will **not** create an exclusion for floated elements. It has no effect on other, not floated, elements. This is the default value for <code>wrap-flow</code>

<a href="http://publishing-project.rivendellweb.net/wp-content/uploads/2014/10/exclusion_wrap_side_auto.png"><img src="http://publishing-project.rivendellweb.net/wp-content/uploads/2014/10/exclusion_wrap_side_auto.png" alt="exclusion_wrap_side_auto" width="429" height="342" class="aligncenter size-full wp-image-353538" /></a>

* wrap-flow: both;

Flows content on both sides of the element

<a href="http://publishing-project.rivendellweb.net/wp-content/uploads/2014/10/exclusion_wrap_side_both2.png"><img src="http://publishing-project.rivendellweb.net/wp-content/uploads/2014/10/exclusion_wrap_side_both2.png" alt="exclusion_wrap_side_both" width="443" height="345" class="aligncenter size-full wp-image-353537" /></a>

* wrap-flow: start;

Inline content can wrap on the start edge of the exclusion area (this would be the left edge for LTR languages.) It must leave the end edge clear

<a href="http://publishing-project.rivendellweb.net/wp-content/uploads/2014/10/exclusion_wrap_side_left.png"><img src="http://publishing-project.rivendellweb.net/wp-content/uploads/2014/10/exclusion_wrap_side_left.png" alt="exclusion_wrap_side_left" width="426" height="349" class="aligncenter size-full wp-image-353539" /></a>

* wrap-flow: end;

Inline flow content can wrap on the end side of the exclusion area but must leave the area to the start edge of the exclusion area empty. This is the reverse of the start value.

<a href="http://publishing-project.rivendellweb.net/wp-content/uploads/2014/10/exclusion_wrap_side_right.png"><img src="http://publishing-project.rivendellweb.net/wp-content/uploads/2014/10/exclusion_wrap_side_right.png" alt="exclusion_wrap_side_right" width="426" height="347" class="aligncenter size-full wp-image-353542" /></a>

* wrap-flow: maximum;

Inline flow content wraps on the side of the exclusion with the largest available space for the given line, and must leave the other side of the exclusion empty. The space can be on either side of the content, as shown in the examples below:

[caption id="attachment_353541" align="aligncenter" width="427"]<a href="http://publishing-project.rivendellweb.net/wp-content/uploads/2014/10/exclusion_wrap_side_maximum_R.png"><img src="http://publishing-project.rivendellweb.net/wp-content/uploads/2014/10/exclusion_wrap_side_maximum_R.png" alt="Example of wrap-flow: maximum wrapped from the left side" width="427" height="347" class="size-full wp-image-353541" /></a> Example of wrap-flow: maximum wrapped from the right side[/caption]

[caption id="attachment_353540" align="aligncenter" width="426"]<a href="http://publishing-project.rivendellweb.net/wp-content/uploads/2014/10/exclusion_wrap_side_maximum_L.png"><img src="http://publishing-project.rivendellweb.net/wp-content/uploads/2014/10/exclusion_wrap_side_maximum_L.png" alt="Example of wrap-flow: maximum wrapped from the left side" width="426" height="348" class="size-full wp-image-353540" /></a> Example of wrap-flow: maximum wrapped from the left side[/caption]

* wrap-flow: clear;

Inline content flows top and bottom of the exclusion, leaving the start and end sides clear.

<a href="http://publishing-project.rivendellweb.net/wp-content/uploads/2014/10/exclusion_wrap_side_clear1.png"><img src="http://publishing-project.rivendellweb.net/wp-content/uploads/2014/10/exclusion_wrap_side_clear1.png" alt="exclusion_wrap_side_clear" width="425" height="335" class="aligncenter size-full wp-image-353536" /></a>

## wrap-through

This property controls whether content wraps around this particular element or not. According to the [specification](http://www.w3.org/TR/css3-exclusions/#wrap-through-property), if the value of the wrap-through property is to wrap:

> The element inherits its parent node's wrapping context. Its descendant inline content wraps around exclusions defined outside the element.

If the value is to none content will not wrap around the element

![](http://www.w3.org/TR/css3-exclusions/images/exclusion_wrap_through.png)

## Combination of exclusions and shapes

Examples taken from the [CSS WG use case wiki](https://wiki.csswg.org/ideas/css3-exclusions-use-cases)

One of the best things about exclusions is that they work almost intuitively with shapes as in the examples below. Note that because exclusions are a working draft, the syntax, is not final and, most likely, not be supported by your browser (even IE 10+)

I still chose to include the examples as an illustration of what, I hope, is to come

### Basic shaped exclusion example

<a href="http://publishing-project.rivendellweb.net/wp-content/uploads/2014/10/csswg_exclusions_v1.jpg"><img src="http://publishing-project.rivendellweb.net/wp-content/uploads/2014/10/csswg_exclusions_v1.jpg" alt="csswg_exclusions_v1" width="612" height="792" class="aligncenter size-full wp-image-353535" /></a>

In a two column text frame we create a circle shape at the center and use the shape as an exclusion where we flow the content around both sides using <code>wrap-flow: both;</code>


### Padding and margins in exclusions

<a href="http://publishing-project.rivendellweb.net/wp-content/uploads/2014/10/csswg_exclusions_v7.jpg"><img src="http://publishing-project.rivendellweb.net/wp-content/uploads/2014/10/csswg_exclusions_v7.jpg" alt="csswg_exclusions_v7" width="612" height="792" class="aligncenter size-full wp-image-353528" /></a>

### Adding background to a shaped exclusion

<a href="http://publishing-project.rivendellweb.net/wp-content/uploads/2014/10/csswg_exclusions_v8.jpg"><img src="http://publishing-project.rivendellweb.net/wp-content/uploads/2014/10/csswg_exclusions_v8.jpg" alt="csswg_exclusions_v8" width="612" height="792" class="aligncenter size-full wp-image-353531" /></a>

## Tutorials and Examples

* [http://galjot.si/css-exclusions](http://galjot.si/css-exclusions)
* Sara Soueidan talks briefly about exclusions in her [shapes article](http://alistapart.com/article/css-shapes-101#section8)