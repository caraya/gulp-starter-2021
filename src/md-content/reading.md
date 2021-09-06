# Reading Online?

One thing that has always intrigued me is how people read online and how it affects the way we structure web cotnent. Most of my influence comes from Jakob Nielsen and the Nielsen Norman group's research on how people read online.

Back in 1997, Nielsen reported that:

> As a result, Web pages have to employ **scannable text**, using
>
> - highlighted **keywords** (hypertext links serve as one form of highlighting; typeface variations and color are others)
> - meaningful **sub-headings** (not "clever" ones)
> - bulleted **lists**
> - **one idea** per paragraph (users will skip over any additional ideas if they are not caught by the first few words in the paragraph)
> - the [inverted pyramid](https://www.nngroup.com/articles/inverted-pyramids-in-cyberspace/) style, starting with the conclusion
> - **half the word count** (or less) than conventional writing
>
> We found that **credibility is important** for Web users, since it is unclear who is behind information on the Web and whether a page can be trusted. [Credibility can be increased](https://www.nngroup.com/articles/trust-or-bust-communicating-trustworthiness-in-web-design) by high-quality graphics, good writing, and use of **outbound hypertext links**. Links to other sites show that the authors have done their homework and are not afraid to let readers visit other sites.
>
> Users **detested "marketese"**; the promotional writing style with boastful subjective claims ("hottest ever") that currently is prevalent on the Web. Web users are busy: they want to get the straight facts. Also, credibility suffers when users clearly see that the site exaggerates.

Even in the web early days there was a need for compact and clear writing. Perhaps what's more important is to write with the user in mind.

10 years later in [write for reuse](https://www.nngroup.com/articles/write-for-reuse/), Nielsen further refines his point by suggesting how we should **write for web audiences**.

This is particularly interesting to me because it forces me to be **succint in what I write** and **stay consistent** in my writing style throughout the document.

> No matter your medium, it's fairly standard advice to simply write for your readers and their tasks. For old media, reader goals are well known, ranging from being entertained (when reading a mystery novel) to getting investment ideas (when reading the Wall St. Journal 's "Markets" section).
>
> Writing for the Web differs, however, because various users might approach a given piece of content **in different ways**:
>
> - **Reading** the page. Although thorough reading is a [fairly rare behavior](https://www.nngroup.com/articles/how-little-do-users-read/) for Web users, it certainly does happen.
> - **Scanning** the page **to judge** whether it's worth reading (or, indeed, whether the site was worth visiting in the first place).
> - **Scanning** the page **to locate** specific information, which can differ by user. For example, when looking at digital cameras on an [e-commerce product page](http://www.nngroup.com/reports/ecommerce-ux-product-pages-including-reviews/), sophisticated users might look for sensor size, whereas less knowledgeable users might be interested in megapixel count.
> - **Picking items** from a list, such as on a SERP (search engine results page), an [e-commerce category page](http://www.nngroup.com/reports/ecommerce-ux-homepages-and-category-pages/), or a news feed. (News feeds are also called RSS, but please remember to avoid this acronym; this year's usability studies confirm once again that [many users have no idea what "RSS" means](http://www.nngroup.com/articles/writing-social-media-facebook-twitter/).)
>
> In some of these scenarios, users see only a small portion of the content displayed out of context. They might, for example, see only a headline, or perhaps a headline, summary, and a thumbnail photo.
>
> ### Writing for Different Contexts
>
> The first challenge is to write content that will make sense when taken out of context. Fortunately, you can personally assess your content's usability in the most common **out-of-context scenarios**:
>
> - Does the **headline make sense** if it's all you see? Does it have sufficient [information scent](https://www.nngroup.com/articles/wrong-information-scent-costs-sales/) to attract those users who would be interested in the full story? (Note: it shouldn't be misleadingly attractive to users who'd be disappointed if they clicked; yes, you'd gain extra clicks, but you'd lose customers when they left your site in disgust.)
> - Does the **summary work to supplement** the headline when the two pieces of [microcontent](https://www.nngroup.com/articles/microcontent-how-to-write-headlines-page-titles-and-subject-lines/) are displayed together?
> - Is the **lead picture clear**? Lists use **small images** to represent products or articles; if your image isn't clear, crop it if possible.

## Writing Accessible Content

How you write may also have accessibility implications. WebAIM's [Cognitive Disabilities: Design Considerations](https://webaim.org/articles/cognitive/design) puts it very succintly:

> Short, simple, unambiguous phrases are easier to understand than long, complex, ambiguous ones. People with more profound cognitive disabilities need sentences that are extremely short, simple, and unambiguous. In some cases, they will not be able to understand sentences at all, relying completely on graphics, illustrations, and other non-text visual materials. This does NOT mean that you have to create image-only sites for general audiences, though adding high-quality supplemental illustrations is certainly a good idea. If, however, your primary audience is individuals with more severe cognitive disabilities you may need to create an image-only site.
>
> To the extent possible, try to avoid non-literal content such as sarcasm, parody, and metaphors. Also make sure to give readers all necessary background information about the topic at hand. (See also the article on [writing clearly and simply](https://webaim.org/techniques/writing/).)

Text content must to be as concise as possible and they need to add relevant images, audio, video or other non-textual content. We also need to be mindful that when we work with multiple audiences (and we all do whether we realize or not) the content needs to be even more concise than we would normally make it (it we make it concise to begin with).

It also takes some work to figure out when it's a good idea to support the text with images and what images to use or, if necessary, what images to create for the content we're writing.

As with many other aspects of accessibility we all benefit from the work we do for accessibility. In this case we all get better and easier to understand text, not just the people who we are primarily doing this for.

## Resources
- Writing Online
  - Jakob Nielsen early research on reading online
    - [Be Succinct! (Writing for the Web)](https://www.nngroup.com/articles/be-succinct-writing-for-the-web/)
    - [How Users Read on the Web](https://www.nngroup.com/articles/how-users-read-on-the-web/)
    - [Why Web Users Scan Instead of Reading](https://www.nngroup.com/articles/why-web-users-scan-instead-reading/)
    - [Measuring the Usability of Reading on the Web](https://www.nngroup.com/articles/measuring-the-usability-of-reading-on-the-web/)
    - [F-Shaped Pattern of Reading on the Web: Misunderstood, But Still Relevant (Even on Mobile](https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/)
    - [How People Read on the Web: The Eyetracking Evidence](https://www.nngroup.com/reports/how-people-read-web-eyetracking-evidence/) Nielsen Norman Group Report
    - [F-Shaped Pattern For Reading Web Content (original study)](https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content-discovered/)
- Cognitive Disabilites
  - W3C Cognitive and Learning Disabilities Accessibility Task Force: [Cognitive Accessibility User Research](https://w3c.github.io/coga/user-research/) Editor's Draft
  - [Cognitive Disabilities: Design Considerations](https://webaim.org/articles/cognitive/design)
  - [Cognitive Disabilities and the Web: Where Accessibility and Usability Meet?](http://ncdae.org/resources/articles/cognitive/)
  - [Designing for cognitive disabilities](https://www.slideshare.net/RuthEllison/designing-for-cognitive-disabilities) by Ruth Ellison
  - [Cognitive Disability and Technology: Universal Design Considerations](http://www.aucd.org/docs/ClaytonLewis.pdf)
