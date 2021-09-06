# Building command line tools with Go

I like [Go](https://golang.org/) for its simplicity. I see many web applications

```go
  data, err := ioutil.ReadFile("./example.json")
  if err != nil {
    fmt.Print(err)
  }

  // parse the JSON data
``` 
