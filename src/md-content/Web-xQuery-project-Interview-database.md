# Web/xQuery project: Interview database

I'm starting to work with interviews. I would like to be able to get the audio transcribed to text and then store the text and the metadata about the interview in an no-sql/non-relational database that I can then query using either xQuery, NoSQL or SQL databases.

The idea:

> Create a tool to automatically transcribe interviews and other audio files into an XML database. Then use xQuery to build the metadata for the interviews.

These are preliminary notes and ideas, where possible I will try to incorporate code to validate them but it won't be perfect or possible to do everywhere. Future posts will update progress on the different parts of the project.

## Tooling and processes

There are two or three technologies that would make the project as envisioned possible:

* A noSQL or [xQuery](https://en.wikipedia.org/wiki/XQuery) database
* A storage bucket for the audio files
  * This depend on what database and speech to text technologies I choose
* A speech to text engine/technology
* A server to run the content from
  * This is also dependent on the xQuery or noSQL database we choose

### Speech to text options

| Product | Vendor | Pricing URL | Free Tier | Notes |
| --- | --- | --- | --- | --- |
|[Google speech-to-text](https://cloud.google.com/speech-to-text/) | Google | [Pricing](https://cloud.google.com/speech-to-text/pricing) | &nbsp; | &nbsp; |
| [Microsoft speech-to-text](https://www.microsoft.com/cognitive-services/en-us/speech-api) | Microsoft | [Pricing](https://azure.microsoft.com/en-us/pricing/details/cognitive-services/speech-api/) | &nbsp; | &nbsp; |
| [Amazon Transcribe](https://aws.amazon.com/transcribe/) | Amazon | [Pricing](https://aws.amazon.com/transcribe/pricing/) | &nbsp; | &nbsp; |
| [Deep Speech](https://github.com/mozilla/DeepSpeech) | Mozilla | Open Source | N/A |Released under the [Mozilla Public License 2.0](https://www.mozilla.org/en-US/MPL/2.0/)<br> <br>Also see [Use Mozilla DeepSpeech to enable speech to text in your application](https://opensource.com/article/22/1/voice-text-mozilla-deepspeech)<br> <br>Python only, doesn't appear to have a javascript or Node version or wrapper |

I realize that it won't be long before the APIs start incurring cost, but as an experiment any of the APIs would work.

### Identifying database options

The other area worth researching is whether xQuery is the right solution for this type of project. Other XML/noSQL databases are also a possibility.

| Vendor | Type | License | Notes |
| --- | --- | --- | --- |
[eXist](http://exist-db.org/) | NoSQL | Open Source|&nbsp;|
[MarkLogic](https://www.marklogic.com/) | NoSQL | Commercial|&nbsp;|
[MongoDB](https://www.mongodb.com/) | NoSQL | Varies |&nbsp;|
| [PostrgreSQL](https://www.postgresql.org/) | SQL | Open Source|&nbsp;|

Even if xQuery is the right solution, then what is the best server to work with and how do we store the data? How expensive is it to host such a development solution in the cloud (either on premise or in the vendor's cloud)?

### Creating a JSON schema for the data

[JSON Schemas](https://json-schema.org/) allows us to create a schema for JSON-based data. This ensures two things:

* Provides a way to validate the data
* Ensures data completeness and accuracy

I've validated the schema below using the [JSON Schema Validator](https://www.jsonschemavalidator.net/)

## The Schema

I've broken the schema into sections to make it easier to annotate and comment the different sections.

We first provide metadata about the schema. We give it a name,indicate what version of the JSON Schema specification we are using and specify the type for our root element.

```json
{
  "title": "JSON schema for interviews",
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
```

We then start listing the schema properties. Most of the properties will have a type (what kind of value we want the property to have) and a human-readable description.

There are exceptions that will be documented where they appear.

```json
  "properties": {
    "$schema": {
      "type": "string"
    },
    "id": {
      "type": "string",
      "description": "Unique identifier for the record"
    },
    "title": {
      "type": "string",
      "description": "Title of the interview"
    },
```

The type object deserves special mention as it deviates from our standard properties. It is meant to have one of a fixed set of values rather than a string we type in.

We set both a `default` value and an `enum` with the list of possible values.

```json
    "type": {
      "type": "string",
      "description": "Type of interview",
      "default": "interview",
      "enum": [
        "interview",
        "interview-one-on-one",
        "interview-group",
        "interview-one-on-one-video",
        "interview-group-video",
        "interview-one-on-one-audio",
        "interview-group-audio"
      ]
    },
```

`date` is a string formated as a date using the `yyyy-mm-dd` format. A valid example: `2018-11-13`

`location` is just a regular string.

```json
    "date": {
      "type": "string",
      "description": "Date of the interview",
      "format": "date"
    },
    "location": {
      "type": "string",
      "description": "Location of the interview"
    },
```

`interviewers` and `interviewees` allow between one and five people to be listed.

The definition of a person is located under `$defs`. We define it outside the schema so we can use it in multiple locations.

```json
    "interviewers": {
      "type": "array",
      "description": "Interviewer(s) of the interview",
      "minItems": 1,
      "maxItems": 5,
      "items": {
        "$ref": "#/$defs/person"
      }
    },
    "interviewees": {
      "type": "array",
      "description": "Subject(s) of the interview",
      "minItems": 1,
      "maxItems": 5,
      "items": {
        "$ref": "#/$defs/person"
      }
    },
```

Audio is a nested object that has all the components that represent an audio file on the database.
It also lists which children, if any, are required.

```json
    "audio": {
      "type": "object",
      "properties": {
        "format": {
          "type": "string",
          "description": "Format of the audio"
        },
        "url": {
          "type": "string",
          "description": "URL of the audio file"
        },
        "duration": {
          "type": "number",
          "description": "Duration of the audio file"
        }
      },
      "required": [
        "format",
        "url",
        "duration"
      ]
    },
```

Likewise, the transcript is a collection of informatin about the transcription for the interview.

In this case, both the URL and the content are required.

```json
    "transcript": {
      "type": "object",
      "properties": {
        "url": {
          "type": "string",
          "description": "URL of the transcript file"
        },
        "content": {
          "type": "string",
          "description": "Content of the transcript file"
        }
      },
      "required": [
        "url",
        "content"
      ]
    }
```

The definitions in `@defs` can be used by reference elsewhere in the document.

For this schema the only value in `@defs` is `person`, which we use in `interviewers` and `interviewees`.

```json
  },
  "$defs": {
    "person": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "description": "Name of the person"
        },
        "email": {
          "type": "string",
          "description": "Email of the person"
        }
      },
      "required": [
        "name"
      ]
    }
  }
}
```

Now we have a schema to validate our data against it. It will also help in writing against the schema using an editor like VSCode or any of the IntelliJ IDEs.
