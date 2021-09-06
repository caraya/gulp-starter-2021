# Running shell commands from Node.js

I run a lot of commands from Node.js and Gulp scripts, the most common is to spawn a new shell to run a command or an application.

Take the following snippet of a Bash script

```bash
#! /usr/bin/env bash

# Variable holding name of source image.
SOURCE_IMAGE='STSCI-H-p2022a-f-4398x3982'

# Variables holding names of encoders's binaries
IMAGE_MAGICK='convert'
WEBP_ENCODER='cwebp'
HEIC_ENCODER='heif-enc'
# DSSIM Binary
DSSIM_BINARY='dssim'

echo Starting First Encoding Test

if hash ${IMAGE_MAGICK} 2>/dev/null; then
  echo encoding to PNG
  ${IMAGE_MAGICK} ${SOURCE_IMAGE}.tif -quality 80 ${SOURCE_IMAGE}.png
  echo encoding to JPG
  ${IMAGE_MAGICK} ${SOURCE_IMAGE}.tif -quality 80 ${SOURCE_IMAGE}.jpg
else
  echo cannot convert to PNG or JPG
fi

if hash ${WEBP_ENCODER} 2>/dev/null; then
  echo encoding to lossy WebP
  ${WEBP_ENCODER} -q 80 \
  ${SOURCE_IMAGE}.tif \
  -o ${SOURCE_IMAGE}.webp
else
  echo cannot convert to WEBP
fi

if hash ${HEIC_ENCODER} 2>/dev/null; then
  echo encoding to lossy HEIC
  ${HEIC_ENCODER} --quality 80 \
  ${SOURCE_IMAGE}.png
else
  echo could not encode to HEIC
fi

```

The script creates variables to hold the name of the image we want to convert and the names of the encoders we want to use. The encoders must already be installed and on the PATH.

For each image format, the script will check if the encoder is available. If it is the script will use it to encode the image. If the encoder is not available thhe script will print an error message and continue on to the next encoder or exit if it's on the last one.

The Bash shell is powerful but it's not available everywhere out of the box. It is available by default on Linux and macOS, but not on Windows. To get Bash on Windows, you have a few options:

* Install [Cygwin](https://www.cygwin.com/)

Another posibility is to run a full script in node using tools like [zx](https://github.com/google/zx). The tools is more complicated to use and does a better job or emulating a shell than ShellJS.

It requires you to save the files with an `.mjs` extension to take advantage of top level await syntax.

```js
#!/usr/bin/env zx

let username = await question('What is your GitHub username? ')
let token = await question('Do you have GitHub token in env? ', {
  choices: Object.keys(process.env)
})

let headers = {}
if (process.env[token]) {
  headers = {
    Authorization: `token ${process.env[token]}`
  }
}
let res = await fetch(`https://api.github.com/users/${username}/repos`, {headers})
let data = await res.json()
let urls = data.map(x => x.git_url)

await $`mkdir -p backups`
cd('./backups')

await Promise.all(urls.map(url => $`git clone ${url}`))
