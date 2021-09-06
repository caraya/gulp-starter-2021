@lady_ada_king in twitter to check presentation engine code

TROUBLESHOOT: WHY AM I GETTING THIS?
xcode-select: error: tool 'xcodebuild' requires Xcode, but active developer directory '/Library/Developer/CommandLineTools' is a command line tools instance

how can i change this back to xcode


NOTES AND COMMENTS?

kangax es6 support matrix

How to work with such a moving target?
Test for support at compilation time. Maybe doing something similar to Modernizr?

(Slide 20) Destructuring for assigning multiple values at the same time

Modules:

Existing solutions
  common.js
  amd

ES6 modules modeled after common.js

Every modules is a file

Module search / search path

Named exports
  Functions
  const

import {function/const} from path/module

import * as name from path/module


Degault exports

// MyFunc //
export default function () {}

import myFunc from 'myFunc'

// myClass //
export default class () {}

import myClass  from 'myClass'