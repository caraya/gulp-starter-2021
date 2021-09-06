# WebAssembly: A new Swiss Army Knife

[WebAssembly](https://webassembly.org/) and its predecessor asm.js provide a portable target for compilation of high-level languages like C, C++, Go, and Rust among others, enabling deployment on the web for client and server applications.

See the [Awesome WebAssembly Languages](https://github.com/appcypher/awesome-wasm-langs) for a curated list of languages that can be compiled to WASM.

It is very important to point out that WASM is not trying to replace Javascript on the web.

According to the WebAssembly FAQ:

> WebAssembly is designed to be a complement to, not replacement of, JavaScript. While WebAssembly will, over time, allow many languages to be compiled to the Web, JavaScript has an incredible amount of momentum and will remain the single, privileged (as described above) dynamic language of the Web. Furthermore, it is expected that JavaScript and WebAssembly will be used together in a number of configurations

The video below, from Google I/O 2019, explains how web developers can use WebAssembly with C/C++ and other languages.

<div class='video'>
  <iframe width="560" height="315" src="https://www.youtube.com/embed/njt-Qzw0mVY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Emscripten

Both C/C++ and Rust use the Emcscripten compiler toolchain, a drop in replacement for regular compilers in C/C++ and Windows.

The pprocess is broken in three

* Download and prepare Emscripten
  * Clone the repository
  * Change to the directory you downloaded Emscripten to
  * Update the repository if it's not the first time you're using the software
* Update and activate the code
  * Use `emsdk install` to install the latest version of the SDK
  * Run `emsdk activate` to activate the version you just installed
* Activate the installation
  * Add the `source` command to add the `emsdk` you installed. The command is `source ./emsdk_env.sh`

```bash
# Clone the repository
git clone https://github.com/emscripten-core/emsdk.git

# Enter the directory where code is installed
cd emsdk

# Update the repository if this is not the first run
git pull

# Download and install the latest SDK tools.
./emsdk install latest

# Make the "latest" SDK "active" for the current user.
# (writes ~/.emscripten file)
./emsdk activate latest

# Activate PATH and other environment variables
# in the current terminal
source ./emsdk_env.sh
```

Once we have done this we have the toolchain we'll need for C/C++ and Rust.

## C and C++

WebAssembly, and `asm.js` before it, was first created to port C and C++ code to LLVM bit code that could then be converted to Javascript.

If we take this program that will print `Hello, World` to the screen.  save it as `hello.c`.

```c
#include <stdio.h>
int main(int argc, char ** argv) {
  printf("Hello, world!\n");
}
```

To convert the `hello.c` to a WebAssembly file that will play on your web browser run the following command

```bash
emcc hello.c -s WASM=1 -o hello.html
```

For those of you familiar with the GCC compiler toolchain, the differences between traditional C/C++ compilation and our WebAssembly compilation are:

* The command is `emcc` provided by Emscripten as a replacement for GCC and Clang
* The `-s` flag passed commands to the transpiler. In this case we tell it that we want WebAssembly instead of asm.js
* the `-o hello.html` tells the compiler to create an HTML file to display the module, a Javascript file with the code to give access to the `.wasm` code and the wasm file that contains the binary Web assembly code.

The compilation will produce the following files:

```text
.
├── hello.c
├── hello.html
├── hello.js
└── hello.wasm
```

In order to test the project, start a web server and open `hello.html` in your favorite web browser. They will produce results similar to this:

<figure>
  <img src="https://publishing-project.rivendellweb.net/wp-content/uploads/2019/05/emscripten-result.png" alt="Emscripten HTML page show results of the code">
  <figcaption>Emscripten HTML page show results of the code</figcaption>
</figure>

### A more complex example

As far as examples go, Hello, World is as basic as it gets. While it's good to work out any possible kinks in the system there has to be more we can do with it.

We'll create a function that generates a [Fibonacci Sequeence](https://www.mathsisfun.com/numbers/fibonacci-sequence.html) for the number we pass as a parameter.

```c
#include <emscripten.h>

EMSCRIPTEN_KEEPALIVE
int fib(int n) {
  int i, t, a = 0, b = 1;
  for (i = 0; i < n; i++) {
    t = a + b;
    a = b;
    b = t;
  }
  return b;
}
```

The compilation is a little different too, we do heavy optimizations to the generated code and we pass `cwrap` as the value of the `EXTRA_EXPORTED_RUNTIME_METHODS` flag.

`cwrap` is one of the ways [we can call C/C++ from Javascript](https://emscripten.org/docs/porting/connecting_cpp_and_javascript/Interacting-with-code.html#calling-compiled-c-functions-from-javascript-using-ccall-cwrap)

```bash
emcc -O3 \
-s WASM=1 \
-s EXTRA_EXPORTED_RUNTIME_METHODS='["cwrap"]' \
fib.c
```

Instead of letting Emscripten generate the HTML file we take that into our own hands. The resulting files from the compilation are listed below

```text
.
├── a.out.js
├── a.out.wasm
└── fib.c
```

To display the result we need to generate our own HTML. THis is better in a way because we don't have to use the pre-built template that looks really ugly.

The important part of the HTML file is the following block. In it we do the following:

1. Load the generated Javascript file (`a.out.js`)
2. When the module is initialized we use `Module.cwrap` to call the function from the WASM file
3. Log the result to console

```html
<script src="a.out.js"></script>
<script>
  Module.onRuntimeInitialized = _ => {
    const fib = Module.cwrap('fib', 'number', ['number']);
    console.log(fib(12));
  };
</script>
```
The image below shows the result along with a warning.

<figure>
  <img src="https://publishing-project.rivendellweb.net/wp-content/uploads/2019/05/emscripten-compilations-and-warning-3.png" alt="Chrome console showing warning and the results of the code">
  <figcaption>Chrome console showing warning and the results of the code</figcaption>
</figure>

The warning happens because the web server I used (Python 3's built-in HTTP module) doesn't assign the correct mime type for the wasm module. I imagine in production this won't be a problem but during development you need to take this into account.

## Go

Go is Google's open source language that makes it easy to build simple, reliable, and efficient software.

I'm torn between taking Go or Rust as my second backend language after C++ and it's not an easy decision to make as they both have their advantages and disadvantages

That said, this is the code that we'll use to tests Go's WASM support.

```go
package main

import (
	"fmt"
)

func main() {
	fmt.Println("hello wasm")
}
```

Unlike C and Rust, support for WASM is baked into the core language runtime. To compile the code into WASM we need to run the following command.


```bash
GOOS=js GOARCH=wasm go build -o test.wasm test.go
```

The `GOOS` and `GOARCH` flags tell the compiler what we want to do, we want to compile the file using js as the operating system and wasm as the architecture. This is similar to how we'd compile Go for architectures other than the one we're working on (and, saddly, you have to compile Go for each platform you want to use it for).

In order to run the code we need to copy files from our Go root directory into our current working directory and, if desired, rename the HTML file we copied

```bash
cp "$(go env GOROOT)/misc/wasm/wasm_exec.js" .
cp "$(go env GOROOT)/misc/wasm/wasm_exec.html" .
# we rename the html file to index.html for convenience.
mv wasm_exec.html index.html
```

Go is more strict than Emscripten when it comes to mimetype. It refuses to run the wasm file because the mime type is incorrect.

## Rust

[Rust](https://www.rust-lang.org/) is a Mozilla project that seeks to create reliable and efficient software.

There are two ways to get Rust ready to go. The first one is to install `rustup`, the Rust package manager directly using the following commands

```bash
# 1. Download and install rustup
curl https://sh.rustup.rs -sSf | sh

# 2. Install the default version of Rust
rustup install stable

# 3. Make the stable version the default
rustup default stable

# 4. Add support for WASM to your Rust installation
rustup target add wasm32-unknown-emscripten
```

However, if you are on a Mac and use Homebrew, the commands are a little different. The software to install is `rustup-init` and it will present you with a series of options for installing or customizing the installation. To being, select option 1 to install the default.

```bash
# 1. Install rustup-init with homebrew
brew install rustup-init

# 2. Run rustup-init
rustup-init

# 3. Select option 1 or press enter

# 4. Add support for WASM to your target installation
rustup target add wasm32-unknown-emscripten
```

We have our Rust toolchain installed and ready to go. Next step is to set up our package.

```bash
# Create a new binary package
cargo new hello-world --bin
# Switch to the directory you just created
cd hello-world
```

The package looks like this:

```text
├── Cargo.toml
└── src
    └── main.rs
```

Inside `main.rs` we have the following code that will print `Hello World!` to the console and then exit.

```rust
fn main() {
  // Print text to the console
  println!("Hello World!");
}
```

We compile this file using the command below:

```bash
rustc --target=wasm32-unknown-emscripten src/main.rs -o hello.html
```

First surprise, the command work when invoked directly from Node but fails when run from a web browser.  I discovered that you need special configurations

We have to configure the type of library and dependencies in our `Cargo.toml` file. It now looks like this:

```toml
[package]
name = "hello-world"
version = "0.1.0"
authors = ["Carlos <carlos.araya@gmail.com>"]
edition = "2018"

[lib]
crate-type = ["cdylib"]

[dependencies]
wasm-bindgen = "0.2.44"

[dependencies.web-sys]
version = "0.3.4"
features = [
  'Document',
  'Element',
  'HtmlElement',
  'Node',
  'Window',
]
```

Next, we install `wasm-pack` as our compiler rather than using `rustc` like we did in the previous iteration.

```bash
cargo install wasm-pack
```

The final step is to use `wasm-pack` to build the package for the web

```bash
wasm-pack build --target web
```

## Conclusion

We now have WebAssembly-ready toolchains for fours languages: C, C++, Go and Rust. So what's next?

The code examples in this post barely scratch the surface of what you can do. Explore the tools, libraries and modules/packages and how they interact when used in WASM code. There is much still to learn.

Don't feel like everything you do on the web now has to be coded in C, Rust or Go and then transpiled to WebAssembly to be used on the web. Like Surma says in his presentation, use WASM to enhance what's already there.

**By the way, I got all the code working by uploading it to Github and using Github Pages to run the code from. GH Pages has already taken care of the WebAssembly mime type for me** :)

## Links

* [WebAssembly.org](https://webassembly.org/)
* [How WebAssembly is Accelerating the Future of Web Development](https://zendev.com/2018/06/26/webassembly-accelerating-future-web-development.html)
* [Awesome WebAssembly Languages](https://github.com/appcypher/awesome-wasm-langs)
* C/C++
  * [Emscripting a C library to Wasm](https://developers.google.com/web/updates/2018/03/emscripting-a-c-library)
* Go
  * [Go and WebAssembly: running Go programs in your browser](https://blog.gopheracademy.com/advent-2018/go-in-the-browser/)
  * [WebAssembly](https://github.com/golang/go/wiki/WebAssembly)
  * [Compiling Go to WebAssembly](https://www.sitepen.com/blog/compiling-go-to-webassembly/)
* Rust
  * [Why Rust and WebAssembly?](https://rustwasm.github.io/docs/book/why-rust-and-webassembly.html)
  * [Tutorial: Conway's Game of Life](https://rustwasm.github.io/docs/book/game-of-life/introduction.html)
