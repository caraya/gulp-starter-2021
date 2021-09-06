Questions about lazy loading and why it's enabled by default?

I've been reading the relevant discussions: [TRAC 44427](https://core.trac.wordpress.org/ticket/44427), and issues #18, and #4 in this repository but I still have questions about the rationale for making lazy loading the default without providing a way to change the behavior when needed.

I can see three cases where images should not automatically lazy load or the option should be given to the theme developer to choose whether lazy loading is acceptable or not:

* Blog Header images
* Single pages post featured images
* Content above the fold



