# Autoload patterns from the pattern directory

In Gutenberg, you can create patterns of reusable code for use in your theme. You can load in the editor from those available in the WordPress pattern directory using the `patterns` top-level key.

In this example, the pattern `partner-logos` refers to the pattern at [https://wordpress.org/patterns/pattern/partner-logos](https://wordpress.org/patterns/pattern/partner-logos)

```json
{
    "version": 2,
    "patterns": [
      "short-text-surrounded-by-round-images", 
      "partner-logos"
    ]
}
```

This will make it easier to add new third party patterns to your theme without having to create them yourself.
