# Cypress as a testing infrastructure

I don't test applications as much as I should. It is partly out of laziness (not the good kind) and partly because most of my projects are static sites that, at most, will use a templating engine to generate the pages you see.

I've made it a priority to finally pick a tool and use it to test my projects. One candidate is [Playwright](https://playwright.dev/), the other one, that we'll cover on this post, is [Cypress](https://www.cypress.io/), inspired by Ramona Schwering's [Let’s Dive Into Cypress For End-to-End Testing](https://www.smashingmagazine.com/2021/09/cypress-end-to-end-testing/).

## Why Cypress?

While Playwright gives me a lot of the functionality that I need to test applications and sites, Cypress does one more thing that I need: a better graphical UI that can run as a standalone application or versioned as part of an app or site.

To test the site, I will work with an old site: [Layout Web Experiments](https://layout-experiments.firebaseapp.com/).

## Different types of testing

[Integration Testing](https://en.wikipedia.org/wiki/Integration_testing) is a testing methodology that allows you to test all the blocks of an application.

[End to End Testing](https://browserstack.com/blog/end-to-end-testing/) refers to testing an application’s workflow from beginning to end. This method basically aims to replicate real user scenarios so that the system can be validated for integration and data integrity.

### Thinking about what we want to test

It would be tempting to test every component and every user journey, but that's not necessarily a good idea.

The
