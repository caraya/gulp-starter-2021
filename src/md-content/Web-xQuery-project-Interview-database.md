# Web/xQuery project: Interview database

I'm starting to work with interviews. I would like to be able to get the audio transcribed to text and then store the text and the metadata about the interview in an no-sql/non-relational database that I can then query using either xQuery/NoSQL or SQL databases.

The idea:

<div class="message info">
  <p>Create a tool to automatically transcribe interviews and other audio files into an XML database. Then use xQuery to build the metadata for the interviews.</p>
</div>

These are preliminary notes and ideas, where possible I will try to incorporate code to validate them but it won't be perfect or possible to do everywhere.

## Tooling and processes

### Speech to text options

| Product | Vendor | Pricing URL | Notes |
| --- | --- | --- | --- |
[Google speech-to-text](https://cloud.google.com/speech-to-text/) | Google | [Pricing](https://cloud.google.com/speech-to-text/pricing) | |
| [Microsoft speech-to-text](https://www.microsoft.com/cognitive-services/en-us/speech-api) | Microsoft | [Pricing](https://azure.microsoft.com/en-us/pricing/details/cognitive-services/speech-api/) | |
| [Amazon Transcribe](https://aws.amazon.com/transcribe/) | Amazon | [Pricing](https://aws.amazon.com/transcribe/pricing/) | |
| [Deep Speech](https://github.com/mozilla/DeepSpeech) | Mozilla | Open Source | Released under the [Mozilla Public License 2.0](https://www.mozilla.org/en-US/MPL/2.0/)<br/> <br/>Also see [Use Mozilla DeepSpeech to enable speech to text in your application](https://opensource.com/article/22/1/voice-text-mozilla-deepspeech)<br/> <br/>Python only, doesn't appear to have a javascript or Node version or wrapper|

I realize t hat it wouldn't be long before the APIs start incurring cost, but as an experiment either one of the APIs would work.

### Identifying database options

The other area worth researching is whether xQuery is the right solution for this type of project. Other XML/noSQL databases are also a possibility.

| Vendor | Type | License | Notes |
| ------ | ---- | ------- | --- |
[eXist](http://exist-db.org/) | NoSQL | Open Source| |
[MarkLogic](https://www.marklogic.com/) | NoSQL | Commercial| |
[MongoDB](https://www.mongodb.com/) | NoSQL | Varies | |
| [PostrgreSQL](https://www.postgresql.org/) | SQL | Open Source| |

Even if xQuery is the right solution, then what is the best server to work with and how do we store the data? How expensive is it to host such a development solution in the cloud (either on premise or in the cloud)?

### Creating a JSON schema for the data

[JSON Schemas](https://json-schema.org/) allows us to create a schema for JSON-based data. This ensures two things:

* Provides a way to validate the data
* Ensures data completeness and accuracy

I've validated the schema below using the [JSON Schema Validator](https://www.jsonschemavalidator.net/)

## The Schema

```json
{
  "title": "JSON schema for interviews",
  "$schema": "https://json-schema.org/draft/2020-12/schema",
```

```json
  "type": "object",
  "properties": {
    "$schema": {
      "type": "string"
    },
    "id": {
      "type": "string",
      "description": "Unique identifier for the block"
    },
    "title": {
      "type": "string",
      "description": "Title of the interview"
    },
```

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
