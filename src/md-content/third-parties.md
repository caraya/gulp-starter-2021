# Do you know where your third paries are going?

<div class="video">
<iframe loading="lazy" width="560" height="315" src="https://www.youtube.com/embed/31WieWrYPqc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Third party scripts on your site present a potentially dangerous side effect. We don't know what additonal assets third party load. That has security and performance implications. This post will look at the performance side of the issue.

As Simon Hearne writes in [How to Find the Third-Parties on Your Site](https://simonhearne.com/2015/find-third-party-assets/) using third party scripts that, in turn, make calls to additional sites and parties outside their (and your) control can affect the performance of your site. Quoting the post:

> I ran the homepage through WebPageTest and sure enough, there were a bunch of calls to various subdomains of facebook.com. Thankfully WebPageTest stores initiator, referer and redirect headers; so with a little work you can find out where these third-party calls come from. The director was correct, there were no calls to Facebook on their site. It was a third-party creating fourth-party calls to Facebook! This can have serious ramifications if the Facebook (or any other third-party call) affects customer experience.

## So why does this matter?

As Steve Souders ([Frontend SPOF](https://web.archive.org/web/20170513041323/http://www.stevesouders.com/blog/2010/06/01/frontend-spof) and [Frontend SPOF survey](https://web.archive.org/web/20170425125246/https://www.stevesouders.com/blog/2011/10/13/frontend-spof-survery/)), Pat Meenan ([Testing for Frontend SPOF](https://web.archive.org/web/20180510215456/http://blog.patrickmeenan.com/2011/10/testing-for-frontend-spof.html)), and Joshua Bixby ([How vulnerable is your site to third-party failure?](https://web.archive.org/web/20180510231528/http://www.webperformancetoday.com/2011/10/13/how-vulnerable-is-your-site-to-third-party-failure/)) write, "fourth party" scripts (scripts called from third party code) can have adverse effects on your site's performance. You (and potentially your client) have no way of controlling what these scripts do and whether they will block or slow down rendering.

In [Things to Know (and Potential Dangers) with Third-Party Scripts](https://css-tricks.com/potential-dangers-of-third-party-javascript/), Yaphi Berhanu list additional concerns about third party scripts that go beyond performance. The article is from 2017 still presents points that are still worth researching.

## Testing

A very ineresting to see the number of requests your third party scripts generate is to run your site through [Request Map](https://requestmap.webperf.tools/) and see see the results. I was surprised to see how many of its own submodules a script requested in the layout-experiments site.

The images that follow present Request Map results for three different websites, two sites I own and [cnn.com](https://www.cnn.com).

For the CNN request map, note that the circles are smaller and the name of individual aassets are impossible to read because of the number of assets involved.

<figure>
  <img loading="lazy" src="https://res.cloudinary.com/dfh6ihzvj/image/upload/v1592118670/publishing-project.rivendellweb.net/requestmap-rivendellweb-net.png" alt="">
  <figcaption>Requet map for <a href="https://rivendellweb.net">rivendellweb.net</a>. Created from <a href="https://requestmap.webperf.tools/">Request Map Generator</a></figcaption>
</figure>

<figure>
  <img loading="lazy" src="https://res.cloudinary.com/dfh6ihzvj/image/upload/v1592165138/publishing-project.rivendellweb.net/requestmap-layout-experiments-scaled.jpg" alt="request map for layout-experiments.firebaseapp.com">
  <figcaption>Requet map for <a href="https://layout-experiments.firebaseapp.com">layout-experiments.firebaseapp.com</a>. Created from <a href="https://requestmap.webperf.tools/">Request Map Generator</a></figcaption>
</figure>


<figure>
  <img loading="lazy" src="https://publishing-project.rivendellweb.net/wp-content/uploads/2020/06/requestmap-cnn-scaled.jpg" alt="request map for cnn.com">
  <figcaption>Requet map for <a href="https://www.cnn.com">CNN</a>. Created from <a href="https://requestmap.webperf.tools/">Request Map Generator</a></figcaption>
</figure>


## Solving the issue

In an ideal world you'd be able to trust your third party scripts that they will do a minimum due dilligence on their  dependencies.

But in the real world we don't have that luxury. We use what we must and we hope that scripts that are loaded by our third party scripts will not slow down our applications.

Tools like request map will not stop the spread of unknown and unwanted scripts but they will definitely help when clients ask you where did that script come from and when you go to the third party script providers and ask why are the additional assets being loaded.
