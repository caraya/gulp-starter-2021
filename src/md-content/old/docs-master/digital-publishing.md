(title slide)

# Creating epub ebooks

## It is not rocket science


(Slide)

# Agenda

* Assumptions
* Building the pieces
    * Creating the content
    * Creating the needed XML files
    * Generating mimetype file
* Packaging it together
* Validating the result


(Slide)

# Creating the content

* It's XHTML
* Need to follow basic XHTML rules
    * Attributes must be quoted
    * All tags must be closed
* Can have (almost) everything a webpage can
    * Online versus offline content

(Slide)

# Styling using CSS

* As much or as little as you want
    * Depends on content and design brief

(Slide)

# Creating Content (continued)

* Build example content (simulation with prebuilt template)

(Slide)

# Creating XML files

* Package.opf
    * Driver for entire epub book
    * Follows IDPF specification
        * 3 sections
            * Metadata (includes DC terms and attributes)
            * Package (lists the content/location/mime type of content in book)
            * Spine (list the content sequentially, uses IDs from package)

(Slide)

# Creating XML files (continued)

* Build package file ( simulation with prebuilt template )


(Slide)

# Creating XML files (continued)

* nav.tcx
    * Additional nagivation file
    * Works in addition to the package file
    
(Slide)

# Creating XML files (continued)

* Build nav file ( simulation with prebuilt template )



(Slide)

# Putting it all together

* We get the files together usin zip
    * There's a given order 
        * zip the mimetype first, uncompressed
        * zip the other files in the package<!-- MGA on Mon Oct 20 2014: null -->
