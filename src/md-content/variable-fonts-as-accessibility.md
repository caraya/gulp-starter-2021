# A font and alternatives?

Jay Panoz Twitter feed put [Lexend fonts](https://thomasjockin.github.io/lexend/) in my radar. It's a very interesting reading experiment that has been vetted in a small study with children.

Whenever I see studies like this it makes me curious. I can't access the full dissertatioon where the data is collected  (and I don't feel like paying for it either)

Theses and questions that I'm hoping to prove and answer throughout this post:

1. Are the metrics used for Lexend the only ones needed too make a good reading experience with good wcpm results?
2. What additional metrics do we need to work with for good reading results?
3. How do fonts like Lexend interact with these other metrics?
4. The sample used in the experiment were small in a single school. Would the results hold in a larger study or with older populations?
5. Would the results change if we compare Lexend with other sans-serif thick fonts?
6. We can find existing fonts that can do what Lexend does withuot major alterations to our existing content
7. We need to create good reading experiences for all  places where we read. Lexend is just a begining and a pointer to a process or tool to do it

## Getting started

Lexend uses the `Shaver-Troup Formulations`, product of Bonnie Shaver-Troup's doctoral dissertation work at Asuza Pacific University.

Three factors were manipulated in making the font easier to read. These factors were:

* Hyper expansion of character spacing
* Expanded font-outline shapes
* Sans-serif font to reduce noise

With this data we can begin our different experiments.

## Standard Test

Using Roboto as the testing font, I've built a [demo](https://caraya.github.io/localstorage-settings-demo/) to test one way to change the variable font settings to where the user is comfortable. The settings are saved to retore them when the user returns to the reading experience.

The font itself may be a limiting factor. It has only three variables axes: Weight, Width and Slant (Italics). I used weight and width for the project and incorporated line height as the three variables that we can modify.

One thing that I'm missing, and I don't know if it's possible to add directly through CSS is optical sizing. That's the next testing step.

## Adding Optical Sizing to the mix

TO look at Optical Sizing we have to understand what it is first.

Quoting Jason Pamental's [Variable fonts, Part the Second: Optical size, custom axes, and other curiosities](https://rwt.io/typography-tips/variable-fonts-part-second-optical-size-custom-axes-and-other-curiosities) section covering optical sizing:

> For many of us, the only sort of type we know is digital. And digital type has generally worked the same way for a long time. There is a single outline for every glyph, and changing the font size simply scales that glyph to the desired proportion. But if the typeface has particularly high contrast between thick and thin strokes, simply scaling the outline uniformly can lead to some unpredictable results.
>
> [&hellip;]
>
> The intent is that the optical size axis values correspond with the size at which the font is set. So an optical size range of 12 to 72 when used on the web should correspond to an equivalent pixel value (or points in print applications). Browsers are supposed to be able to set this automatically, but as of this writing Chrome still doesn’t support the property so you have to set it manually to get more universal results.

Jason then goes on into the more technical details of how to make optical sizing work on web browsers.

So how do we test this and how do we evaluate the impact of the optical size in the reading eperience and whether sans-serif fonts are still the best solution?

I've taken our original example and changed two aspects of it: The first is to add the ability to switch fonts between [Amstelvar](https://github.com/TypeNetwork/Amstelvar) and [Roboto Delta](https://github.com/TypeNetwork/Roboto-Delta), both of which have an optical size axis.

The second part is to add Optical Size as another parameter we can tweak.

So the question is **why pick a serif and a sans-serif font?** The optical sizing effect is less pronounced in a sans-serif font and I really want to see if optical sizing, by itself or in combination with the other cusotmizable axes, impact the way we read a piece of text.

## Following up

We have an initial set of tests, I would like to run tests to see how much do changes to the type used in the document changes the reader's comfort level.

The other side of the equation is that oour typographical solution has to remIN

## Links and Resources

* [Lexend fonts](https://thomasjockin.github.io/lexend/)
* [Optimizing Reading Performance by Manipulating the Shape, Size, and Spacing of Text to Match the Individual’s Visual Processing Capacity](https://revreading.org/wp-opt-perf/)
* [The Effect of Text Typographical Features on Legibility, Comprehension, and Retrieval of EFL Learners ](https://pdfs.semanticscholar.org/d495/ebc0b96bf944380855536427e2f18b1683e6.pdf) (PDF)
* [A synthesis of research on color, typography, and graphics as they relate to readability](https://apps.dtic.mil/dtic/tr/fulltext/u2/a161340.pdf) (PDF)
* [Does print size matter for reading? A review of findings from vision science and typography](https://jov.arvojournals.org/article.aspx?articleid=2191906#88123082)
* [On Reading](https://www.researchgate.net/publication/334771896_On_Reading)
