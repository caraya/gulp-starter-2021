# Local apps versus hosted tools

Rachel Andrew's [It’s more than just the words](https://rachelandrew.co.uk/archives/2017/01/05/its-more-than-just-the-words/) triggered a reflection that I want to share with you. 

Does anyone remember when the only way to get a site online was to get your school (if you were so lucky) to provide you space for your web presence. Then came Geocities and other 'mass' host providers and we saw the birth and proliferation of the "weird" web... either one was the place where most of us began to play with the web.  
 
 
<figure>
<img src="https://i.kinja-img.com/gawker-media/image/upload/s--xJ-WV4WZ--/c_fit,fl_progressive,q_80,w_636/18edh1t46fw0spng.png" alt="">

<img src="http://blog.geocities.institute/wp-content/uploads/tumblr_mlk9sgmvAC1rlkewbo1_12801.png" alt="">

<img src="http://cdn0.dailydot.com/cache/0e/e3/0ee32ed1e94e79d7d53d7be26bec7aa1.jpg" alt="">
<figcaption>Example Geocities Pages</figcaption>
</figure>

Then some of us moved to private commercial hosting.  I went through IO.com mostly because I could get free access to Steve Jackson's game at the time. The page below is an experiment from that era                     

<figure>
<img src="http://publishing-project.rivendellweb.net/wp-content/uploads/2017/02/homepage-circa-1994-95.png" alt="">
<figcaption>Author's home page circa 1995 via the Wayback machine</figcaption>
</figure>

