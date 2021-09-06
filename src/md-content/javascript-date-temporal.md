# Working with dates in Javascript: The Temporal proposal

<div class="message warning">
  <p><strong>Note:</strong></p>
  <p></p>
  <p>The Temporal code is not ready for production, it is still possible (but not likely) that it'll change in incompatible ways before the final version is added to the ECMAScript specification, and because of that, it shouldn't be used in production until it reaches stage 4 in the TC39 process. However, you can test how it works now and decide if you want to use it in future projects.</p>
</div>

One of the most infuriating things to do in Javascript is date manipulation. The default Javascript [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) object is hard to work with. This has lead to a proliferation of third-party libraries like [Moment.js](https://momentjs.com/), [Luxon](https://moment.github.io/luxon/), [date-fns](https://date-fns.org/) and even the Javascript [Intl API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) for some types of data manipulation.

For this post we'll concentrate in the [Temporal Proposal](https://tc39.es/proposal-temporal/docs/#Temporal-TimeZone), currently at stage 3 in the TC39 process. The idea is that `Temporal` will sit alongside the `Date` object and provide better date/time handling functionality without breaking existing code that uses the `Date` object.

According to the [Temporal documentation](https://tc39.es/proposal-temporal/docs/):

> Date has been a long-standing pain point in ECMAScript. This is a proposal for Temporal, a global Object that acts as a top-level namespace (like Math), that brings a modern date/time API to the ECMAScript language. For a detailed look at some of the problems with Date, and the motivations for Temporal, see: [Fixing JavaScript Date](https://maggiepint.com/2017/04/09/fixing-javascript-date-getting-started/).
>
>Temporal fixes these problems by:
>
> * Providing easy-to-use APIs for date and time computations
> * First-class support for all time zones, including DST-safe arithmetic
> * Dealing only with objects representing fixed dates and times
> * Parsing a strictly specified string format
> * Supporting non-Gregorian calendars

SO with all the information out of the way, let's look at some code. I wrote these demos using Node; so the first step, as usual, is to require the code or import it if you're working with ESM Imports.

```js
const { Temporal } = require('proposal-temporal');
```

## Date and Date/Time objects

The first step in the research is to get the date right now. Note that this will provide the ISO calendar-based dates and date/time combinations using methods in the `Temporal.now` object.

**If you run your own tests with this code your results will be different because the timing of now will be different than mine** :)

```js
const date = Temporal.now.plainDateISO();
// returns the date in ISO 8601 date format
date.toString(); 

const date2 = Temporal.now.plainDateTimeISO();
// returns the time in ISO 8601 format
date2.toString();
```

We can also get the time based on our time zone by using `zonedDateTimeISO` as the calendar instead of plain ISO as in the previous examples.

```js
const date2 = Temporal.now.zonedDateTimeISO();
date2.toString();
```

Using a time zone as a parameter we can specify different times for our object. We cam use individual variables to contain the different date and time strings.

```js
const dateWithTimezone4 = Temporal.now.plainDateTimeISO('America/Los_Angeles');
console.log(`Local Time: ${dateWithTimezone4.toString()}`);

const dateWithTimezone = Temporal.now.plainDateTimeISO('America/Chicago');
console.log(`Chicago Time: ${dateWithTimezone.toString()}`);

const dateWithTimezone2 = Temporal.now.plainDateTimeISO('America/New_York');
console.log(`New York Time: ${dateWithTimezone2.toString()}`);

const dateWithTimezone3 = Temporal.now.plainDateTimeISO('Asia/Tokyo');
console.log(`Tokyo Time: ${dateWithTimezone3.toString()}`);

const dateWithTimezone5 = Temporal.now.plainDateTimeISO('Chile/Continental');
console.log(`Santiago, Chile Time: ${dateWithTimezone5.toString()}`);
```

Or we can use a function to output the results we want. The function uses a [for of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of) ot iterate over a list of iterables from our `citiesToCheck` generated with [object.entries](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)

We then log to console the name of the city and the result of running `Temporal.now.zonedDateTimeISO` for the corresponding time zone.

```js
const citiesToCheck = {
  'Los Angeles': 'America/Los_Angeles',
  'Chicago': 'America/Chicago',
  'New York': 'America/New_York',
  'Tokyo': 'Asia/Tokyo',
  'Santiago, Chile': 'Chile/Continental',
};

for (const [name, timeZone] of Object.entries(citiesToCheck)) {
  console.log(`${name}: ${Temporal.now.zonedDateTimeISO(timeZone)}`);
}
```

We can use something like this to keep a world clock-like application. Every time you reload the page the times for all your cities and time zones will be updated or you could run it so it updates once a second.

## Building dates and date/times from custom parts

So far we've worked with dates based on the current time. But we can also build specific dates.

We can build the `Temporal.PlainDate` objects from an object containing key/value pairs for each element (year, month and day) or from an ISO 8601 date.

```js
const instant = Temporal.PlainDate.from({ year: 1974, month: 3, day: 14 });
instant.toString();
// Result = '1974-09-25'

const instant2 = Temporal.PlainDate.from(Temporal.now.plainDateTimeISO());
instant2.toString();
// Result = 2021-05-07
```

We can further refine it by breaking out date and time elements.

```js
const instant3 = Temporal.PlainDate.from(
  Temporal.now.plainDateTimeISO('Chile/Continental')
);

const instant3a = Temporal.PlainTime.from(
  Temporal.now.plainDateTimeISO('Chile/Continental')
);

instant3.toString();
// Result = '2021-05-07'
instant3a.toString();
// Result = '11:49:24.125564123'
```

The last item I found interesting when playing with dates is that we can find out what day of the week a given date falls in that specific date.

We create a `Temporal.PlainDate` object with the date we want to work with. Then we creaate a 2-dimensional array with the days of the week in one array and the specific day we want expressed as `instant.dayOfWeek -1`. This will return the correct day of the week for our instant date.

```js
// BUILDING TEMPORAL DATES FROM STRINGS AND OBJECTS
const instant = Temporal.PlainDate.from({ year: 1974, month: 3, day: 14 });
instant.toString();
// Result = '1974-03-14'

['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][
  instant.dayOfWeek - 1
];
// Result = 'Thursday'
```

## Time Stamps

Another area of interest is timestamp generation. We can use these are hashes for files or to measure time since the [Unix Epoch](https://en.wikipedia.org/wiki/Unix_time). This is particularly useful when working with code.

To generate the time stamp, use the `Temporal.now.instant()`, which will be the end time of the comparison, and then choose the precision you want to work with either milliseconds (`epochMilliseconds`) or seconds (`epochSeconds`). This will measure how many of your chose units have ocurred between the Unix Epoch  (1970-01-01) and the value of `now.instant`

```js
const timeStamp = Temporal.now.instant();

// Timestamp in Milliseconds
timeStamp.epochMilliseconds;
// Timestamp in Seconds
timeStamp.epochSeconds;
```

## Integrating with `Intl.DateTimeFormat`

There is currently work in progress to integrate the Temporal proposal with ECMA 402's [Intl.DateTimeFormat()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat).

The current discussion is happening in a [Github issue](https://github.com/tc39/proposal-temporal/issues/129) that I think is worth keeping track of. For now, there's no integrated API for developers to experiment with.

## Notes and closing

There is plenty more you can do with the Temporal Proposal. If you're interested in tracking its evolution to stage 4 and publication as part of ECMAScript, the best place to do it is the Github Repository, particularly the cookbook, the issue tracker and the specification itself if you can understand the way specifications are written

## Links and Resources

* [Dates and Times in Javascript](https://blogs.igalia.com/compilers/2020/06/23/dates-and-times-in-javascript/) &mdash; Igalia
* [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) &mdash; Wikipedia
* Javascript [Internationalization API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)  &mdash; MDN
* [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat) &mdash; MDN
* [Temporal Propopsal](https://tc39.es/proposal-temporal/) &mdash; TC39
* [Temporal Proposal Cookbook](https://tc39.es/proposal-temporal/docs/cookbook.html) &mdash; TC39
