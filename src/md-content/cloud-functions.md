# Cloud Functions: Server-free services

The name itself is a misnomer... cloud functions are not really serverless, they just remove the need for you to manage the server, most cloud function providers tie up with a large-scale cloud infrastructure vendor or hosting companies.

In this video Chris Coyier (CSS Tricks) and David Wells (Netlify) try to answer the question "what is serverless" in an understandable way.

<div class="video">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/2N_sUmpjzZk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

This article seeks to explore five platforms and their capabilities: [Netlify Functions](https://www.netlify.com/products/functions/), [Google Cloud Functions](https://cloud.google.com/functions/), [Cloud Functions For Firebase](https://firebase.google.com/products/functions), [AWS Lambda](https://aws.amazon.com/lambda/) and [IBM Cloud Functions](https://cloud.ibm.com/functions/). Where possible I've asked for help from their developer advocates and where it's not possible I've consulted their documentation.

## The use case

The function that I want to create is written in Javascript and will convert a Markdown file to HTML and insert it into an HTML template.

The idea is to use this or something similar to run the Markdown conversion.

```js
import { Remarkable } from 'remarkable';
import youtube from remarkable-youtube;

// Actual default values
const md = new Remarkable({
  .use(youtube, {
    className: 'youtube-iframe lazy'
  });
});
```

Another important piece oof this research is how to trigger the cloud function. I'm concerned that we need to host the static assets in the same host that runs the cloud functions.

In the end I'm seeking to understand how cloud functions work and what are the best usecases to work with them.

<!-- ## Google Cloud

> Google Cloud Functions is a serverless execution environment for building and connecting cloud services. With Cloud Functions you write simple, single-purpose functions that are attached to events emitted from your cloud infrastructure and services. Your Cloud Function is triggered when an event being watched is fired. Your code executes in a fully managed environment. There is no need to provision any infrastructure or worry about managing any servers.
>
> [Google Cloud Functions Tutorial : What is Google Cloud Functions?](https://medium.com/@iromin/google-cloud-functions-tutorial-what-is-google-cloud-functions-8796fa07fc7a)

<figure>
  <img src="https://cdn-images-1.medium.com/max/1600/1*8o0BB_niyPsgKR3J-I0Yfw.png">
  <figcaption>How Google Cloud Functions work. Reference: <a href="https://cloud.google.com/images/products/functions/how-it-works.svg">https://cloud.google.com/images/products/functions/how-it-works.svg<a></figcaption>
</figure>

### What do I need

To run cloud functions on GCP you need the following components on your development system.

* A GCP account and a project to work with
* [Google Cloud SDK](https://cloud.google.com/nodejs/docs/setup) installed on your system
* Node.js installed

The idea of working with Node.js cloud functions in GCP is that you create the function locally and then deploy it to GCP. You can reference it with a URL or automatically when a preset event happens.

The following code will log information to console about a file once it's uploaded to a Google Clooud Storage bucket.

```js
exports.helloGCSGeneric = (data, context) => {
  const file = data;
  console.log(`Event ${context.eventId}`);
  console.log(`Event Type:
    ${context.eventType}`);
  console.log(`Bucket: ${file.bucket}`);
  console.log(`File: ${file.name}`);
  console.log(`Metageneration:
    ${file.metageneration}`);
  console.log(`Created: ${file.timeCreated}`);
  console.log(`Updated: ${file.updated}`);
};
```

We deploy the function using the command below and specify the bucket where the events will happen and the specific event, in this case when a resource finished uploading or updating on the specified bucket.

```bash
gcloud functions deploy helloGCSGeneric \
--runtime nodejs10 \
--trigger-resource YOUR_TRIGGER_BUCKET_NAME \
--trigger-event google.storage.object.finalize
```

### The code for our function

 -->

## Firebase

Firebase is a different set of Google products that provide cloud tools and services for application development.


## IBM functions


## AWS Lambda

To create the serverless function in the AWS environment we need to install and configure AWS we need the following AWS services:

* Lambda to execute the functions
* An S3 bucket to host static assets and the HTML template
* An S3 bucket to host the converted files

See [Pandoc S3 converter](https://github.com/claudiajs/example-projects/tree/master/pandoc-s3-converter) for an example of how this would work.

## Netlify




## Conclusions

The downside is that cloud functions are tied to the backend where they are written. For example: Cloud functions written for Firebase are unlikely to work with GCP or AWS so when picking a vendor make sure that you stay
