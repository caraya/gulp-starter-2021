# HTML landmarks and accessibility

Landmarks, or what I call structural elements, help define the structure of a document and help accessibility tools like screen readers describe the content to users.

The following table shows the HTML elements used to describe document landmarks, the associated ARIA roles and a description of what the landmark accomplishes.

| HTML element | Implicit ARIA Role | Description |
| --- | --- | --- |
| aside | complementary | Shows  complementary content to the main subject of the page |
| footer | contentinfo | Displays information about a page. Typically that's things like copyright info, related links, the author |
| form | form | can be a landmark element if it has a accessible name (set with aria-label, aria-labelledby or title attributes) |
| header | banner | Where you put the page's introductory information like your logo, search and main navigation |
| main | main | contains the main body of content or functionality of your page |
| nav | navigation |  navigational links for your entire website or the current page |
| section | region | Standalone section of content. If none of the other landmarks fit then use a section. Like forms |
| None | search | The search ARIA landmark role has no associated HTML element. It is used to indicate search functionality. |

In addition to the accessibility benefits of these elements, they also give us an anchor to start writing CSS from.

For example, to remove all the bullets in list items inside `ul` elements, we could do something like this:

```css
footer ul li {
  list-style-type: none;
}
```

This will only remove the bullets in list located in the footer but will not affect list outside the footer.

**A consideration**: some of these landmark elements may be nested.

For example, the following elements can have `header` and `footer` elements as children:

* article
* aside
* main
* nav
* section

However, when these elements use `header` or `footer` the element refers to that parent element. In essence we're saying the `header` or `footer` belongs to the element that contains it, not the document

There is a lot more to talk about when we talk about landmarks. A good reference is [Landmarks and where to put them](https://www.htmhell.dev/adventcalendar/2022/4/) by [Kilian Valkhof](https://kilianvalkhof.com/)
