# Annotations and Annotation Sharing

One thing I've always been interested in is Annotations; both how they work, and how to leverage them on the web.

In the context of a web page (whether site or application) an annotation is a way to provide additional context or information about a page or part of a page.

I find annotations particularly intriguing because, depending on the tool you use, you can make them public and share them with all users of your site that also use the annotation engine.

The sharing of content and, potentially, discussions about the content without third-party commenting system is very powerful to me.

[Hypothesis](https://web.hypothes.is/) allows you to annotate content on your site (see [Embedding Hypothesis](https://web.hypothes.is/for-publishers/#embedding) for more information on installing Hypothesis on your server. For WordPress, you should install the [Hypothesis plugin](https://wordpress.org/plugins/hypothesis/) which is what we did for this demonstration.

The following images show Hypothesis working on a WordPress site. The first one shows Hypothesis when you first open it.

<figure>
  <img src='https://res.cloudinary.com/dfh6ihzvj/image/upload/v1598492055/publishing-project.rivendellweb.net/annotation-01.png' alt='Hypothesis Extension open for the first time'>
  <figcaption>Hypothesis Extension open for the first time</figcaption>
</figure>

The second figure shows how the Hypothesis interface changes when you highlight text and want to annotate it.

<figure>
  <img src='https://res.cloudinary.com/dfh6ihzvj/image/upload/v1598492670/publishing-project.rivendellweb.net/annotation-02.png' alt='Hypothesis plugin ready to annotate a portion of the page'>
  <figcaption>Hypothesis plugin ready to annotate a portion of the page</figcaption>
</figure>

Saving the annotations will upload them to a third-party server that holds all your anotations using Hypothesis, regardless of what site they are on.

This third party server may be an issue for people who are worried about privacy. After long consideration, I decided that hosting the annotations for my site on Hypothesis' servers is less of an issue than having to assure the privacy and security of the annotations on my own server. so, for now, I'm ok with the server tradeof.

## Some thoughts on annotations

Not all sites need the conversation and the notes we annotate pages with, so that's a first consideration, whether the site we're building needs to be annotated.

Whether the annotations are public or private you can build on top of the content without changing the content itself. This is particularly useful when working in collaborative projects with geographically dispersed teams. Think of Hypothesis as a way to do Google Docs with existing documents.

The flip side of their usefulness is the constant vigilance we need to have to prevent annotations becoming another form of spam.

So go ahead and annotate whatever post you think interesting enough to comment. I will take the annotations into account when I update posts.
