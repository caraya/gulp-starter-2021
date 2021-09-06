# JSON block registration

Starting in WordPress 5.8, there is a JSON metadata file we can use to register blocks. The `block.json` file is the block-level equivalent to `theme.json` and is now the preferred way to register blocks.

The following example contains a `block.json` definition for a fictional `my-plugin/notice` block.

```json
{
    "apiVersion": 2,
    "name": "my-plugin/notice",
    "title": "Notice",
    "category": "text",
    "parent": [ "core/group" ],
    "icon": "star",
    "description": "Shows warning, error or success notices…",
    "keywords": [ "alert", "message" ],
    "version": "1.0.3",
    "textdomain": "my-plugin",
    "attributes": {
        "message": {
            "type": "string",
            "source": "html",
            "selector": ".message"
        }
    },
    "providesContext": {
        "my-plugin/message": "message"
    },
    "usesContext": [ "groupId" ],
    "supports": {
        "align": true
    },
    "styles": [
        { "name": "default", "label": "Default", "isDefault": true },
        { "name": "other", "label": "Other" }
    ],
    "example": {
        "attributes": {
            "message": "This is a notice!"
        }
    },
    "editorScript": "file:./build/index.js",
    "script": "file:./build/script.js",
    "editorStyle": "file:./build/index.css",
    "style": "file:./build/style.css"
}
```

See [Metadata](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/) in the Block Editor Handbook for more information about the file and the fields in it.
