# Editor As A PWA

In 2021 I thought building a text editor based on [Monaco](https://github.com/microsoft/monaco-editor) and built as an [Electron](https://www.electronjs.org/) application was a good idea.

Rather than wrap Electron around the app, I will try to build an editor again but make it a PWA.

A PWA presents many of the advantages of a native app without many of the disadvantages.

* **Don't require downloads** There is no app store to download from
* **Updates are automatic** since there is no app store to download from
* **Installation is optional** you can either run it in your browser or install it on your computer as a standalone app

So the goals for the project are:

* Evaluate if Monaco is (still) a good editor for a PWA
  * If not then what would make a good alternative?
* Integrate the following APIs into the process and evaluate how they integrate with Monaco
  * [File System Access API](https://web.dev/file-system-access/) to provide open/save functionality
  * [Async Clipboard API](https://web.dev/async-clipboard/) for copy/paste
  * [File Handling API](https://web.dev/file-handling/) to let the editor open files of a given type
* Integrate a testing framework to the project where it doesn't exist already
* Evaluate if module bundling is still a good idea
* Test if ES2017 is still a good target for compilation
* Test if there's a way to make the editor save to remore locations like Dropbox, Google Drive or an S3 bucket?

Throughout the year I will document the process, challenges and learnings from building the project. By the end of the year I hope to have a working prototype of the editor ready for use.