It evolved from there both in terms of hosting (where it went to the school's server, to IO and then to the WELL) and in terms of content, the more I learned the better I was able to present the content both in terms of HTML structure, CSS presentation and Javascript behaviors.

As time passed we've been able to host our content in third party applications and it became easier:

* We can upload images to Flickr or Google Photos
* We can host our written content in Wordpress blogs, AWS or Google Cloud
* Video can be hosted in Youtube or Vimeo
* Code samples can be placed in JSbin or Codepen

But, as Rachel points out on her post, we loose flexibility for convenience. We loose the flexibility of creating our own designs and surrender to the way other people want us to create our content. 

In the next sections i'll explore some of the issues involved in self-hosting versus third party tools and why i keep open spaces to play with technology regardless of where it goes...

## Before we start: CORS, What it is and how it works

<div class="message info">
<p>Before jumping into hosting locally versus using third party hosted apps I'll take a little detour and talk about CORS and how it works. CORS is essential for cross origin work and some of the APIs will only work with resources from the same origin unless CORS is enabled.</p>
</div>

A cross-origin request is one where the resource is located in a different server than the one making the request. For example the following example makes a cross-origin request from server a to server b. 
 
```html
<!-- This is a normal link pointing to a resource on same server -->
<a href="resource.html">local resource on server a</a>
<!-- This link is placed on server a -->
<a href="http://www.b.com/resource.html">Link to resource on server b</a>
```

For security reasons, browsers restrict cross-origin HTTP requests initiated from within scripts. For example, XMLHttpRequest and Fetch follow the [same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy). So, a web application using XMLHttpRequest or Fetch could only make HTTP requests to its own domain. To improve web applications, developers asked browser vendors to allow cross-domain requests.

<figure>
<img src="https://mdn.mozillademos.org/files/14295/CORS_principle.png" alt="">
<figcaption>Another example of how CORS requests work. Taken from <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS">MDN</a></figure>

CORS (Cross-Origin Resource Sharing) provides a way for servers to indicate who can access their resources. The only thing necessary for CORS to work is a header on a server's response to indicate to indicate they they can serve resources across domains. The header is:
 
 ```bash
 Access-Control-Allow-Origin", "*"
 ```

How you configure the server to send the CORS header will depend on txhe server you're working with. This information was taken from [enable-cors.com](https://enable-cors.org/)

### Express.js 

Adding the header with express is fairly simple. We create a an `app.use` block that adds the headers before passing to the next step in the chain. 

```javascript
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", 
             "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res, next) {
  // Handle the get for this route
});

app.post('/', function(req, res, next) {
 // Handle the post for this route
});
```

### Apache config or `.htaccess`

Apache's configuration style can be used in three different places:

* Default configuration
* Directory / Virtual Host configuration
* .htaccess configuration

To enable CORS we use `mod_headers` to set the header we want to, something like this:

```apache
Header set Access-Control-Allow-Origin "*"
```

Although `mod-headers` is installed by default on newer Apache configurations, please make sure it's enabled on your system: 

```command-line"
a2enmod headers
```

Unless you added the header to an `.htaccess` file you must restart the server for the changes to take effect. Th wayyou do it depends on your syste. It's either: 

```command-line
apachectl -t

sudo service apache2 reloadx
```

Or:

```command-line
apachectl -t

apachectl -k graceful
```

### NGINX 

Based on Michiel Kalkman [nginx cors open configuration](https://michielkalkman.com/snippets/nginx-cors-open-configuration/) we can see that an nginx configuration is a little more commplicated. We've added more than just the CORS header for each of the methods we want to work with (GET, POST, and OPTIONS). 

**Test in your server setup before deploying to a production environment.** 

```nginx
location / {
  if ($request_method = 'OPTIONS') {
    add_header 'Access-Control-Allow-Origin' '*';
    #
    # Om nom nom cookies
    #
    add_header 'Access-Control-Allow-Credentials' 'true';
    add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
    #
    # Custom headers and headers various browsers **should** be OK 
    # with but aren't
    #
    add_header 'Access-Control-Allow-Headers' 
      'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,
      If-Modified-Since,Cache-Control,Content-Type';
    #
    # Tell client that this pre-flight info is valid for 20 days
    #
    add_header 'Access-Control-Max-Age' 1728000;
    add_header 'Content-Type' 'text/plain charset=UTF-8';
    add_header 'Content-Length' 0;
    return 204;
  }
  if ($request_method = 'POST') {
    add_header 'Access-Control-Allow-Origin' '*';
    add_header 'Access-Control-Allow-Credentials' 'true';
    add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
    add_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,
    Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,
    Cache-Control,Content-Type';
  }
  if ($request_method = 'GET') {
    add_header 'Access-Control-Allow-Origin' '*';
    add_header 'Access-Control-Allow-Credentials' 'true';
    add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
    add_header 'Access-Control-Allow-Headers' 
    'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,
    If-Modified-Since,Cache-Control,Content-Type';
  }
}
```

## Going with third party hosting

I want to start by saying that I've got nothing against third party hosting in general or the companies i will mention in this section. Most of the time the tools and their use are ideal for a user's skill level or for the audience that a project is designed for. 

The flip side is that we limit ourselves to the way the companies want us to work and the technology and licenses we can use in our projects.  

Two of my biggest concerns have always been:

* What happens if a service goes down and how do we migrate the content from the service to a new offering
* How much will it cost (both time and money) to move from one service to another.   


Some of my experiences using other hosted services include the ones below.


### Wordpress.com

Take the Wordpress hosting service ([Wordpress.com](https://wordpress.com)) for example. 

It is free of charge and it allows to serve content within minutes of setting it up with a wide variety of themes that are available both free of charge and paid. there are a variety of plugins that enhance the site's functionality. 
 
The [customization](https://en.support.wordpress.com/customize/) is what I consider the weakest aspect of Wordpress.com. While I understand the need to keep a hosting environment working well for everyone I find it restricting that you [can't upload your own themes](https://en.support.wordpress.com/themes/adding-new-themes/) or themes that are provided outside Wordpress. 

In short unless you can find the perfect theme or one that is easily customizable to meet your goals there is no real way to get your theme to run in the hosted Wordpress.com. 

### Google Photos

Google Photos images are stored in the cloud and indexed by Google using their technologies available to the Google platform. However there is no obvious way to retrieve a URL to link to the images from outside the Photos platform.  There is also no obvious way to set up CORS.


### Codepen

[Codepen](http://codepen.io/) is one of those awesome all-in-one code tool.  It allows you create HTML, CSS and Javascript and their variations along with different CSS and Javascript libraries and frameworks. It's an awesome too for collaborative development, pair programming and live coding presentations at conferences and other events. 

When I first started using it I chose it because of its simplicity and, back then, because it had features that were unique to the platform... and for the longest time they worked well. 

<figure>
<img src="https://publishing-project.rivendellweb.net/wp-content/uploads/2017/02/codepen-embed-dialogue.png" alt="">
<figcaption>Embed preview/creation dialogue</figcaption>
</figure>

Over time the sheer number of embeds that I use made Codepen use prohibitive in terms of performance. The Javascript code for the emebeds is not shared across multiple embeds and I've never been certain on how (if) they are cached by the browser. The more distinct elements that we need to fetch from the network the higher the potential for our application to become unresponsive or sluggish. 

## Hosting locally

In the previous section we discussed some of the shortcomings of using hosted versions of some popular applications. Now I'll discuss some of my issues when working with the same or similar applications hosted in your own server that you have complete (or almost complete) control of the application and the hosting environment. 

This is both a blessing and a curse. 
  
It is a blessing because you can do a lot of things that a hosted service doesn't allow you to do and you don't have to worry about the maintenance of the backend. I can run most non-java and web-based applications as my server storage space allows. At some point I had Drupal, Joomla and Wordpress installed and running simultaneously on my host.  

It is a curse because the hosting provider may severely limit how you run your server.... Most modern VPS and dedicated virtual servers come bundled with cPanel or Plesk and that means that you're forced to do things the way the control panel wants you to do it. 
 
For most people this may be ok. I've got a different opinion. I grew up as a techie in an environment where everything was installed by hand and I miss being able to do manual installations and configurations without having to learn how Plesk wants me to do it. 

### Wordpress

I host 2 blogs with Wordpress, my personal blog started 10 years ago with 1 and 1 and later moved to Media Temple where it's lived since. My professional / technical  blog has been living in Media Temple since I started it in 2010. 
 
Some of the things I particularly like about hosting Wordpress on my own:

* I can run the SVN version of Wordpress which means I can run my development environment with the latest Wordpress code
* It gives me the ability to install and run any theme or plugin I want or need and I can debug them with whatever tools I need

Some of the downsides:

* You must know you way around a Unix system both through command line and GUI interfaces in Unix or OS X. <span class="footnote">There's probably a way to automate the process with a GUI but I choose to do it manually. It works better and it's what I'm used to it</span>
* Unless you're working directly on the server and Vi (the editor) is your friend you must have a way to transfer the files to the server for your production system. Either through SFTP, FTP or some other way to transfer files

## Google Cloud

It is technically possible to serve static HTTP sites from Google Cloud Storage buckets.  The information to create the static site in the Google Cloud Storage documentation site under [Hosting a Static Website](https://cloud.google.com/storage/docs/hosting-static-website). 

As the site warns this will only work with HTTP sites (shame Google Cloud) but they provide these [alternatives](https://cloud.google.com/storage/docs/static-website#https) to deliver content through HTTPS. 

COnsidering that most technologies now require HTTPS to work this makes Google Cloud a less appealing alternative for hosting experimental content. 
