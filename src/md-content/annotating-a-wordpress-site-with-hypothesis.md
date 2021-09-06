# Annotating a WordPress site with Hhypothesis

I've always been interested in web annotations as a means to increase interaction between users and content and between users.

Over the time I've been researching the annotation landscape I've found that [Hypothesis](https://hypothes.is) is my favorite. It also has a [WordPress plugin](https://wordpress.org/plugins/hypothesis/) that integrates personal Hypothesis accounts with whatever sites they visit, not just my WordPress site.

This post will discuss web annotations, how they are, and how they work. It will also discuss how to incorporate Hypothesis into a WordPress site using a plugin.

## What are web annotations?

Annotations are an additional layer of innformation attached to a web page. These layers of information are visible to other people viewing the page but are independent of the content of the page.

In the context of a blog, annotations enable people to interact with posts or pages without having an account.

## Implementation in WordPress

To work with WordPress, you need to download and install a [plugin](https://wordpress.org/plugins/hypothesis/) that integrates Hypothesis with your WordPress site.

Users will also need a [Hypothesis](https://hypothes.is) account. This will store your annotations on Hypothesis servers and will allow you to annotate any site using Hypothesis.

## How it works

When you go to page on this blog, you will see the Hypothesis UI running on the top right corner of the page. If you click on it you will see a list of other public annotations on this page and an editor for you to add more annotations to the page and interact with annotations left by others on the page.

<figure>
  <img src='https://res.cloudinary.com/dfh6ihzvj/images/v1629836729/publishing-project.rivendellweb.net/hypothesis-01/hypothesis-01.png?_i=AA' alt='Hypothes.is running on a WordPress site'>
  <figcaption>Hypothes.is running on a WordPress site</figcaption>
</figure>

You can choose to make your annotations public, where everyone visiting the page can see them, or private ones that only the author can see.

## Building a community

My hope in implementing Hypothesis for the blog is to allow people to comment and discuss items they find interesting. This will be a great way to build a community of people who share the same interests and are looking to learn from each other. While I write all the content, I'll be the first one to admit that I don't know it all, I don't know about a lot of things and I'm always looking forward to learning more about the web.

It can also be used to commuicate with readers without spamming them with emails. You can target posts to elicit a response from readers and can use their feedback to improve the content.

## Performance implications

Because Hypothesis is a web service that runs through a WordPress plugin, we need to pay attention to any potential performance issues.

I always try to keep the number of user-facing plugins on my WordPress sites to a minimum. I'll be monitoring core web vitals to make sure that performance hasan't regressed and the number of client-facing plugins I use on the site.

I will update this post when I get data on the performance of the plugin.
