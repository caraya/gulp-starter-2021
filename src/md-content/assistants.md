# Assistants, and Conversational UI/UX

As an undergraduate I did fairly extensive work in early text-based virtual communities, particularly the way in which people interacted and communicated in text-based virtual realities. The research may color my vision of Duplex and other technologies that make it harder for people to know who they are speaking with.

This makes the argument that we have the "right" to know that we're speaking to a 'bot harder to accept for me. Unless you know the person you're speaking with how can you really tell who are you communicating with? How do you know that the knowledge they claim is factually correct, and that they even posses it to begin with?

## The issue, as I see it

I think that the problem began with the Duplex Demo at Google I/O this year. It wasn't a commplete app demo and it was a very limited show of what both the assistant and a new technology called Duplex.

<div class="video">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/P0P0GcwQqMQ?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
</div>

People jumped the gun and started acussing Google, and Amazon before them, to be trying to create machines that fool humans or that not enough care has been put into the ethics and morals of such interactions.

### Enhancements to Google Assistant

Google assistant for Android and, in a much more limited capacity, iOS will be enhanced with interesting features:

<dl>
  <dt><strong>New voices</strong></dt>
  <dd>Google's <a href="https://cloud.google.com/text-to-speech/docs/wavenet">Wavenet</a> technology is bringing improvements to computer voices in general and the Assistant voices in particular, creating system voices that sound more natural and human-like than before. Assistant has added six new voices using this technology.</dd>
  <dd>Also as part of Wavenet, <a href="https://www.johnlegend.com/">John Legend's</a> voice will be coming for some context using Assistant later this year.</dd>

  <dt><strong>Continued Conversation</strong></dt>
  <dd>You no longer have to trigger Assistant with hotwords like 'Hey Google' and 'OK Google' before every sentence, allowing you to have a more natural conversation. Assistant will be able to distinguish between when you are talking to it or to another person.</dd>

  <dt><strong>Multiple Actions</strong></dt>
  <dd>Multiple Actions allows Google's Assistant to perform simultaneous actions in the same voice command, using coordination reduction to figure out exactly what the user means even with longer commands.</dd>

  <dt><strong>Pretty Please</strong></dt>
  <dd>Google Assistant is adding skills that compliment and provide positive reinforcement to users (especially kids) when they converse with the Assistant using polite words like Please and Thank You.</dd>
</dl>

I think it's the first point that makes people nervous when it comes to the Assistant. If the voices on your devices become harder to distinguish from a human causes or if we can have longer conversaations where the agent/assistant can interpret what we're saying without us having to take specific actions, it all leads to aprehension and fear.

An aspect of this "fear the intelligent machine" is that, in giving agency and independent action capabilities to a piece of software, we take away that agency from ourselves&hellip; We don't make reservations ourselves, we let the machine make them for us&hellip; What will we give up next?

But it pays to remember that the assistant will not do anything on its own. Even if you somehow used the assistant to perform a highly controversial action, there was still human agency in the action, there was no self-directed AI that actually pulled the trigger.

That's where the real concerns should be&hellip; How do we ensure human control over the actions of our AI agents?

### Duplex

