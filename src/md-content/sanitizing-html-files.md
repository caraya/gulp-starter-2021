# Sanitizing HTML files

If you're working with third-party HTML content, whether it is generated as HTML or as Markdown that you then convert to HTML, you'll need to sanitize the content before it is rendered, otherwise you may expose your users to XSS attacks.

## In Node

## In Go

```go
package main

import (
    "fmt"
    "io"
    "os"
)

func main() {
    if len(os.Args) != 2 {
        fmt.Println("Please provide a filename")
        return
    }

    filename := os.Args[1]
    f, err := os.Open(filename)
    if err != nil {
        fmt.Printf("error opening %s: %s", filename, err)
        return
    }
    defer f.Close()

    buf := make([]byte, 8)
    if _, err := io.ReadFull(f, buf); err != nil {
        if err == io.EOF {
            err = io.ErrUnexpectedEOF
        }
    }
    io.WriteString(os.Stdout, string(buf))
    fmt.Println()
}
```
