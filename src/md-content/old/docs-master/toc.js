/**
 toc.js
 **/

// We use an anonymous function to create a local scope
// and avoid polluting the global namespace
(function() {
    // Find the TOC container element.
    var toc = document.getElementById("toc");
    // check if the toc element exists
    if (!toc) {
      // If it doesn't exist create a div element
      toc = document.createElement("div");
      // give it the id of toc
      toc.id = "toc";
      // and insert it before the first child 
      // of the body element (normally an h1)
      document.body.insertBefore(toc, document.body.firstChild);
    }

    // Recursively traverse the document body looking for headings
    function findHeadings(root, sects) {
        for(var c = root.firstChild; c !== null; c === c.nextSibling) {
            if (c.nodeType !== 1) { 
              continue;
            }
            if (c.tagName.length === 2 && (c.tagName.charAt(0) === "h") || c.tagName.charAt(0) === "H"){
              sects.push(c);
            } else { 
                findHeadings(c, sects);
            }
        }
        return sects;
    }
  
    // Find all section heading elements
    var headings = '';
    if (document.querySelectorAll){ 
      // Can we do it the easy way?
      headings = document.querySelectorAll("h1,h2,h3");
    } else {
      // Otherwise, find the headings the hard way
      headings = findHeadings(document.body, []);
    }

    // Initialize an array that keeps track of section numbers.
    var sectionNumbers = [0,0,0];
    // Now loop through the section header elements we found.
    for(var h = 0; h < headings.length; h++) {
        var heading = headings[h];

        // Skip the section heading if it is inside the TOC container.
        if (heading.parentNode === toc) {continue;}

        // Figure out what level heading it is.
        var level = parseInt(heading.tagName.charAt(1));
        if (isNaN(level) || level < 1 || level > 6) {continue;}

        // Increment the section number for this heading level
        // and reset all lower heading level numbers to zero.
        sectionNumbers[level-1]++;
        for(var i = level; i < 6; i++) {sectionNumbers[i] = 0;}

        // Now combine section numbers for all heading levels
        // to produce a section number like 2.3.1.
        var sectionNumber = sectionNumbers.slice(0,level).join(".")

        // Add the section number to the section header title.
        // We place the number in a <span> to make it styleable.
        var span = document.createElement("span");
        span.className = "TOCSectNum";
        span.innerHTML = sectionNumber;
        heading.insertBefore(span, heading.firstChild);

        // Wrap the heading in a named anchor so we can link to it.
        var anchor = document.createElement("a");
        anchor.name = "TOC"+sectionNumber; 
        heading.parentNode.insertBefore(anchor, heading);
        anchor.appendChild(heading);

        // Now create a link to this section.
        var link = document.createElement("a");
        link.href = "#TOC" + sectionNumber; // Link destination
        link.innerHTML = heading.innerHTML; // Link text is same as heading

        // Place the link in a div that is styleable based on the level.
        var entry = document.createElement("div");
        entry.className = "TOCEntry TOCLevel" + level; 
        entry.appendChild(link);

        // And add the div to the TOC container.
        toc.appendChild(entry);
    }
}());