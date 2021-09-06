# CSS Tables... they are actually useful

Before you jump all over me telling me that tables for layout are a bad thing (and I agree)  hear me out for a second. **This is not using tables for layout**. The HTML table structure is meant to display organized tabular data and not for layout. Using `display: table` tells the browser to show the content as a table without changing the underlying structure of the content. 
 
In the example below we have the following HTML structure

```html
<div id="wrapper"> 
  <div id="header"></div> 
  <div id="main"> 
    <div class="row">
      <div id="nav"> 
        Navigation
      </div>
      <div id="extras">
        <h2>Extras</h2> 
      </div>
    </div>
    <div class="row">
      <div id="content">
        <h2>Content</h2>
      </div>
    </div>
  </div>
</div>
```

And the following CSS: 

```css
#main { 
  display: table; 
  border-collapse: collapse; 
} 

.row {
  display: table-row;
}
#nav { 
  display: table-cell; 
  width: 180px; 
  background-color: #e7dbcd; 
} 

#extras { 
  display: table-cell; 
  width: 180px; 
  padding-left: 10px; 
  border-right: 3px dotted #d7ad7b; 
} 

#content { 
  display: table-cell; 
  width: 360px; 
  padding-left: 10px; 
} 
```

The display property allows you to specify a range of table-related values in order to make elements display as though they were table elements. The available display values are:

* `table` makes the element behave like a table element
* `table-row` makes the element behave like a table row (tr) element
* `table-cell` makes the element behave like a table cell (td) element
* `table-row-group` makes the element behave like a table body row group (tbody) element
* `table-header-group` makes the element behave like a table header row group (thead) element
* `table-footer-group` makes the element behave like a table footer row group (tfoot) element
* `table-caption` makes the element behave like a table caption element
* `table-column` makes the element behave like a table column (col) element
* `table-column-group` makes the element behave like a table column group (colgroup) element

The CSS for the example in this post shows one possible way to style HTML for it to display like a table. We have display values that will cover all the table child elements as specified in the [HTML5 Specification](https://www.w3.org/TR/html5/tabular-data.html#the-table-element). 

It may not be the most elegant solution but it works and it provides a way to create table-like displays without breaking the web.

## Links

* http://www.digital-web.com/articles/everything_you_know_about_CSS_Is_wrong/ 
* https://www.iandevlin.com/blog/2013/06/css/css-stacking-with-display-table
* https://www.sitepoint.com/solving-layout-problems-css-table-property/