As described in the blog post anouncing the technology: [Google Duplex: An AI System for Accomplishing Real-World Tasks Over the Phone](https://ai.googleblog.com/2018/05/duplex-ai-system-for-natural-conversation.html):

>  The technology is directed towards completing specific tasks, such as scheduling certain types of appointments. For such tasks, the system makes the conversational experience as natural as possible, allowing people to speak normally, like they would to another person, without having to adapt to a machine.
>
> One of the key research insights was to constrain Duplex to closed domains, which are narrow enough to explore extensively. Duplex can only carry out natural conversations after being deeply trained in such domains. It cannot carry out general conversations.

So we see in these paragraph describing the technology we can see a few things:

* It's task specific and trained on specific domains
* It is not an open ended conversational agent. It won't initiate communication on its own
* Using a more human voice makes it easier to interact without having to face the notion you're dealing with a machine, and potential rejection that talking to a machine may cause

Further down the article there is a statement that I find interesting and that prompts a series of questions:

> The system has a self-monitoring capability, which allows it to recognize the tasks it cannot complete autonomously (like scheduling an unusually complex appointment). In these cases, it signals to a human operator, who can complete the task.

* Are these operators always available when Duplex is making a call?
* Are these operators similar to the drivers in a "self-driving" car?
* How do hand-offs to a human operator happen? How does the machine evaluate a call as 'unusually complex'?
* How has the human at the other end of the conversation reacted when Duplex handed the call to a human? Did the call complete as expected?

It is also important to remember that, like Assistant, Duplex can only be triggered by human interaction. You tell Assistant that you want to make a reservation and Assistant uses Duplex to make the reservation, it won't happen without a human in the loop to initiate the AI action.

## Ethical And Moral Considerations

As much as I'm for technology like Google Assistant and Duplex, there's a lot to be worried about, but I also think that right now we're worried about the wrong things and we're only considering potential wrongs that the technologies may have.

DeepMind created a research group around Ethics & Society. One area of research for this group is **_Privacy, transparency and fairness_**. I think this is where the biggest short-term value for both AI researchers and for the communities that they seek to serve. If we can show that the AI agents, both monitored and autonomous, can treat privacy and transparency in the same way humans can it'll go a long way in calming some of the fears people have. It won't settle them completely as people say they want to talk to 'real people' and 'not to a machine'.

Another research area that I find intriguing is **_AI morality and values_**. I find it interesting because it asks one of the questions that I've always had about technology, not just AI: How can we program morals and ethics into a system when we, or the people who will actually control the AI, may not share or have those morals or have a different ethical viewpoint than we do? As our machines become smarter than we are, better networked than we are and achieve global reach, there will be a conmensurately larger need for machines that can interpret and act upon our values (whatever they may be). Perhaps the most important question is what will happen when AIs with different morals, programmed by people with different moral, religious and ethical backgrounds enter into conflict with each other? With humans?

Will we have unleashed one or more Skynets?

Ethics and morals are hard to regulate and impossible to program. While it's true that we can agree on some basic standards it's also true that enven those agreed upon standards are not universal.

Furthermore, whose morals, ethics, and biases should we feed into our AI tools? Are these the same for autonomous AI? What happens if the ethical subroutines in the machine are different than mine?

An interesting example of programming morals are Asimov's [three laws of Robotics](https://www.wikiwand.com/en/Three_Laws_of_Robotics), first appeared in [Runaround](https://www.wikiwand.com/en/Runaround_(story)) (March, 1942 issue of [Astounding Stories of Super-Science](https://www.wikiwand.com/en/Analog_Science_Fiction_and_Fact)). The three laws are:

1. A robot may not injure a human being or, through inaction, allow a human being to come to harm
2. A robot must obey the orders given it by human beings except where such orders would conflict with the First Law
3. A robot must protect its own existence as long as such protection does not conflict with the First or Second Laws

This is as close as we've managed to get to codifying the behavior or autonomous robots and artificial intelligence; but it's also interesting to see that in many of Asimov's stories, Robots circumvent the laws in one form or another because of its own actions or those of a human involved.

How bulletproof will the morals we that we're allowed to input in our AI agents?

<div class="video">
  <iframe src="https://embed.ted.com/talks/zeynep_tufekci_machine_intelligence_makes_human_morals_more_important" frameborder="0" scrolling="no" allowfullscreen></iframe>
</div>

Deception is not exclusive to machines. In [Identity and Deception in the Virtual Community](https://www.researchgate.net/publication/2512169_Identity_and_Deception_in_the_Virtual_Community), and [Being Real](http://smg.media.mit.edu/papers/BeingReal/BeingReal.html), Judit Donath discusses identity and deception in the early virtual communities of the 1990s. Donath ponts out that:

>“One can have...?” Who is this “one”? It is, of course, the embodied self, the body that is synonymous with identity, the body at the keyboard. The two worlds are not truly disjoint, but their relationship is murky and intricate. A single person can create multiple electronic identities, their only link their common progenitor, a link which is invisible in the virtual world. A man can create a female identity; a high-school student can claim to be an expert in virology. If the two worlds were truly unconnected, the result might be simply a wholly independent society, wherein a virtual identity would be taken on its own terms. Yet this is not the case. Other explorers in virtual space, males in the real world, develop relationships with the ostensible female, and are shocked to discover her “actual” gender. The virtual virologist’s pronouncements on AIDS breakthroughs and treatments are assumed to be backed by real-world knowledge. Do virtual personas inherit the qualities – and responsibilities – of their creators?
>
> From: Identity and Deception in the Virtual Community

AI doesn't make the issue necessarily worse, some people have decided that it's far worse when a machine does the deception upon human instructions and when we can't tell the difference between human and machine. Is it just a difference of degrees that makes us doubt the machine anymore than the person who sent us the spear phishing email to try to compromise the bussiness we work for?

In the late 1990s and early 2000 scientists and people worried that we were becoming to familar with techonlogy to the point where we've started losing the ability to communicate with other humans but I wonder if this being a problem is actually a generational issue.

This is not to say we should be complacent either. The fact that we're getting comfortable with the technology doesn't mean we should become lax in enforcing and understanding a common set of best practices for interacting with AI and how AI behaves when interacting with us.

Kate Crawford presented an interesting lecture at the University of Washington's [Tech Policy Lab](http://techpolicylab.org/) on the social and political implications of AI.

<div class="video">
<iframe width="560" height="315" src="https://www.youtube.com/embed/a2IT7gWBfaE?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
</div>

We have to ask ourselves if we're bringing our biases into AI and machine learning. I don't think is possible to take our biases into the AI world? Why is it that, as Crawford, most biases in AI are reflections of systemic biases present in our culture since before the last wave of AI came into the popular conciousness?

## Who would benefit the most?

So far I've also fallen on the trap of just talking about the negative potential of AI and conversational agents.

The first group that comes to mind is those who rely on computer assisted speech for day-to-day interactions.

Another group that would benefit from having a conversational agent are people who suffer from social anxiety disorders or who, like the hikikomori in Japan, choose to have little vor no contact with the outside world.

How do we reconcile the needs of groups like this with our desire for privacy and the need we all have to communicate?

Do the good aspects overwhelm the bad? How do we use machine learning, deep learning and other AI applications to ameliorate the underlying systemic biases that caused the technological biases we are becoming aware of?

## Conclusion: Bringing It All Together

AI is an interesting and dangerous topic. I think, for the purpose of this final discussion, we can group it in two areas: Human/AI interaction and fully autonomous AI.

Human/AI interaction is the most recent and, apparently, the most controversial. We're afraid that the machine will "trick" us when talking to us rather than see the conversation as a mutually beneficial exchange it is.

There are at least three issues that we need to address when talking about human/AI interaction:

* How do we set ethical, moral, and legal boundaries for AI?
* How do you build trust from humans towards AI?
* As conversational UI and AI developers, how do we address users' concerns?

<div class="video">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/mkIyaUeoUMg?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
</div>

Autonomous AI presents a different set of challenges that are a larger degree of biases both cultural and against AI. Autonomous, self suficient AI, is too wide a topic to include here, but it's important to keep in mind.

How we deal with these issues and build commfort with the technologies will have huge implications for society and the individual.

## Links and Resources

* News (right after the anouncement/demo)
  * [The most exciting thing at Google IO 2018 was also the most practical](https://www.techradar.com/news/the-most-exciting-thing-at-google-io-2018-was-also-the-most-practical)
  * [It’s Google’s turn to ask the questions](https://qz.com/1275036/its-googles-turn-to-ask-the-questions/)
  * [Google Duplex Will Identify Itself as an AI](https://www.makeuseof.com/tag/google-duplex-identify-itself-ai/)
  * [Google's Duplex represents a departure from all-female secretarial AI voices](http://www.abc.net.au/news/2018-05-13/duplex-google-female-voice-ai/9751700)
  * [Google I/O 2018: Key takeaways on Duplex, AI, privacy, Android](https://www.zdnet.com/article/google-io-2018-key-takeaways-on-duplex-ai-privacy-android/)
  * [Could Google’s creepy new AI push us to a tipping point](https://www.washingtonpost.com/blogs/post-partisan/wp/2018/05/10/could-googles-creepy-new-ai-push-us-to-a-tipping-point/)
  * [Service Workers Forced to Act Like Robots Meet Their Match](https://www.theatlantic.com/technology/archive/2018/05/humans-acting-like-robots-vs-robots-acting-like-humans/559955/)
  * [Google Duplex should introduce itself as a robot: AI expert](https://www.cio.com.au/article/641077/google-duplex-should-introduce-itself-robot-ai-expert/)
  * [Data Sheet—Even As Google's AI Blows Your Mind, Think Critically About Reining It In](http://fortune.com/2018/05/10/data-sheet-google-duplex-ai-regulation/)
  * [Google's AI demo at this year’s I/O has sparked a huge row about ethics](http://www.businessinsider.com/googles-ai-demo-sparks-a-new-ethics-debate-2018-5)
* Google Duplex
  * [Google Duplex: An AI System for Accomplishing Real-World Tasks Over the Phone](https://ai.googleblog.com/2018/05/duplex-ai-system-for-natural-conversation.html)
  * [What is Google Duplex](https://www.cnet.com/how-to/what-is-google-duplex/)
* The Turing Test/Game
  * [The Turing Test (Wikipedia)](https://www.wikiwand.com/en/Turing_test)
  * [The Turing Game: Exploring Identity in an Online Environment](https://www.cc.gatech.edu/~asb/papers/journal/convergence-tg-01.pdf)
* AI
  * [Artificial Intelligence (Wikipedia)](https://www.wikiwand.com/en/Artificial_intelligence)
  * [Google PAIR](https://ai.google/research/teams/brain/pair)
  * [We Want Chatbots to Act More Human But Let's Keep Some Human Traits to Ourselves](https://www.entrepreneur.com/article/312078)
  * [Killer robots: The soldiers that never sleep](http://www.bbc.com/future/story/20150715-killer-robots-the-soldiers-that-never-sleep)
*  [Lawrence Lessig](http://www.lessig.org/about/)
  * [The Laws of Cyberspace](https://cyber.harvard.edu/works/lessig/laws_cyberspace.pdf) (PDF)
  * [20 years of the Laws of Cyberspace](https://cyber.harvard.edu/node/100178)
  * [Code is Law: On Liberty in Cyberspace](https://harvardmagazine.com/2000/01/code-is-law-html)(http://www.lessig.org/)
* Hikikomori and Social Anxiety Disorder
  * [Hikikomori](https://www.wikiwand.com/en/Hikikomori)
  * [In Japan, there's a newspaper by people who couldn't leave their homes](https://www.pri.org/stories/2018-04-19/japan-theres-newspaper-people-who-wont-leave-their-homes)
  * [Social Anxiety Disorder Definition](https://adaa.org/understanding-anxiety/social-anxiety-disorder#)
* The People versus AI
  * [How Do You Improve Employee Comfort with AI?](https://www.technative.io/research-shows-training-key-to-improving-employee-comfort-with-artificial-intelligence/)
  * [Accenture Surprised by Users' Comfort Level With AI](https://www.multichannel.com/news/accenture-surprised-users-comfort-level-ai-410117)
  * [AI Now Institute](https://ainowinstitute.org/)
* Telepresence and Telepistemology
  * E. M. Forster
    * [The Machine Stops](https://en.wikisource.org/wiki/The_Machine_Stops)
  * Ken Goldberg
    * [The Robot in the Garden: Telerobotics and Telepistemology in the Age of the Internet](https://mitpress.mit.edu/books/robot-garden)
  * Judith Donath
    * [Identity and Deception in the Virtual Community](https://www.researchgate.net/publication/2512169_Identity_and_Deception_in_the_Virtual_Community)
    * [Being Real](http://smg.media.mit.edu/papers/BeingReal/BeingReal.html)
  * Sherry Turkle
    * [The Second Self: Computers and the Human Spirit (Twentieth Anniversary Edition)](https://mitpress.mit.edu/books/second-self-twentieth-anniversary-edition)
    * [Life on the Screen: Identity in the Age of the Internet](https://www.amazon.com/Life-Screen-Identity-Age-Internet/dp/0684833484/)
    * [Alone Together: Why We Expect More from Technology and Less from Each Other](https://www.amazon.com/Alone-Together-Expect-Technology-Other/dp/0465093655/)
* Gender Bending on The Internet
  * [I'm A Man Who Plays As A Woman In Games, And I'm Definitely Not Alone](https://kotaku.com/im-a-man-who-plays-as-a-woman-in-games-and-im-definite-1576592743)
  * [Japan’s gender-bending history](http://theconversation.com/japans-gender-bending-history-71545)
  * [Gender Differences in CMC: Findings and Implications](http://stelar.edc.org/sites/stelar.edc.org/files/CPSR%20-%20document_view_2.pdf)
  * [Who Gender-Bends and Why? A Qualitative Study of World of Warcraf](https://pdxscholar.library.pdx.edu/cgi/viewcontent.cgi?article=1420&context=open_access_etds)
  * [BENDING GENDER INTO THE NET Feminizing Content, Corporate Interests, and Research Strategy](http://courses.ischool.utexas.edu/Doty_Philip/2006/spring/Hart_Doty-GRS390J/BendingGenderIntoTheNet.pdf)
  * [Guys who play female characters, just why?](https://us.battle.net/forums/en/wow/topic/7415796353)
* Conversational UI/UX
  * [Actions on Google](https://developers.google.com/actions/)
  * [Actions on Google - Design](https://developers.google.com/actions/design/)
  * [Conversational Design](https://abookapart.com/products/conversational-design) - Erika Hall
  * [The Rise Of Intelligent Conversational UI](https://www.smashingmagazine.com/2018/04/rise-intelligent-conversational-ui/)
  * [Conversational Design Essentials: Tips For Building A Chatbot](https://www.smashingmagazine.com/2016/12/conversational-design-essentials-tips-for-building-a-chatbot/)
  * [Conversational Design](http://alistapart.com/article/conversational-design)
  * [The Technical and Social Challenges of Conversational Design](https://blog.marvelapp.com/technical-social-challenges-conversational-design/)
  * [7 Principles of Conversational Design](https://medium.com/@LinusEkenstam/principles-of-conversational-design-c4778e620201)
  * [Technical and social challenges of conversational design](https://uxdesign.cc/my-website-is-now-conversational-here-is-what-i-learned-7e943cc6ace0)
  * [What is Conversation Design, and How to Design Your Chatbot](https://medium.com/swlh/what-is-conversation-design-and-how-to-design-your-chatbot-3754f04ab1e7)
  * [Design is a conversation](https://blog.intercom.com/designing-conversational-interfaces/)
  * Design Considerations for Conversational UX
    * [Part 1](https://medium.com/google-design/design-considerations-for-conversational-ux-7de9d8bc761c)
