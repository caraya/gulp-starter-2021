# Virtual Reality: then and now

I first became interested in virual reality while I was an undergraduate working in an Anthropology independent study project.

That's where I first became interested in online games, online identity, online performance, online identity and other areas of what the internet was at the time.

Over time I've picked a more nuanced approach to these areas of interest and picked others along the way. This essay (or series of essays) seek to put down and, where possible, tie together these areas of interest in a way that makes sense and can further the research I want to do.

# Setting the context: Historical record

Current MMOs and fantasy games trace their lineage directly or indirectly from the earliest text-based games created by Hackers and MIT students in the 1970s. That's where we will start our historical review.

Most computing work outside research centers like SRI and academic settings was limited to mainframe computers and terminal access and assembly or precursors to the C programming languages.

While the first communication between ARPANet hosts (UCLA and Stanford) was in October 1969, the network, as we know it today, was a long way away.

There was no commercial internet, at least not as we know it today; all access to the ARPANet was through terminals at Academic institutions.

Outside the ARPANet, most contact was through [Bulletin Board Systems](https://en.wikipedia.org/wiki/Bulletin_board_system) with limited dial-up speeds and number of simultaneous connections dependent on the number of modems available, each requiring a dedicated phone line.

## Text-based games

In the 1970s and 80s computers as we know them today did not exist. There was no concept of dialup providers and the BBSs of the time provided limited functionality.

It is no surprise that the earliest games originated in academic institutions and were limited to the terminals available at the time.

The vignetes in the following sections are meant as snapshots and not as exhaustive stories about the games. The intent is to create a timeline tying together the earliest text-based game to where we are today and where we may be going.

### Adventure

The earliest reference to a text-based computer game is [Colosal Cave Adventure](https://en.wikipedia.org/wiki/Colossal_Cave_Adventure) or Adventure for short.

The game was designed by Will Crowther for the PDP-10 mainframe computer and expanded upon in 1977 by Don Woods. In the game, the player explores a cave system rumored to be filled with treasure and gold. The game is composed of multiple locations; The player moves between these locations and interacts with objects in them by typing short commands which are interpreted by the game's natural language input system.

The program acts as a narrator, describing the player's location and the results of the player's attempted actions. It is the first well-known example of interactive fiction, as well as the first well-known adventure game, for which it was also the namesake.

<figure>
  <img src="https://rivendellweb.net/blog/wp-content/uploads/2022/11/Colossal_Cave_Adventure_on_VT100_terminal.png" width='800'>
  <figcaption>Colossal Cave Adventure on VT100 terminal - <a href="https://commons.wikimedia.org/w/index.php?curid=33164592">By Autopilot</a></figcaption>
</figure>

Colossal Cave Adventure was one of the first teletype games and was massively popular in the computer community of the late 1970s, with numerous ports and modified versions being created based on Woods' source code. Through its successors, it also influenced the creation of MUDs and  the computer role-playing game genres. In 2019 was inducted into the World Video Game Hall of Fame by the International Center for the History of Electronic Games.
  
<figure>
  <img src='https://rivendellweb.net/blog/wp-content/uploads/2022/11/ADVENT_-_Crowther_Woods.png' width='668'>
  <figcaption>Adventure Opening Screen</figcaption>
</figure>

### Zork

Zork was first released in 1977 by developers Tim Anderson, Marc Blank, Bruce Daniels, and Dave Lebling for the PDP-10 mainframe computer.

The original developers and other people affiiated with MIT formed Infocom in 1979 and expanded the game into three titles which were released commercially for a variety of personal computers beginning in 1980.

The structure and play style of Zork is similar to Adventure and both programs act as the narrator, describing the player's location and the results of the player's attempted actions.

Blank and Joel Berez created a way to run a smaller portion of Zork on a range of microcomputers, letting them commercialize the game as Infocom's first products. company published all three episodes beginning in late 1981.

### Multiplayer Games

Both Adventure and Zork are single-player games. The next logical step is to make the games multiplayers.

#### MUD1/Essex MUD, the first of many

In 1978 Roy Trubshaw, a student at the University of Essex in the UK, started working on a multi-user adventure game in the MACRO-10 assembly language for a DEC PDP-10. He named the game MUD (Multi-User Dungeon), in tribute to the Dungeon variant of Zork, which Trubshaw had greatly enjoyed playing.Trubshaw converted MUD to BCPL (the predecessor of C), before handing over development to Richard Bartle, a fellow student at the University of Essex, in 1980.

The game revolved around gaining points till one achieved the Wizard rank, giving the character immortality and special powers over mortals.

MUD1 or Essex MUD ran on the University of Essex network, and became more widely accessible when a guest account was set up that allowed users on the [JANET](https://en.wikipedia.org/wiki/JANET) academic computer network to connect on weekends and between the hours of 2 AM and 8 AM on weekdays. It became the first Internet multiplayer online role-playing game in 1980, when the university connected its internal network to ARPANet.

MUD1 game was closed down in late 1987, reportedly under pressure from CompuServe, to whom Richard Bartle had licensed the game. This left MIST, a derivative of MUD1 with similar gameplay, as the only remaining MUD running on the University of Essex network. MIST ran until the machine that hosted it, a PDP-10, was retired in early 1991.

1985 saw the birth of a number of projects inspired by the original MUD, both free and commercial.

We'll look at four flavors of MUD descedants

#### DikuMud

The original DikuMud, to separate it from all the derivative games using the same code, was heavily influenced by earlier MUD games.

It was written in 1990 and 1991 by Sebastian Hammer, Tom Madsen, Katja Nyboe, Michael Seifert, and Hans Henrik Stærfeldt at DIKU (Datalogisk Institut Københavns Universitet)—the department of computer science at the University of Copenhagen in Copenhagen, Denmark.

The games using DikuMud's codebase are mostly "hack and slash" games, where the players assume a class and face monsters in a hard-coded virtual world.

#### TinyMUD

TinyMUD is a descedant of Essex MUD and created some of the concepts we still see indirectly in our modern computer games.

TinyMUD was created in 1989 by James Aspnes. From the beginning it sought to distance his game from the hack and slah MUDs in the Diku tradition and claimed that the "D" in TinyMUD stood for dimension or domain rather than dungeon.

TinyMUD was one of the first games that allowed players to modify and expand the world, by adding new objects to the database for all players to interact with.

This is an example of available commands  from "Three's Unabridged Dictionary of Commands" by Chrysalis (1990):

```text
@chown <object>=<player>. Changes the ownership of an object.
@create <name> [=<cost>]. Creates a thing with the specified name.
@describe <object> [=<description>]. 
@dig <name>. Creates a new room 
@fail <object> [=<message>]. 
@find [name]. Displays the name and number ... whose name matches <name>.
@link <object>=<number>; @link <object>=here; @link <dir>|<room>=home. 
@lock <object>=<key>. 
@name <object>=<new name> [<password>]. Changes the name of <object>. 
@ofail <object> [=<message>]. 
@open <dir>[;<other dir>]* [=<number>]. 
@osuccess <object> [=<message>]. 
@set <object>=<flag>; @set <object>=!<flag>. Sets (or, with '!', unsets) 
@success <object> [=<message>]. 
@unlink <dir>; @unlink here. 
@unlock <object>. Removes the lock on <object>. 
```

TinyMUD is important, not just because of its own popularity and the concepts it pioneered, but also because of the importance of their successors and the impact that it had on later graphical games.

#### TinyMUSH

TinyMUSH is a derivative of TinyMUD, just like DikuMUD, but with a different emphasis.

As far as I can trace, the original TinyMUSH was released in 1990 (see [The MUDline](http://www.linnaean.org/~lpb/muddex/mudline.html) for more information).

Most (if not all) the current flavor of text-based virtual realities are based on TinyMUSH to some degree.

[PennMUSH](https://www.pennmush.org/) has been around since the early 1990s. According to the PennMUSH README:

> PennMUSH is a TinyMUD derivative, and one of the branches along the MUSH line. "Vanilla" TinyMUSH, which added the "v" registers and functions to the basic TinyMUD building commands, was written by Larry Foard. The code was later expanded by Jin, of MicroMUSH. In January of 1991, MicroMUSH changed its name to MicroMUSE, and the code there continued to develop under the MUSE name. At that same point in time, Moonchilde took the last public release of that code and began a series of improvements and extensions.
>
> That code was released as PernMUSH, named for the MUSH that Moonchilde was running. The last released version of that code was version 1.15, at the end of November 1991. PernMUSH itself had switched over to TinyMUSH 2.0, which Moonchilde had co-written with Glenn Crocker (Wizard of TinyCWRU); there was no longer a reason for Moonchilde to maintain this code.
>
> In January of 1992, Amberyl began working on the PernMUSH 1.15 code release, for TinyKrynn. She took over the code, which no one was supporting, and is continuing to work on extending this code, as well as improving its compatibility with TinyMUSH 2.0.

All games running TinyMUSH and derivative servers are social, role-playing oriented environments.

For the longest time, MUSHes and the PennMUSH flavor in particular were synonymous with mudding and playing online. It wasn't until much later that I discovered other types of games, other servers and other activities you could do online.

#### MOO

MOO stands for MUD Object Oriented. It's another decendant from TinyMUD.

Unlike TinyMUSH and its derivatives, MOOs are used primarily for social and research-related projects.

##### LambdaMOO

The first MOO I want to discuss is LambdaMOO; the term refers both to the code running the game, an evolution of the original MOO code, and the community built using the LambdaMOO software.

Many early researches and research topics in online communities and online issues originated in LambdaMOO.

The LambdaMOO software was created by Pavel Curtis in 1990 at Xerox PARC.

One of the most interesting and impactful issues that happened in LambdaMOO is [Julian Dibbell's](http://www.juliandibbell.com/) [A Rape in Cyberspace](https://www.villagevoice.com/2005/10/18/a-rape-in-cyberspace/), later expanded into the book [My Tiny Life: Crime and Passion in a Virtual World](https://www.amazon.com/My-Tiny-Life-Passion-Virtual/dp/0805036261/ref=sr_1_2?crid=32UC0AXWP15C0). In the story, the author narrates the real life consequences of virtual actions and the way that these virtual actions may impact people's lives in unexpected ways.

##### MediaMOO and MOOSECrossing

MediaMOO and MOOSECrossing were too MOO-based projects created by [Amy Bruckman](https://faculty.cc.gatech.edu/~asb/) while a doctoral student at MIT's Media Lab.

[MediaMOO](https://faculty.cc.gatech.edu/~asb/papers/journal/convergence.html) wasn't just a social environment. It was targeted to media researchers and required an application to become a member.

MOOSECrossing was designed for school children to work in collboartive environments. This project was the main focus of Amy Bruckman's [PhD Dissertation](https://faculty.cc.gatech.edu/~asb/thesis/) at MIT's Media Lab.

All three of these examples show the social and educational potential of these text-based game systems.

## Graphical games and tools

There has also been a lot of work done in graphical virtual worlds that lead to the current crop of Virtual Reality (VR), Augmented Reality (AR), and Mixed Reality (MR) experiences that we see today and perhaps some experiences that we don't see today because they are proprietary experiences for specific companies or industry verticals.

### SIMNET

One of the first multiuser networked environments available was SIMNET. According to Duncan C. Miller's SIMNET and Beyond: A History of the Development of Distributed Simulation:

>SIMNET stands for SIMulator NETworking. Initiated in 1983, it was the first “shared virtual reality” distributed simulation system, which continues to have significant influences.

SIMNET pioneered the protocols necessary for a shared networked environment where the different network participants can interact with the same environment in real time, independent from their location.

In addition of the protocols, some of the researchers moved on to the gaming industry. Some of these companies founded from SIMNET research became foundational to the gaming industry as we know it. Sony Computer Entertainment Of America acquired RTIME, inc, a company founded by SIMNET researchers, and used RTIME's assets as the basis of their online gaming network.

### Lucasfilm's Habitat

<figure>
  <img src='https://res.cloudinary.com/dfh6ihzvj/images/v1582959262/publishing-project.rivendellweb.net/habitat-logo/habitat-logo.jpg?_i=AA' width='530'>
  <figcaption>Lucasfilm's Habitat</figcaption>
</figure>

[Lucasfilm Habitat](https://en.wikipedia.org/wiki/Habitat_(video_game)) was an earlier example of consumer-grade graphical virtual communities.

<figure>
  <img src='https://res.cloudinary.com/dfh6ihzvj/images/v1582959260/publishing-project.rivendellweb.net/habitat7/habitat7.jpg?_i=AA' width='580' height='height'>
  <figcaption>Example of Avatar player interaction</figcaption>
</figure>

It was created by Lucas Arts, now known as [Lucasfilm Games](https://en.wikipedia.org/wiki/Lucasfilm_Games), for [Quatum Link](https://en.wikipedia.org/wiki/Quantum_Link) an online service for [Commodore 64](https://history-computer.com/commodore-64-guide/) and [Commodore 128](https://www.c64-wiki.com/wiki/Commodore_128) (which later became [America Online](https://en.wikipedia.org/wiki/AOL)) with a first, beta, release in north America
 in 1986.

A stripped down version of Habitat was released as Club Caribe both in North America in in 1989.

The graphics are quaint by modern standards but we can't forget the hardware that the world ran in.

LucasArt licensed the game to Fujitsu who released Club Caribe in Japan in 1990.

With the limited graphical resources in the front-end and backend Habitat still demonstrated the feasibility of multiuser online games. Modern Massively Multiplayer Online (MMO) games take advantage of better hardware and the lessons that we've learned since Habitat and text-based multi user games.

### Single Player Games

We will take a slight detour into some graphical computer games that are the basis for current MMOs and we'll also see how we got from single player to MMO Role Playing Games (RPGs).

The [Ultima Game Series](https://en.wikipedia.org/wiki/Ultima_(series)) and [Ultima Online](https://en.wikipedia.org/wiki/Ultima_Online) show one progression towards MMOs

[Warcraft](https://en.wikipedia.org/wiki/Warcraft) and [World of Warcraft](https://en.wikipedia.org/wiki/World_of_Warcraft)

### Multiuser Games and LAN Parties

### MMOs

### Second Life

# What's Next: AR, VR, MR and XR

## Virtual reality is not new

### VRML and X3D

<https://en.wikipedia.org/wiki/VRML>

<https://en.wikipedia.org/wiki/X3D>

## It's the hardware, stupid, or is it?

### Oculus Rift

### Microsoft Hololens

### Google Glass: How not to do it

## WebVR: the browser gets involved

## WebXR and beyond

# The more things change... Research and researcher evolution

## How has etnographical work changed?

### Participant observation online: challenges ahead

### Ethical considerations

## Mixing the real and the virtual

### Meeting your virtual friends `IRL`

### Gender presentation and gender identity

### Transmedia storytelling

### Participatory Culture

### Game studies

# Computers as cultural artifacts

## Identity

## Gender presentation and gender dynamics

## Real impact of virtual events

# Bibliography

## Books &amp; Articles

Bartle, Richard A. Designing Virtual Worlds. New Riders, 2003.

---. [How it really happened](http://www.linnaean.org/~lpb/muddex/bartle.txt)

Burka, Lauren P. [A Hypertext History of Multi-User Dimensions](http://www.linnaean.org/~lpb/muddex/essay/), 1993.

Bugeja, Michael J. [Second Thoughts About Second Life](http://chronicle.com/article/Second-Thoughts-About-Secon/46636). 2007.

Castronova, E. Virtual Worlds: [A First-Hand Account of Market and Society on the Cyberian Frontier](http://papers.ssrn.com/sol3/papers.cfm?abstract_id=294828). Dec. 2001.

Curtis, Pavel. [Mudding: Social Phenomena in Text-Based Virtual Realities](https://www.researchgate.net/publication/2763495_MUDding_Social_Phenomena_in_Text-Based_Virtual_Realities). 1992.

Curtis, Pavel, and David A. Nichols. [MUDs Grow Up: Social Virtual Reality in the Real World](https://www.researchgate.net/publication/2812522_MUDs_Grow_Up_Social_Virtual_Reality_in_the_Real_World). 1993.

Fanderclai, Tari Lin. [Like Magic, Only Real](https://web.archive.org/web/20080111011434/http://web.nwe.ufl.edu/~tari/magic.html). Wired Women: Gender and New Realities in Cyberspace". edited by Lynn Cherny and Elizabeth Reba Weise, Seal Press, 1996.

Jones, J. G. “3D On-Line Distributed Learning Environments: An Old Concept with a New Twist.” Society for Information Technology and Teacher Education International Conference, Association for the Advancement of Computing in Education, 2004, pp. 507–12.

Ondrejka, C. R. [A Piece of Place: Modeling the Digital on the Real in Second Life](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=555883). Apr. 2004.

Bennett, S., and K. Maton. [Beyond the ‘Digital Natives’ Debate: Towards a More Nuanced Understanding of Students’ Technology Experiences.](https://www.researchgate.net/publication/229660413_Beyond_the_%27Digital_Natives%27_Debate_Towards_a_More_Nuanced_Understanding_of_Students%27_Technology_Experiences) Journal of Computer Assisted Learning, vol. 26, Aug. 2010, pp. 321–31.

Bennett, Sue, et al. [The ‘Digital Natives’ Debate: A Critical Review of the Evidence](https://www.researchgate.net/publication/200772429_The_%27Digital_Natives%27_Debate_A_Critical_Review_of_the_Evidence). British Journal of Educational Technology, vol. 39, no. 5, 2008, pp. 775–86.

Coates, Tom. [Native to a Web of Data](http://www.plasticbag.org/files/native/native_to_a_web_of_data.pdf), 2006.

English-Lueck, J. A.k,
Sabrina Valade, Sheri Swiger and Guillermo Narvaez. [Success and Survival in Silicon Valley: An Ethnography of Learning Networks](https://svcp.org/pdfs/Success_and_Survival.pdf). 2002.

Falbel, Aaron. [FRISKOLEN 70: An Ethnographically Informed Inquiry Into the Social Context of Learning](https://dspace.mit.edu/handle/1721.1/14174). MIT, 1989.

Geertz, Clifford. The Interpretation of Cultures. Basic Books, 1973.

---. [Habitat Anecdotes and Other Boastings](http://www.crockford.com/ec/anecdotes.html). 1988.

---. [Social Dimensions of Habitat’s Citizenry](http://www.crockford.com/ec/citizenry.html).” Virtual Reality: A Survey of Technology and Culture, edited by Carl Eugene Loeffler, Van Nostrand Rheinhold, 1993.

Morningstar, Chip. [How To Deconstruct Almost Anything: My Postmodern Adventure](http://www.fudco.com/chip/deconstr.html). 1993.

Morningstar, Chip, and Randall Farmer. [The Lessons of Lucasfilm’s Habitat](http://www.fudco.com/chip/lessons.html). Cyberspace: First Steps, edited by Michael Benedikt, MIT Press, 1990.

Berman, Joshua, and Amy S. Bruckman. [The Turing Game: Exploring Identity in an Online Environment](https://faculty.cc.gatech.edu/~asb/papers/journal/convergence-tg-01.pdf).” Convergence, vol. 7, no. 3, 2001, pp. 83–102.

boyd, danah. [FACETED ID/ENTITY : Managing Representation in a Digital World](https://www.danah.org/papers/Thesis.FacetedIdentity.pdf).” Massachusetts Institute of Technology, 2002.

Bruckman, Amy. [Gender Swapping on the Internet](https://faculty.cc.gatech.edu/~asb/papers/conference/gender-swapping.txt).” INET ’93, The Internet Society, 1993.

---. [Identity Workshop: Emergent Social And Psychological Phenomena In Text-Based Virtual Reality](https://faculty.cc.gatech.edu/~asb/papers/misc/identity-workshop.rtf). 1992.

---. [Studying the Amateur Artist: A Perspective on Disguising Data Collected in Human Subjects Research on the Internet](https://web.archive.org/web/20170712081919/http://www.nyu.edu/projects/nissenbaum/ethics_bru_full.html).  Ethics and Information Technology 4:3 (217-231).

Bruckman, Amy, and Carlos Jensen. [The Mystery of the Death of MediaMOO: Seven Years of Evolution of an Online Community](https://faculty.cc.gatech.edu/~asb/papers/chapters/2001052485.pdf). In Building Virtual Communities: Learning and Change in Cyberspace, edited by K Ann Renninger and Wesley Shumar, Cambridge University Press, 2002.

Bruckman, Amy, and Mitchel Resnick. [The MediaMOO Project: Constructionism and Professional Community](http://www.cc.gatech.edu/~asb/papers/convergence.html). 1995.

---. [Programming for Fun: MUDs as a Context for Collaborative Learning](https://faculty.cc.gatech.edu/~asb/papers/conference/necc94.txt). 1994.

---. [Teaching Students to Study Online Communities Ethically](https://faculty.cc.gatech.edu/~asb/papers/journal/bruckman-information-ethics06.pdf).” Journal of Information Ethics, no. Fall 2006, 2006, pp. 82–89.

Dibbell, Julian. [A Rape in Cyberspace](https://www.villagevoice.com/2005/10/18/a-rape-in-cyberspace/). 2005.

---. My Tiny Life: Crime and Passion in a Virtual World. Owl Books, 1999.

Donath, Judith. [Being Real](https://vivatropolis.com/papers/Donath/BeingReal/BeingReal.html). The Robot In The Garden: Telerobotics and Telepistemology in the Age of the Internet, edited by Ken Goldberg, MIT Press, 2000.

---. [Identity and Deception in the Virtual Community](https://vivatropolis.com/papers/Donath/IdentityDeception/IdentityDeception.html).” Communities in Cyberspace, edited by Peter Kollock and Michael Smith, Routledge, 1998.

---. [Virtually Trustworthy](https://vivatropolis.com/judith/papers/VirtuallyTrustworthy.pdf).” Science, vol. 317, no. 53–54, 2007.

---. [Inhabiting the Virtual City: The Design of Social Environments for Electronic Communities](http://smg.media.mit.edu/people/judith/Thesis/). MIT, 1997.

---. "The Social Machine: Designs for Living Online". MIT Press 2014.

American Educational Research Association. [Code of Ethics](https://www.aera.net/Portals/38/docs/About_AERA/CodeOfEthics(1).pdf). American Educational Research Association, 2011.

Association of Internet Researchers. [Ethical Decision-Making and Internet Research](https://aoir.org/reports/ethics.pdf). 2002.

---. [Ethical decision-making and Internet research 2.0: Recommendations from the AoIR ethics working committee](https://aoir.org/reports/ethics2.pdf). 2012.

---. [Internet Research: Ethical Guidelines 3.0](https://aoir.org/reports/ethics3.pdf). 2019.

Cavanagh, Allison. [Behaviour in Public? : Ethics in Online Ethnography](http://www.cybersociology.com/files/6_2_ethicsinonlineethnog.html). 1999.

Hudson, James M., et al. "[I’d Be Overwhelmed, But It’s Just One More Thing to Do: Availability and Interruption in Research Management](https://www.researchgate.net/publication/2921589_I%27d_Be_Overwhelmed_But_It%27s_Just_One_More_Thing_to_Do_Availability_and_Interruption_in_Research_Management). 2002.

Hudson, James M., and Amy Bruckman. [‘Go Away’ Participant Objections to Being Studied and the Ethics of Chatroom Research](https://faculty.cc.gatech.edu/~asb/papers/journal/hudson-bruckman-tis04.pdf). The Information Society, vol. 20, 2004, p. 127 - 139.

---. [Using Empirical Data to Reason about Internet Research Ethics](https://faculty.cc.gatech.edu/~asb/papers/conference/hudson-bruckman-ecscw05.pdf). European Conference on Computer-Supported Cooperative Work (ECSCW), 2005, pp. 287–306.

Nissenbaum, Helen. [New Research Norms For A New Medium](https://nissenbaum.tech.cornell.edu/papers/Research%20Norms%20for%20a%20New%20Mediuma.pdf). The Commodification of Information, edited by N Elkin-Koren and N W Netanel. Kluwer Academic Press, 2002. 433-457.

---. [How Computer Systems Embody Values](https://nissenbaum.tech.cornell.edu/papers/How%20Computer%20Systems%20Embody%20Values.pdf). IEEE Computer, Mar. 2001, 120, 118-119."

---. [Hackers and the Battle for Cyberspace](https://nissenbaum.tech.cornell.edu/papers/Hackers%20and%20the%20Battle%20for%20Cyberspace.pdf). Dissent, Fall 2002, 50-57.

Levy, Steven. "Hackers: Heroes of the Computer Revolution". O'Reilly 2010.

Suarez, Daniel. "Freedom (TM)" Penguin Publishing Group, 2010.

Consalvo, Mia. "Atari to Zelda: Japan's Videogames in Global Contexts". MIT Press, 2022.

Juul, Jesper. "Half-Real: Video Games between Real Rules and Fictional Worlds". MIT Press 2005.

Murray, Janet H. "Inventing the Medium: Principles of Interaction Design as a Cultural Practice". MIT Press 2012.

---. "Hamlet On the Holodeck: The Future of Narratives in Cyberspace (Updated Edition)". MIT Press 2017.

Gibson, William. "Neuromancer" Ace 1984.

---. "Idoru". Viking Press, 1996.

---. "The Peripheral". G. P. Putnam's Sons, 2014.

Keogh, Brendan. "A Play of Bodies: How We Perceive Videogames" MIT Press 2018.

Turkle, Sherry. "Life on the Screen: Identity in the Age of the Internet". Simon & Schuster, 1997.

---. "The Second Self: Computers and the Human Spirit. Twentieth Anniversary edition, including new introduction, epilogue, and notes." MIT Press, 2005.

---. "Simulation and Its Discontents (Simplicity: Design, Technology, Business, Life)". MIT Press, 2009.

---. "Reclaiming Conversation: The Power of Talk in a Digital Age". MIT Press, 2015.

---. [Empathy Machines: Forgetting the Body in Digital Culture](https://sherryturkle.mit.edu/sites/default/files/documents/ST_Empathy%20Machines.pdf).  In A Psychoanalytic Exploration of the Body in Today’s World, Vaia Tsolas and Christine Anzieu-Premmereur (eds.). Routledge, 2017.

---. [Introduction to Third Edition of Alone Together: Why We Expect More from Technology and Less from Each Other](https://sherryturkle.mit.edu/sites/default/files/images/ST_Alone%20Together_INTRO.pdf). New York: Basic Books, 2017.

---. [Always-on/Always-on-you: The Tethered Self](https://sherryturkle.mit.edu/sites/default/files/images/ST_Always%20On.pdf). In Handbook of Mobile Communication Studies, James E. Katz (ed.). MIT Press, 2008.

---. [Our Split Screens](https://sherryturkle.mit.edu/sites/default/files/images/ST_Our%20Split%20Screens.pdf). In Community in the Digital Age: Philosophy and Practice, Andrew Feenberg and Darin Barney (eds.). Rowman and Littlefield, 2004.

---. [Living the In-Between with Victor Turner’s The Ritual Process: Structure and Anti-Structure](https://sherryturkle.mit.edu/sites/default/files/documents/ST_Living%20the%20In-Between%20with%20Victor%20Turner.pdf). Social Research: An International Quarterly, Volume 89, Number 2, Summer 2022.

---. [The Tethered Self: Technology Reinvents Intimacy and Solitude](https://files.eric.ed.gov/fulltext/EJ967807.pdf). Continuing Higher Education Review, Vol. 75, Fall 2011.

---. [The Empathy Gap: Digital Culture Needs What Talk Therapy Offers](https://www.psychotherapynetworker.org/blog/details/1072/the-empathy-gap). Psychotherapy Networker, November-December 2016.  pp. 29-33, continued, 54-55.

---. [Multiple Subjectivity and Virtual Community at the End of the Freudian Century](https://sherryturkle.mit.edu/sites/default/files/images/ST_Multiple%20Subjectivity.pdf). Sociological
Inquiry, 67, 1, Winter 1997.

---. [Seeing Through Computers: Education in a Culture of Simulation](https://sherryturkle.mit.edu/sites/default/files/images/ST_Seeing%20thru%20computers.pdf). The American Prospect, no. 31, March-April 1997.

---. [Virtuality and Its Discontents](https://sherryturkle.mit.edu/sites/default/files/images/ST_Virtuality%20and%20its%20discontents.pdf). The American Prospect, no. 24, Winter 1996.

---. [Constructions and Reconstructions of Self in Virtual Reality](https://sherryturkle.mit.edu/sites/default/files/images/ST_Construc%20and%20reconstruc%20of%20self.pdf). Mind, Culture, and Activity, 1, 3, Summer 1994.

---. [Epistemological Pluralism and the Revaluation of the Concrete](https://sherryturkle.mit.edu/sites/default/files/images/ST_Epistemo%20Pluralism.pdf). In Constructionism, Idit Harel and Seymour Papert (eds.).  Norwood, NJ: Ablex Publishing Corporation, 1991.

Oldenburg, Ray. "The Great Good Place" 3rd Edition.  Marlowe & Company, 1999.

Corneliussen, Hilde G., and Jill Walker Rettberg. "Digital Culture, Play And Identity: A World of Warcraft Reader". MIT Press, 2008.

Bainbridge, William. "The Warcraft Civilization". MIT Press 2010.

Greengard, Samuel. "Virtual Reality". MIT Press, 2019.

Pearce, Celia, and Artemesia. "Communities of Play: Emerging Cultures in Multiplayer Games and Virtual Worlds". MIT Press, 2009.

Kidder, Tracy. "The Soul of a New Machine". Little, Brown and Company, 1981.

Hafner, Katie. "Where Wizards Stay Up Late: The Origins Of The Internet".  Simon & Schuster, 1998.

Wright, Jr., David C., and Allan W. Austin. "Space and Time: Essays on Vision of History in Science Fiction and Fantasy Television". McFarland & Company, 2010.

[Fandom and Participatory Culture](https://haenfler.sites.grinnell.edu/subcultural-theory-and-theorists/fandom-and-participatory-culture/). n.d.

Jenkins, Henry, Katie Clinton, Ravi Purushotma, Alice J. Robison, and Margaret Weigel. [Confronting the Challenges of Participatory Culture: Media Education for the 21st Century](https://www.macfound.org/media/article_pdfs/jenkins_white_paper.pdf). The MacArthur Foundation, 2006.

Edutopia. [Henry Jenkins on Participatory Culture: Big Thinkers](https://www.youtube.com/watch?v=1gPm-c1wRsQ). YouTube, uploaded by Edutopia, May 2013.

TEDxNYC. [Henry Jenkins](https://www.youtube.com/watch?v=AFCLKa0XRlw). YouTube, Uploaded by TEDx, April 2010.

Rheingold, Howard. [Virtual Communities: Homesteading on the Electronic Frontier](https://direct.mit.edu/books/book/2147/The-Virtual-CommunityHomesteading-on-the). Addison-Wesley, 1993.

Chiapello, Laureline. [Ludo Mix as an Aesthetic Experience: Designing Games for Franchises](http://www.digra.org/wp-content/uploads/digital-library/DiGRA_2019_paper_43.pdf). Proceedings of DiGRA 2019, 2019.

Nakamura, Akinori and Susana Tosca. [The Mobile Suit Gundam Franchise: A Case Study of Transmedia Storytelling Practices and Ludo Mix in Japan](https://doi.org/10.26503/todigra.v5i2.114). Transactions of the Digital Games Research Association Vol 5, No 2 (2021).

Kendall, Lori. [Hanging Out in the Virtual Pub:
Masculinities and Relationships Online](https://publishing.cdlib.org/ucpressebooks/view?docId=kt367nc6m1;brand=ucpress). University of California Press, 2002.

Evans, Claire L. [A Mansion Filled With Hidden Worlds: When the Internet Was Young](https://undark.org/article/wilo-evans-broad-band/). Undark Magazine, 2018.

Cassel, David. [A Look Back in Time: The Forgotten Fame of LambdaMOO](https://thenewstack.io/a-look-back-in-time-the-forgotten-fame-of-lambdamoo/). The New Stack, 2018.

Miller, Duncan C. [SIMNET and Beyond: A History of the Development of Distributed Simulation](https://www.iitsec.org/-/media/sites/iitsec/link-attachments/iitsec-fellows/2015_fellowpaper_miller.ashx). ITSC Fellows Paper, 2015.

Sterling, Bruce. [War Is Virtual Hell](https://www.wired.com/1993/01/virthell/). Wired Magazine 1.01, 1993.

Lenoir, Tim and Henry Lowood. [Theaters of War: The military-entertainment Complex](https://web.stanford.edu/dept/HPST/TimLenoir/Publications/Lenoir-Lowood_TheatersOfWar.pdf). Berlin. Walter de Gruyter Publishers, 2003.

## Games and Game Engines

* [Colosal Cave Adventure](https://en.wikipedia.org/wiki/Colossal_Cave_Adventure)
* [Zork](https://en.wikipedia.org/wiki/Zork)
* [TinyMUD](https://mud.fandom.com/wiki/TinyMUD)
* [TinyMUSH](https://en.wikipedia.org/wiki/MUSH)
* [DikuMud](https://en.wikipedia.org/wiki/DikuMUD)
* [Everquest](https://www.everquest.com/home)
* [Warcraft](https://en.wikipedia.org/wiki/Warcraft)
* World of Warcraft
  * [Website](https://worldofwarcraft.com/en-us/)
  * [Wikipedia](https://en.wikipedia.org/wiki/World_of_Warcraft)
* Star Citizen
  * [Website](https://robertsspaceindustries.com/star-citizen/)
  * [Wikipedia](https://en.wikipedia.org/wiki/Star_Citizen)
* Even Online
  * [Website](https://www.eveonline.com/)
  * [Wikipedia](https://en.wikipedia.org/wiki/Eve_Online)
