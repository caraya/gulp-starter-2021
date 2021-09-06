# Uninstalling Go on Mac

Homebrew is good but it introduces some complexity to your development, particularly if you've installed tools manually before they were available via Homebrew.

One of the really problematic tools to move to Homebrew was Go. Because it is installed as a package, removing it is not trivial and may require a lot of manual ork after the removal is complete.

Run the following command in a terminal to see if Go was installed using macOS package

```bash
pkgutil --pkgs
```

Go macOS package is presented as `com.googlecode.go` in result list. macOS package stores files in the predefined location. For Go version 1.12 these are the files to be deleted:

* file: `/etc/paths.d/go`
* folder `usr/local/go`

There is a command line to check if files are moved to different location in future Go versions:

```bash
pkgutil --only-files --files com.googlecode.go
```

Next, we need to remove the system record of Go package:

```bash
sudo pkgutil --forget com.googlecode.go
```

## Manual cleanup

We need to check for and remove the following files manually

* `/etc/paths.d/go`  is added by macOS package
* `/usr/local/go` is where macOS package keeps Go binaries and related files
* `$HOME/go` or `$GOPATH`, the Go Workspace. Be careful as this is where Go puts your code so back it up before removing it

Finally, check `$PATH` for `*/go/bin` and remove any mentions of Go from the path.
