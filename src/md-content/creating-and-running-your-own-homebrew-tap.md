# Creating and Running Your Own Homebrew Tap

I love Homebrew, I really do. But some of the limitations of the system, while understandable from a maintenance point of view, can be really frutrating.

The latest example, and what prompted me to look at this is Graphics Magick and it's Perl package dependency.

I get it I'm probably in the minority wanting to run Graphics Magick Perl module. The downside is that the only way to get it is to install it as a dependency when you compile the Graphics Magick package.

That would be great, except that Homebrew formula doesn't support the Perl module dependency. There is no way to add the `--with-perl` option to the formula at install time and there is no external way to install the Perl module.

In [How to Create and Maintain a Tap](https://docs.brew.sh/How-to-Create-and-Maintain-a-Tap) the Homebrew team shows how to create a tap and how to add formulae and casks to it.
