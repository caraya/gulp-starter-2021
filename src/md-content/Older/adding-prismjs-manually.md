# Wordpress: Adding Prism.js Without a Plugin

After a while I discovered why my blog wasn't highlighting code as I wanted it to. Plugins are too old and the Markdown plugin in Jetpack is not producing the correct HTML from the Markdown I'm writing. 

I've spent the last few days trying to update plugins with a recent version of Prism that has the plugins I want to use and the languages I want to use are properly configured. 

Instead of creating a plugin (which may be a future project) I've chosen to add this to my theme's `functions.php` and evaluate how it works and then decide if and how to incorporate it to my production site. 

The process takes 3 steps

1. Upload the Prism CSS and Javascript files to your server
2. Add the functions to the theme's `functions.php`
3. Edit the content of your database to make the changes to how the languages are written in the HTML

We'll cover these steps individually. 

## Upload the Prism files to your server

I won't tell you how to upload your files. You can use (s)ftp, your control panel, whatever you choose is fine. The important thing is to put it inside your theme under the `/prism/` path: `/prism/css` for style sheets and `/prism/js` for your stylesheets. 

Once that's done we can move to the next step: Adding the functions to load the script and stylesheet. 

## Add the functions to the theme's functions.php

The fuction `add_prism` registers and enqueues the stylesheet and javascript files for Prism.

```language-php
// Function to add prism.css and prism.js to the site
function add_prism() {
    wp_register_style('prismCSS', 
    get_stylesheet_uri() . '/prism/css/prism.css'
  );
  // Register prism.js file
  wp_register_script(
    'prismJS', // handle name for the script
    get_stylesheet_uri() . '/prism/js/prism.js'
  );
  
  // Enqueue the registered style and script files
  wp_enqueue_style( 'prismCSS');
  wp_enqueue_script( 'prismJS' );
}
add_action('wp_enqueue_scripts', 'add_prism');
```

The problem is that even after adding these functions we will not get the results I want. It turns out that Jetpack's Markdown parser  does not change the name of the code fence. When I write a Javascript fenced block like this (the closing of the fenced block has a backslash (\) on purpose, otherwise it will not display)

```language-markdown
```jvascript
// code goes here 
\```
```

Jetpack produces the following HTML:

```language-markup
<pre><code class="javascript">
// code goes here
</code></pre>
```

which is not what I expect to see, I expect to see something that will work with a syntax highlighter like the code below. 

```language-markup
<pre><code class="language-javascript">
// code goes here
</code></pre>
```

I've contacted Jetpack support and I hope for a quick resolution moving forward but there is likely no easy way to fix existing posts (over 100 of them) other than editing the database. 

## Edit the content of your database

<div class="message danger">
<p>Before attempting any changes on the database make sure that you back up your database, ideally both a Wordpress export and a SQL backup with phpMyAdmin or similar tool.</p>
<p>If you don't make backups and your database explodes I am not responsible</p>
</div>

There are two ways of updating content in your database. 

The first one is to open phpMyAdmin, clicking on your Wordpress database, selecting the SQL tab and running the following command where text to find correspond to the existing values column and text to replace with is the new value. 

```language-sql
update wp_posts set post_content =
replace(post_content,'Text to find','text to replace with');
```

I tried this way and screwed up my development system so I quickly retored from my phpMyAdmin backup and wwent to the drawing board. 

Through one of the tutorias I read to figure out how to do this I found a Wordpress plugin, [Better Search Replace](https://wordpress.org/plugins/better-search-replace/), that will let me do this from within Wordpress and hopefully it'll save me from myself and my own stupidity. 

I installed and activated the plugin in my development system and tested it... It worked perfectly. 

I did the same thing in production and it worked just as fine :)

The table below shows the languages that I searched for and (left column) and what I replaced with (right side). I probably missed some. If you find any code block that is not highlighted, please let me know. 

<table>
<tr>
  <th>Existing Values</th>
  <th>New Values</th>
</tr>
<tr>
  <td>
  <ul style="list-style: none;">
    <li>xml</li>
    <li>html</li>
    <li>markup</li>
  </ul>
  <td>language-markup</td>
</tr>
<tr>
  <td>  
  <ul style="list-style: none;">
    <li>css</li>
  </ul></td>
  <td>language-css</td>
</tr>
<tr>
  <td>
  <ul style="list-style: none;">
    <li>scss</li>
    <li>sass</li>
  </ul>
  </td>
  <td>language-scss</td>
<tr>
  <td>
  <ul style="list-style: none;">
    <li>nginx</li>
  </ul>
  </td>
  <td>language-nginx</td>
</tr>
<tr>
  <td>
  <ul style="list-style: none;">
    <li>apache</li>
  </ul>
  </td>
  <td>language-apacheconf</td>
</tr>
<tr>
  <td>
    <ul style="list-style: none;">
    <li>php</li>
    <li>php5</li>
  </td>
  <td>language-php</td>
</tr>
<tr>
  <td>
  <ul style="list-style: none;">
    <li>handlebars</li>
  </ul>
  </td>
  <td>language-handlebars</td>
</tr>
<tr>
  <td>
  <ul style="list-style: none;">
    <li>bash</li>
  </ul>  
  </td>
  <td>language-bash</td>
</tr>
</table>

## Conclusion

Working with Wordpress is not always easy but you can usually get a working solution if you're willing to put in the work.

Jetpack support got back to me and confirmed that the issue is a bug on their Markdown parser and suggested a solution. When the parser is fixed the solution will stop working, I think, but now I know how to fix these problems :) 

Finally, these are the two resources I used to create the solution:

* [How to Find and Replace Text with One Click in your WordPress Database](http://www.wpbeginner.com/wp-tutorials/how-to-find-and-replace-text-with-one-click-in-your-wordpress-database/)
* [How To Implement Prism.js Syntax Highlighting Into Your WordPress Site](http://crambler.com/how-to-implement-prism-js-syntax-highlighting-into-your-wordpress-site/)
