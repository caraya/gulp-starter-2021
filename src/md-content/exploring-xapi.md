# Exploring xAPI

Choosing an LMS is already hard. Adding xAPI and CMI5 to the mix makes it even more complicated both because it's an LMS selection but also because we need to add xAPI requirements to the mix so we can have a fully SCORM/cmi5/xAPI system ready to do what we need it to.

In [3 Guiding Principles for xAPI Evangelists](https://www.learningsolutionsmag.com/articles/3-guiding-principles-for-xapi-evangelists) the authors present good examples of when to use and when not to use xAPI and its associated products and technologies.

But it forgets the basic of any technology project: **getting started**.

Sooner rather that later we'll have to factor xAPI and cmi5 into our requirements for a Learning Management System and companies will have to choose whether they want the LRS in the same system as the LMS, a separate LRS, one or more LRS implementations in the company, whether they are part of an ERP suite, and who will run it/them.

We have the LMS that uses SCORM to track courses in the LMS but only in the LMS. We have xAPI to track activities outside the LMS and we have cmi5 to convert our courses into xAPI compatible data. The remaining question is how do we make them all talk together.

So far, we have the following questions for the RFP and Implementation teams:

* What content do we have?
* Does the LMS support cmi5?
* What content do we want to track? From what sources?
* Do we need an LMS?
* Is the LMS budled with an LRS? Do we need it to be?
* Are we hosting on premise? private cloud? vendor?
* How will learners authenticate?

We'll tackle some of these questions in the following sections but before we do we should look at cmi5 and how it differs from SCORM.

When talking about SCORM and xAPI you may ocassionally hear the term _CMI 5_ thrown around. It started as a parallel attempt by the AICC (Aviation Industry Computer-Based Training Committee) to create a successor to SCORM and AICC standards in 2010.

In 2012 the AICC and ADL began working on a new specification for LMS-to-Assignable Unit (AU) communication. The new specification uses xAPI as the communication and data layer, combines the features of AICC and SCORM, and takes advantage new features on xAPI.

cmi5, conceptually, is the LMS use case for xAPI; it defines how the LMS and the content will communicate using the LRS.

ADL developed cmi5 with the following goals:

<dl>
<dt>Interoperability</dt>
<dd>A cmi5 assignable unit should work the same across all LMS systems that support the specification, just like a SCORM package. cmi5 has a similar import specification, but with cmi5 only the course structure is imported, not the actual content. This means the content can reside anywhere—behind a firewall, as an app on a mobile device, etc.</dd>
<dt>Extensibility</dt>
<dd>Unlike SCORM, the data cmi5 tracks is not limited. Since cmi5 is based on xAPI it supports extensions. You can also track binary data like videos, pictures, and audio clips. You can even share data across multiple assignable units.</dd>
<dt>Mobile Support</dt>
<dd>Here again, cmi5 benefits from xAPI: since the base communication mechanism handles mobile devices, so does cmi5.</dd>
</dl>

See [Experience API, cmi5, and Future SCORM](http://www.learningsolutionsmag.com/articles/1697/experience-api-cmi5-and-future-scorm) for additional information about cmi5, verbs defined for interoperability, features of compliant systems and use cases that show how these features and advantages work.

For a more detailed comparison for different groups, see the tables below, taken from: [SCORM vs cmi5 Comparison](http://aicc.github.io/CMI-5_Spec_Current/SCORM/).

**SCORM vs. cmi5 Comparison for L&D Professionals**

| Feature | SCORM | cmi5 | Description |
|-------- |-------|------| ------------|
| Track "anything" | No    | Yes  | SCORM is constrained to a defined set of data elements. cmi5 allows you to define your own data elements in addition to predefined elements. |
| Mobile Friendly | No    | Yes  | A mobile app cannot be tracked with SCORM, but can with cmi5. |
| Host content anywhere  | No    | Yes  | All SCORM content must reside in the LMS, cmi5 has no such restrictions (content can be located anywhere). |
| Can you get your data? | No    | Yes  | Most LMSs do not expose all of the data collected with SCORM. With cmi5, you can access all the data in standard way. You can make your own report writers. |
| Offline Friendly | No    | Yes  | SCORM requires a continuous connection to a LMS and cmi5 does not. It is therefore possible to design offline cmi5 content. |
| Extensibility | No    | Yes  | With cmi5, you can collect any data you want from your learning content. Your LMS will use an LRS to support cmi5. With an LRS you can build a learning ecosystem beyond the LMS, easily connecting to other systems. |

**SCORM vs. cmi5 Detailed Comparison**

The following is a side-by-side comparison of SCORM to cmi5 at a detailed feature level.

| Feature | SCORM | cmi5 | Description |
|---------|-------|------| ------------|
| Content Package      | Yes   | Yes  | SCORM has a package containing local content with an XML manifest that details course structure and all resources. cmi5 has an XML course structure that can reference remote or local content. Both have a ZIP file for transferring content (locally).|
| Objectives | Yes   | Yes  | SCORM has Objectives Metadata that can be used for sequencing logic (called "simple sequencing"). cmi5 has objective metadata that does not affect course behavior. |
| Remediation | Yes   | No   | With SCORM remediation can be implemented by "simple sequencing" logic rules. cmi5 has no remediation rules. Remediation is content and LMS vendor specific. |
| Prerequisites | Yes   | No   | With SCORM, prerequisites can be implemented by "simple sequencing" logic rules. cmi5 has the notion of "MoveOn" criteria for the completion of individual AU’s. |
| Content Launch | Yes   | Yes  | SCORM uses a JavaScript parent/opener with JavaScript communication object/API provided by the LMS. cmi5 uses a launch URL with parameters for Web services communication. This launch mechanism does not necessarily require a browser and content can reside on different domains/platforms. Content can be launched in a mobile app with cmi5. |
| Course Metadata | Yes   | Yes  | SCORM has a complex metadata structure, whereas cmi5 has a simpler, lightweight structure. SCORM has an IMS manifest that uses the LOM metadata specification to describe content (SCO's). cmi5 has a course structure file with defined content (AU) metadata and is extensible for content vendor-specific metadata. |
| Content Defined Data | No    | Yes  | SCORM data collection is restricted to data elements defined in the SCORM Data Model. cmi5 contains a smaller set of defined data elements than SCORM and is highly extensible through the use of xAPI. |
| Client Agnostic      | No    | Yes  | For all practical purposes, SCORM is dependent on browser delivery due to the use of JavaScript API/object for communication. cmi5 uses a RESTful web service (xAPI) and a JSON data format, neither of which rely on a browser.|
| Distributed Content  | No    | Yes  | With SCORM all content is required to be located in the package and typically stored on the same domain as the LMS. With cmi5, content does not have to be in the package and can be located on any domain/local device. |
| Data Access | No | Yes  | In SCORM, there is no standard bulk data access exposed. cmi5 uses xAPI which is designed to provide bulk access to learner data with simple filtering. |
| Data Portability | No    | Yes  | SCORM does not allow for standardized system integration. cmi5 uses xAPI which provides a standard journaling-based data format well suited for transport.|

## What content do we have?

The first step is to do a content inventory of what learning assets we have available will guide decisions on what steps to use to convert existing content and what tools to use to create new content.

It may also guide decisions on tools procurement to ensure that we can use cmi5 natively or that we can [customize the tool](https://xapiquarterly.com/2016/07/captivate-javascript-xapi-customization-best-practices-xapi/).

## Do our tools support cmi5?

The cmi5 specification is 4 years old. The first, beta, specification was released in 2015 and the next, stable, version waas released a year later. So it pays to track what vendors have implemented the specification at what level.

The cmi5 group's [cmi5 Adoption](http://aicc.github.io/CMI-5_Spec_Current/adoption/) page list current companies that have implemented cmi5 and what product they make available.

I haven't tested these tools. I list them only for reference.

* Content Authoring
  * [Articulate Storyline 360](https://articulate.com/360/storyline) &ndash; Content Authoring Tool
  * [Growth Engineering Genie](https://www.growthengineering.co.uk/genie-content-authoring-tool/) &ndash; Game-based Authoring Tool
  * [iSpring Solutions iSpring Suite](http://www.ispringsolutions.com/) &ndash; Content Authoring Tool
  * [Trivantis Lectora Publisher](https://www.trivantis.com/products/publisher-training-software) &ndash; Content Authoring Tool
  * [Trivantis CenarioVR](https://www.cenariovr.com/) &ndash; Content Authoring Tool
* LMS/LRS
  * [Epignosis Talent LMS](https://www.talentlms.com/) &ndash; LMS
  * [RISC Inc. Virtual Training Assistant™](http://risc-inc.com/) &ndash; LMS
  * [Rustici Software SCORM Engine](http://scorm.com/scorm-solved/scorm-engine/) &ndash; LMS Middleware
  * [Rustici Software SCORM Driver](http://scorm.com/scorm-solved/scorm-driver/driver-cmi5/) &ndash; Content Middleware
  * [Rustici Software SCORM Cloud](http://scorm.com/scorm-solved/scorm-cloud-features/) &ndash; LMS/LRS

I expect the list to grow quickly now that cmi5 has been in production for a few years. I also wouldn't be surprised if we start seeing more startups in this space now that we can use learning data as an enterprise asset.

### Do we need to convert SCORM content to cmi5?

For this to work we will eventually have to upgrade the content from SCORM to cmi5. There are two ways to do it, we'll discuss both approaches below.

[How to convert SCORM to xAPI or cmi5](https://rusticisoftware.com/resources/convert-scorm-to-xapi-cmi5/) from Rustici Software explains different ways to convert your content to cmi5/xAPI and what tools to use. The company created what is now xAPI, so it's not surprising that they've used their own software as examples.

### Using Third Party Tools

now that we have tools that allow authors to create cmi5 content we should explore what it would take to convert existing SCORM content to cmi5. Is it as simple as opening the content and exporting it in the new format or do we have to recreate the content in a new shell for cmi5 to work?

Another thing to consider is whether we can incorporate the migration to cmi5 into our regular content refresh. If we choose not to retire courses then we should at least bring them up to our current UI and, if needed, migrate them from SCORM to cmi5.


## What content do we want to track? From what sources?

## Do we need an LMS?

I'm old school and don't think that xAPI, on its own, will replace the need for LMSs. Most content is still created with a SCORM mindset... talk to the LMS and use the LMS as the driver of the learning experience. Adding xAPI to the content and an LRS to the learning ecosystem drastically alters the equation.


## Does the LMS support cmi5?

## Is the LMS budled with an LRS? Do we need it to be?

## Are we hosting on premise? private cloud? vendor?

## How will learners authenticate?
