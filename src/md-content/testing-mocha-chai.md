# Testing your code with Mocha and Chai

## Mocha

[Mocha](https://mochajs.org/) is a testing framework that allows you to create testing for your Javascript in a way that easy to read and reason through. There are several assertion ibraries you can use to write your code

```javascript
var should = require('chai').should(); //actually call the function
var foo = 'bar'
var beverages = {
  tea: [ 'chai', 'matcha', 'oolong' ],
  coffee: [ 'black', 'nitro']
};

foo.should.be.a('string');
foo.should.equal('bar');
foo.should.have.lengthOf(3);
beverages.should.have.property('tea').with.lengthOf(3);
beverages.should.have.property('coffee').with.lenghtOf(2);
```

### Asynchronous code

https://mochajs.org/#asynchronous-code
https://mochajs.org/#working-with-promises
https://mochajs.org/#using-async--await

### Synchronous Code
https://mochajs.org/#synchronous-code
https://mochajs.org/#arrow-functions

### Hooks

https://mochajs.org/#hooks

```javascript
describe('hooks', function() {

  before(function() {
    // runs before all tests in this block
  });

  after(function() {
    // runs after all tests in this block
  });

  beforeEach(function() {
    // runs before each test in this block
  });

  afterEach(function() {
    // runs after each test in this block
  });

  // test cases
});
```

## Using Mocha with Gulp

```javascript
var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('default', function() {
  return gulp.src(['test/test-*.js'], { read: false })
    .pipe(mocha({
      reporter: 'spec',
      globals: {
        should: require('should')
      }
    }));
});
```

```javascript
// npm install gulp gulp-mocha gulp-util

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');

gulp.task('default', function() {
      gulp.watch(['lib/**', 'test/**'], ['mocha']);
});

gulp.task('mocha', function() {
    return gulp.src(['test/*.js'], { read: false })
        .pipe(mocha({ reporter: 'list' }))
        .on('error', gutil.log);
});
```

# Automating tests with Saucelabs and Mocha/Chai

```javascript
const saucelabs = require('gulp-saucelabs');
const connect   = require('gulp-connect');

// Saucelabs
gulp.task('saucelabs', () => {
    const config = {
      urls: ['http://localhost:3000/tests/qunit/index.html'],
      testname: 'My test',
      framework: 'qunit',
      browsers: [
          {
              browserName: "MicrosoftEdge",
              platform: "Windows 10",
              version: "latest"
          }
      ],
      onTestSuiteComplete: (status) => {
          if (status) {
              console.log('All tests passed!');
          }
      };
    }

    return saucelabs(config);
});

// Start local http server
gulp.task('connect', () => {
    connect.server({ port: 3000, root: './' });
});

// Close down the http server
gulp.task('disconnect', () => {
    connect.serverClose();
});

gulp.task('test-saucelabs', ['connect', 'saucelabs'],
  () => gulp.start('disconnect'))
```
