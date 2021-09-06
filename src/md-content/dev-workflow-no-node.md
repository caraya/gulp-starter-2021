# Dev workflow without Node

Mariko Kosaka posed the following question on Twitter today (10/05):

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Can I set up modern web development workflow without Node ?</p>&mdash; Mariko Kosaka (@kosamari) <a href="https://twitter.com/kosamari/status/916007878435119104?ref_src=twsrc%5Etfw">October 5, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

My answer was quick and to the point. I answered: **It depends on how you define modern and how much work are you willing to do manually**. Easier said than done... let's put research where the mouth is and figure out how much work would it actually take to build a moderately complex web site without using Node.js at all.

Here are the rules and tradeofs we make so we can work without Node:

- No `package.json`
- No `gulpfile.js` or `gruntfile.js`
- Build system that doesn't require Node
- SCSS to CSS conversion or handwritten conversions
- Image optimization for PNG, JPG, GIF and SVG
- ES2015+ scripts
- Manual concatenation of scripts

## Alternative Build Systems

Before I started using Grunt and, later, Gulp I used [Apache Ant](http://ant.apache.org/), an xml-based build system, originally created for Java-based build processes but now flexible enough to build almost anything.

It's XML-based and that may turn some of you off but I loved using Ant and I've used XML enough to not be afraid of it. Ant also satisfies the first three bullet points on our requirements list: It doesn't use Node so there is no package.json involved, it doesn't use Grunt or Gulp and or provides an alternative build system.

The example below illustrates how to run Ant to covert an XML file into a single HTML file.

```xml
<project name="writing" default="html-single" basedir=".">
    <description>
        Ant build file to create differeent versions of my short and not-so-short stories
    </description>
  <!-- set global properties for this build -->
  <property name="dist"  location="stories"/>

  <target name="init">
    <!-- Create the time stamp -->
    <echo message="Generating timestamp"/>
    <tstamp/>
    <!-- Create the build directory structure used by compile -->
    <echo message="Creating Directory to store resulting files"/>
    <mkdir dir="${dist}-{tstamp}"/>
  </target>

  <target name="html-single" depends="init"
        description="Create single HTML document " >
  <!-- Creates single HTML document using Saxon -->
  	<java classname="saxon.jar">
  		<arg value="-o stories.html"/>
  		<arg value="stories-db5.xml"/>
  		<arg value="carlos.xsl"/>
  	</java>
  </target>

  <target name="clean"
        description="clean up" >
    <!-- Delete the ${build} and ${dist} directory trees -->
    <delete dir="${build}"/>
    <delete dir="${dist}"/>
  </target>
</project>
```

It's not the only choice. If you're more comfortable you can work with Make, Rake or any other build system. The idea is not to use Node.

## SCSS to CSS

Fortunately for me, the original SASS/SCSS utility was written in Ruby and has a command line utility that will let us run SCSS and associated libraries from the command line without requiring a build system.

Installing Ruby SASS assumes that you've installed Ruby on your system. If you haven't you have the following options depending on your Operating System:

* Macintosh and Linux: You can choose to use the built-in version of Ruby or install [RVM](https://rvm.io/) as a way to install different versions of Ruby concurrently
* Windows users can use the [Ruby Installer](http://rubyinstaller.org/) to add Ruby to their system. This will also install a Powershell application to run ruby commands from

Once you have Ruby and Ruby Gems installed you can install Sass with the following command.

```bash
gem install sass
```

In Macintosh systems you may get an error, if you do then you need to install Sass as an administrator. Run the following command instead And enter your password when prompted.

```bash
sudo gem install sass
```

To test the installation type:

```bash
sass -v
```

This should return the version of SASS you installed, something like this:

```bash
Sass 3.5.2 (Bleeding Edge)
```

## Image Optimization: Raster Images

[ImageOptim (Mac)](https://imageoptim.com/mac)

[File Optimize (Windows)](https://sourceforge.net/projects/nikkhokkho/files/FileOptimizer/)

[Trimage (Linux)](https://trimage.org/)
## Image Optimization: SVG

[SVGOMG](https://jakearchibald.github.io/svgomg/)

## ES2015+ scripts

I'm making one dangerous assumption here; that our users will be in modern browsers  that will not need transpilation. I

## If you need an app.

<ul class="list-feature"> <li> <a href="">CodeKit</a> <span class="info">(Paid)</span> <span class="mac-icon"></span> </li> <li> <a href="">Compass.app</a> <span class="info">(Paid, Open Source)</span> <span class="mac-icon"></span> <span class="windows-icon"></span> <span class="linux-icon"></span> </li>


If you need an application, these will fit the b

<table>
  <thead>
    <th>Name</th>
    <th>Type</th>
    <th>Platforms</th>
  </thead>
  <tbody>
    <tr>
      <td><a href="http://incident57.com/codekit/">CodeKit</a></td>
      <td>Paid</td>
      <td>Mac Only</td>
    <tr>
      <td><a htdref="http://compass.kkbox.com/">Compass.app</a></td>
      <td>Paid, Open Source</td>
      <td>Mac, Windows and Linux</td>
    </tr>
    <tr>
      <td> <a href="http://www.vanamco.com/ghostlab/">Ghostlab</a></td>
      <td>Paid</td>
      <td>Mac and Windows</td>
    </tr>
    <tr>
      <td><a href="http://hammerformac.com/">Hammer</a></td>
      <td>Paid</td>
      <td>Mac Only</td>
    </tr>
    <tr>
      <td><a href="http://koala-app.com/">Koala</a></td>
      <td>Open Source</td>
      <td>Macintosh, Windows and Linux</td>
    </tr>
    <tr>
      <td><a href="http://livereload.com/">LiveReload</a></td>
      <td>Paid, Open Source</td>
      <td>Macintosh and Windows</td>
    </tr>
    <tr>
      <td><a href="https://prepros.io/">Prepros</a></td>
      <td>Paid</td>
      <td>Macintosh, Windows and Linux</td>
    </tr>
    <tr>
      <td><a href="http://scout-app.io/">Scout-App</a></td>
      <td>Free, Open Source</td>
      <td>Macintosh, Windows and Linus</td>
    </tr>
  </tbody>
</table>
