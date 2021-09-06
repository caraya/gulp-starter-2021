# Dealing with third party libraries

Third party content is useful but sometimes it's really hard for me to understand what it does and decide how to use it.

In [Do you know where your third parties are going?](https://publishing-project.rivendellweb.net/do-you-know-where-your-third-parties-are-going/) we discussed part of the problem: How to measure the additional impact these scripts have on our site's performance when they add more scripts that may block rendering?

This post will cover some additional concerns I have with third party scripts.

We need to evaluate third party libraries for use in our applications.  This doesn't mean to only look at the code and decide which one you like best but it also means to test the code in your application and see which library or framework works best in your specific situation.

The first example that came to mind is date/time manipulation and [moment.js](https://momentjs.com/) versus [date.fns](https://date-fns.org/). There are many comparisons between the two and with many other date/time manipulation libraries.

I first start by researching what others have said about the libraries and how they've compared them. There's been plenty written about the libraries and their differences:

* [The 7 best JavaScript date libraries](https://blog.logrocket.com/javascript-date-libraries/)
* [momentjs vs date-fns](https://medium.com/@k2u4yt/momentjs-vs-date-fns-6bddc7bfa21e)
* [Why you should use Date.fns for manipulating dates with Javascript](https://javascript-conference.com/blog/why-you-should-use-date-fns-for-manipulating-dates-with-javascript/)

That's just a starting point, I will then run tests to validate the opinion I formed from reading other's research. I may have constraints that are not present for the people who wrote the articles I read.

Some of the questions I would ask, based on research and needs.

1. Does the library affect performance?
   1. Is there a way to reduce the size to something that fits within the site's performance budget
2. How easy is it for a bundler like WebPack or Rollup to tree shake the library to remove unused code?
3. Am I required to use modules and/or transpiler to make the library work?
   1. Am I already using modules or bundlers?
   2. Do I have to support browsers that don't support modules or imports?
4. How large is the dependency tree?
5. Is there an existing API in the ECMA 262 specification that does what I need?
   1. Is the proposal part of the spec?
      * Meaning it has already been published or is at stage 4 waiting for the next version of the spec?
   1. Is it going through specification? At what stage?

The last point is important. As ECMAScript continues to evolve, new proposals will appear that will provide native support for the feature only in browsers that support the feature either when it becomes part of the spec or as it reached stage 3 in the TC39 development process.

Taking date/time manipulation as an example, again. Once the [Temporal proposal](https://tc39.es/proposal-temporal/docs/) makes its way through the TC39 system, assuming that it does, we have another standard way to manage dates. At that point I hope we'll re-evaluate using libraries as our primary way to handle dates and times.

This brings me back to the issue of [evolving complexity](https://publishing-project.rivendellweb.net/evolving-complexity/) of our web projects. Event the simplest scripting challenge presents so many different options and ways to do things that it becomes hard to actually test whatever options we have available.
