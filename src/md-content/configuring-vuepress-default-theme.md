# Configuring Vuepress default theme

In the [last post](https://publishing-project.rivendellweb.net/docs-as-code-the-technical-side/) we discussed the basic set up of a barebones Vuepress site.

This post will cover some basic details of the theme: the naviation menu and the sidebar.

To create the configuration you need to create the directory where Vuepress stores its data. From the root of the site create a `.vuepress` directory.

```bash
mkdir -p /docs/.vuepress/
```

Inside the `.vuepress` directory, creaate a `config.js` file. The rest of the work will be done in this file.

The first part of the module export declaration defines some basic metadata for the site.

The `head` array will contain a list of values that we want to put on the head of our final HTML documents.

The `evergreen` attribute tells Vuepress whether we want to only work with modern [evergreen browsers](https://www.techopedia.com/definition/31094/evergreen-browser). For this project I've chose to work with Evergreen browsers as this reduced the amount of work we need to do to support older browsers; the discussion of advantages and disadvantages of doing this is far longer and more detailed than I have space for in this post; maybe a separate post for it makes sense.

```js
module.exports = {
  //Basic Metadata about the site
  title: 'Hello VuePress',
  description: 'Just playing around',
  head: [],
  evergreen: true,
```

The next and, in my opinion, most important part of the configuration is the theme-related portions of it.

Using the `theme` attribute we tell Vuepress what theme we want to use. In this case this is the default theme provided with Vuepress.

`themeConfig` contains additional configuration. In this case the top navigation (on the right side of the page) and the sidebar.

`nav` takes an array of objects containing the text and the link for the individual menu items.

`sidebar` contains an array of paths for the elements we want to put on the sidebar.

```js
  // Theme information and configuration
  theme: '@vuepress/theme-default',
  themeConfig: {
    // Top-right navigation
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'Projects', link: '/projects/' },
      { text: 'Github', link: 'https://github.com' },
    ],
    // Sidebar
    sidebar: [
      '/',
      '/guide/',
      '/projects/'
    ]
  },
}
```

Vuepress will do a lot of work behind the scenes to display the headers for the documents and create navigation between the documents.

See Vuepress [Config Reference](https://vuepress.vuejs.org/config/) for additional configuration and extensibility options.
