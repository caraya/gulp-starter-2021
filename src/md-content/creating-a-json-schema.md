# Creating a JSON schema

[JSON Schemas](https://json-schema.org/) allows us to create a schema for the data. This would allow us to validate the data and ensure that it is complete and has the correct structure. This would also adress one of the drawbacks of noSQL and, potentially, XML databases: ***how to ensure that the data is complete***, meaning that all records contain the same data.

We'll build a schema for an interview-like content for a JSON document that we'll later convert to XML.

## The content for the interview object

This is a complete JSON document that matches the schema. I cheated a little with the document as I created it alongside the schema.

It is predicated on ideas about the content and how I want to manipulate it. These ideas will be discussed in detail when we talk about the schema.

```json
{
  "id": "group-interview-001",
  "title": "First Group Interview",
  "type": "interview-group",
  "date": "2022-03-27",
  "location": "Office",
  "interviewer": [
    {
      "name": "Batman",
      "email": "bm@gothamn.com"
    }
  ],
  "interviewee": [
    {
      "name": "Scarecrow",
      "email": "drCrane@arkham.com"
    }
  ],
  "audio": {
    "format": "mp3",
    "url": "https://example.com/audio/clip001.mp3",
    "duration": 45,
    "duration_unit": "minutes"
  },
  "transcript": {
    "url": "https://example.com/transcripts/clip001.html",
    "content": "the textual content of the transcript"
  }
}
```

## First Pass: Getting the basics down

With a working document ready to go, we'll look at the first version of the schema and discuss some of the decisions about them.

The first block defines metadata for the schema. This is nont visible to the user and not essential for the schema to work but it helps developers looking at the schema to better understand what it is and how it works.

the `$schema` property defines the version of the JSON schema specification that the document conforms to. Different drafts/versions of the specification change how some elements are defined and how they are validated so it's important to keep this value up and, if necessary, update it when new versions introduce breaking changes.

```json
{
  "title": "JSON schema for interviews",
  "description": "JSON schema for interview project",
  "$schema": "https://json-schema.org/draft/2020-12/schema",
```

Following the metadata, the schema defines the structure of the document. The `type` property defines the type of the document, a JSON object.

It then starts to define the properties of the document, these is the content of conforming documents.

The `$schema` property in this context can be used to reference this schema in conformant documents.

`id` and `title` are simple properties that are strings. Validation will fail otherwise.

```json
  "type": "object",
  "properties": {
    "$schema": {
      "type": "string"
    },
    "id": {
      "type": "string",
      "description": "Unique identifier for the interview"
    },
    "title": {
      "type": "string",
      "description": "Title of the interview"
    },
```

The `type` property, in this context, indicates the type of interview the object represents. Rather than let everyone entering data for a given interview, we set up an enumeration of the types of interviews that we want to support. We also set a default value in case we forget to enter it.

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

`date` holds a string representation of the date the interview was held, in the format `yyyy-mm-dd`.

`location` is where the interview took place as a string

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

`interviewer` and `interviewee` are arrays of objects, each represeting a person conducting the interview (`interviewer`) or a person who was interviewed (`interviewee`).

Both of these properties define lower (`minItems`) and upper (`maxItems`) limits on the number of items in the array.

Both of these properties use a `$ref` keyword to reference to an object defined elsewhere in the schema via a `$defs` object.

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

We use `audio` to hold information about the audio recording of the interview.

The `type` property defines the media format for the interview file.

The `url` defines the location of the file using a URL.

We use `duration` and `duration_unit` to define the length of the audio recording.

Rather than use a string to define the duration we build it from the two properties. This will make it easier to create queries asking for interviews of a certain duration.

If we use an `audio` object then all the properties are required.

```json
    "audio": {
      "type": "object",
      "properties": {
        "format": {
          "type": "string",
          "description": "Format (mp3, aac, flac, etc) of the audio"
        },
        "url": {
          "type": "string",
          "description": "URL of the audio file"
        },
        "duration": {
          "type": "number",
          "description": "Duration of the audio file"
        },
        "duration_unit": {
          "type": "string",
          "description": "the unit for duration"
        }
      },
      "required": [
        "format",
        "url",
        "duration",
        "duration_unit"
      ]
    },
```

The transcript object holds information about the transcript produced by running the audio file through a speech-to-text engine and then reviewed by the interviewers.

It has two properties: `url` holds the URL location for the transcript and `content` holds the complete text of the transcribed audio.

If we use a transcript object then both its properties are required.

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
```

The `$defs` object hold definitions that are common to more than one object in the schema. The inteview schema defines a `person` object for both the `interviewer` and   `interviewee` arrays.

The `name` property is required.

```json
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

I've validated the schema below using the [JSON Schema Validator](https://www.jsonschemavalidator.net/) using the document instance discussed in ***The content for the interview object***.

## Refining the schema

After creating the first version of the schema, I realized that there are some additional changes that would be nice to have.

The first one is to make the schema more flexible. Right now it only allows audio interviews, there is no way to record in-person or video interviews.

I'm also wondering if it's worth it to add a project property to the schema. This would allow us to associate the interview with a project and later on we can use the property to filter the list of interviews by the project they were conducted for.

### Rename the audio element

The `audio` property works wonderfully for recording data about audio files.

However, it's not very flexible. It's not clear how to add a new records for in-person and video recorded interviews.

I think a better idea would be to rename to `media` and specify more generic properties for the media object. An initial version of the media object may look like this:

The object now has a `kind` property to indicate the type of media. I chose `kind` so we don't overload the meaning of `type`.

The possible values for `kind` are:

* `audio` (default) represents an audio recording
* `video` represents a video recording
* `n/a` represents the lack of a recording, possibly because it's an in-person interview, the recording was removed from the project or is not available for other reasons

We added `kind` to the list of required field for media objects.

```json
"media": {
  "type": "object",
  "properties": {
    "kind": {
      "type": "string",
      "default": "audio",
      "enum": [
        "audio",
        "video",
        "n/a"
      ]
    },
    "format": {
      "type": "string"
    },
    "url": {
      "type": "string"
    },
    "duration": {
      "type": "number"
    },
    "duration_unit": {
      "type": "string"
    }
  },
  "required": [
    "kind",
    "format",
    "url",
    "duration",
    "duration_unit"
  ]
}
```

I moved the definition of the media object under `$defs` to make it reusable in other contexts.

### Adding new properties

There are a few things that I want to change to the schema or add to the schema.

The first thing to do is to change the root of the schema from `properties` to `interview`. Otherwise validators will not validate the objects against the schema which defeats the purpose.

The next item is to add a `project` attribute as a string representing the project we conducted the interview for. This will enable us to filter interviews by project.

I also added an `apiVersion` attribute to the schema to indicate the version of the schema the document conforms to

## The final product

This is the current version of the `interview` schema.

```json
{
  "title": "JSON schema for interviews",
  "description": "JSON schema for interviews",
  "apiVersion": 2,
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "interview": {
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
    "project": {
      "type": "string",
      "description": "Project that the interview belongs to"
    },
    "kind": {
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
    "date": {
      "type": "string",
      "description": "Date of the interview",
      "format": "date"
    },
    "location": {
      "type": "string",
      "description": "Location of the interview"
    },
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
    "media": {
      "items": {
        "$ref": "#/$defs/media"
      }
    },
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
      ],
      "required": [
        "title",
        "project",
        "type",
        "date",
        "location",
        "media",
        "transcript"
      ]
    }
  },
  "$defs": {
    "person": {
      "title": "JSON schema for a person",
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
    },
    "media": {
      "type": "object",
      "title": "JSON schema for a media file and references",
      "description": "Record of the media used for interview",
      "properties": {
        "kind": {
          "type": "string",
          "description": "Kind of media used for the interview.\n\nThe \"n\\a\" value is used for interviews that were not recorded and where a paper transcript may exist that needs to be manually added.",
          "default": "audio",
          "enum": [
            "audio",
            "video",
            "n/a"
          ]
        },
        "format": {
          "type": "string",
          "description": "Format of the media recorded for interview (where applicable)"
        },
        "url": {
          "type": "string",
          "description": "URL of the media file (where applicable)"
        },
        "duration": {
          "type": "number",
          "description": "Duration of the media file"
        },
        "duration_unit": {
          "type": "string",
          "desscription": "the unit for duration"
        }
      },
      "required": [
        "kind",
        "format",
        "url",
        "duration",
        "duration_unit"
      ]
    }
  }
}
```

## Links and Resources

* Information Repository
  * [JSON Schema](https://json-schema.org/)
* Specifications
  * [JSON Schema Core](https://json-schema.org/draft/2020-12/json-schema-core.html)
  * [JSON Schema Validation](https://json-schema.org/draft/2020-12/json-schema-validation.html)
  * [Relative JSON Pointers](https://json-schema.org/draft/2020-12/relative-json-pointer.html)
* Tools
  * Online [JSON Schema Validator](https://www.jsonschemavalidator.net/)
