# Github Actions as Publishing Tools

Github actions are a new offering from Github that allows you to automate processes and tooling for Github hosted projects, similar to what you'd get in a CI environment.

The idea is that you create a [YAML](https://yaml.org/) file with the list of steps to run and the operating system you want to run them on. It is possible to run an action in multiple operating systems (Windows, Mac and Linux are available).

The following test action checks if the dependecies have been caches and if they are not, it installs the dependecies specified in `package-lock.json` and then runs `gulp`.

```yaml
name: Test
on: [push]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v1
    - uses: actions/cache@v1
      with:
        path: node_modules
        key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
    - name: Install Dependencies
      if: steps.cache.outputs.cache-hit != 'true'
      run: npm install
    - run: gulp
```

If we combine this with [Github pages](https://pages.github.com/) we now have a full static site publishing solution that will update content everytime we push new content to the repository.

Furthermore we can tie the action to more than one even, for example the following YAML snippet works when pushing into the master branch and whenever a pull request is closed.

```yaml
name: Test
on:
  push:
    branches:
      - master
  pull_requests:
    types: [closed]
```

<div class="message warning">
  <h2>Note</h2>

  <p>I've asked Github support if there is a way to specify merged PRs rather than just closed. I don't know if the closed status implies merged since you can close a PR without merging it.</p>
</div>

## Research Project: Collaborative Publishing

Now that we have the basics of actions, let's put them together into a working project.

The idea is to take a static site generator, as described in [Static Site Generators: Nunjucks and Gulp](https://publishing-project.rivendellweb.net/static-site-generators-nunjucks-and-gulp/) with this [code repository](https://github.com/caraya/static-gen-njk)

The idea is that only people creating the site can edit the content of the respository but everyone with a Github account can fork the respository and submit content to the repo through [pull requests](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/proposing-changes-to-your-work-with-pull-requests) without having to build the repository every time, unless you want to :-)

## Building the workflow

I've chosen to implement the workflow from the repository itself. Create a .github/


```yaml
name: Publish
on:
  push:
    branches:
      - master
  pull_request:
    types: [closed]

jobs:
  publish:
    runs-on: ubuntu-latest

    steps:
    - name: checkout code
      uses: actions/checkout@v1

    - name: Setup Node
      uses: actions/setup-node@v1
      with:
        node-version: '12.x'
        registry-url: 'https://registry.npmjs.org'

    - name: build
      run: |
        npm install
        npm run prepare
        npm run publish

    - name: Deploy
      uses: maxheld83/ghpages@v0.2.1
      with:
        branch: gh-pages
        env.BUILD_DIR: "docs/"
        secrets: "secrets.ACCESS_TOKEN"
```

The workflow uses the following pre-defined actions:

* [checkout](https://github.com/actions/checkout)
* [setup-node](https://github.com/actions/setup-node)
* [ghpages](https://github.com/maxheld83/ghpages)

There is a large repository of ready-made actions [available on Github](https://github.com/actions/).

It also leverages the process already in the repository. We run the existing build process from the repository and we don't even need to install the node packages on every developer's machine.

The first version didn't work. I mean, it did work but produced no output so I went back to the drawing board and used an example from [pierresaid](https://dev.to/pierresaid) at [dev.to](https://dev.to/pierresaid/deploy-node-projects-to-github-pages-with-github-actions-4jco) as the basis for the example below:


## Resources

* [Github Actions](https://github.com/features/actions)
* [Core concepts for GitHub Actions](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/core-concepts-for-github-actions)
* [Automating your workflow with GitHub Actions](https://help.github.com/en/actions/automating-your-workflow-with-github-actions)
* [Creating a workflow file](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/configuring-a-workflow#creating-a-workflow-file)
* [Github Actions Node.js starter workflow](https://github.com/actions/starter-workflows/blob/master/ci/node.js.yml)
