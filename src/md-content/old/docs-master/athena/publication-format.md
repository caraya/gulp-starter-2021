# Publication Package Format

```javascript
[{
  "publication": {
    "metadata": {
      "title": "New Adventure of Old Holmes",
      "author": "Sherlock Holmes",
      "publisher": {
        "name": "New Caledonia Publishing",
        "location": "Mars",
        "year": 2290
      }
    },
    "content": {
      "chapters": {
        "introduction": {
          "type": "introduction",
          "name": "Introduction: The gears of my childhood",
          "location": "content/intro.html"
        },
        "1": {
          "type": "chapter",
          "title": "Chapter 1",
          "location": "content/chapter1.html"
        },
        "2": {
          "type": "chapter",
          "title": "Chapter 2",
          "location": "content/chapter2.html"
        }
      }
    }
  }
}]
```