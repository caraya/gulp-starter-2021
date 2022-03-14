# building a database backed application in Node

A lot of times when I try a new front end technology or decide to work with a new framework, I need a backend to work with.

For the longest time I've used a project databaase hosted locally but I've decided to use a different strategy and build a single REST API backed by a MongoDB database. With an API I can then concentrate on the front end and use an existing CRUD (Create, Read, Update, Delete) REST API.

The following table shows the different parts of the proposed API:

| HTTP Verb | Endpoint | Description |
| --------- | -------- | ----------- |
| GET | projects | Get all projects |
| POST | project | Create a new project |
| GET | project/:id | Get a single project by its ID |
| Patch | project/:id | Update a project |
| DELETE | project/:id | Delete a project indicated by its ID |

We will use
[Express](https://expressjs.com/) and [Mongoose](https://mongoosejs.com/) to build the API and follow Rahman Fadhil's [How to Build a REST API with Express and Mongoose](https://rahmanfadhil.com/express-rest-api/).

The post is broken up in three sections:

* The server
* The model
* The routes

We will also do a quick setup of the tools that we need to build the API.

## Getting started

The project requires the following tools:

* Node.js
* MongoDB
* Postman

### Install Node.js

My preferred way to install Node is to use [NVM](https://github.com/nvm-sh/nvm). It will let you install, run and update multiple versions of Node without manual interaction.

Using wget, run the following command to install NVM:

```bash
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

Running the above command downloads a script and runs it. The script clones the nvm repository to `~/.nvm`, and attempts to add the startup code snippet to the correct profile file (`~/.bash_profile`, `~/.zshrc`, `~/.profile`, or `~/.bashrc`).

If it doesn't work, check the following [troubleshooting tips on macOS](https://github.com/nvm-sh/nvm#troubleshooting-on-macos) and [troubleshooting tips on Linux](https://github.com/nvm-sh/nvm#troubleshooting-on-linux) for more information.

If successful you should be able to run the following command to check if there's a version of Node up and running

```bash
node --version
```

You can then install the latest version of Node 16 and switch to using it:

```bash
nvm install 16
nvm use 16
```

### Install MongoDB

We will use the latest version of MongoDB Community Edition Server running locally. We might revisit this later and move it to a managed MongoDB Atlas cluster.

First we will install MongoDB Community Edition Server (MongoDB Community) using [Homebrew](https://brew.sh/).

```bash
brew install mongodb-community
```

And the start the server using the following command:

```bash
mongod --config /usr/local/etc/mongod.conf --fork
```

Note that this command will not run MongoDB as a service. You will have to start it manually every time

### Install Postman

We will use [Postman](https://www.postman.com/) to test our API.

You can install Postman using the following command:

```bash
brew install --cask postman
```

You can also download it from the Postman wwebsite after you've created an account and logged in.

### Initializing the project

Before we can start writing code, we need to prepare the Node.js environment. To do so run the following commands on your shell/terminal:

```bash
mkdir api-project
cd api-project
npm init --yes
```

Running `npm init --yes` will create a package.json file and set up the project with default information.

## The server

The first portion of the project is the server, located in `index.js`.

We first require and configure [Express.js](https://expressjs.com/).

We use the `body-parser` to parse the body of the request, and the `json` module to parse JSON incoming requests.

```js
const express = require('express');
const app = express();
app.use(express.urlencoded({
  extended: true,
}));
app.use(express.json());
```

We define the routes for the API and we use associate them with the `/api` endpoint.

```js
const routes = require('./routes/routes');
app.use('/api', routes);
```

We require `dotenv` to store secrets and we then use a secret in `.env` to configure the database URL that we want to use.

```js
require('dotenv').config();
const mongoString = process.env.LOCAL_DB_URL;
```

We require `mongoose` to perform database-related operations.

We connect to the database using the `mongoString` string defined earlier and define a `mongoose.connection` string.

We then define two events, one for errors where we log the error to the console.

The second event is registered after we are connected to the database. We log the status of the connection to the console.

```js
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error);
});

database.once('connected', () => {
  console.log('Database Connected');
});
```

The final part of the server is to start the server by listening on port 3000.

In the future we need

```js
app.listen(3000, () => {
  console.log(`Server Started at ${3000}`);
});
```

## The model

```js
const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  stage: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  notes: {
    required: false,
    type: String,
  },
  type: {
    required: false,
    type: String,
  },
  codeURL: {
    type: String,
  },
  otherURL: {
    type: String,
  },
  writeupURL: {
    type: String,
  },
},
{
  timestamps: true,
});
;

module.exports = mongoose.model('Data', projectSchema);
```

## The HTTP verbs

```js
const express = require('express');
const router = express.Router();
const Projects = require('../models/model');
```

### Get all projects

```js
// Get all projects
router.get('/projects', async (req, res) => {
  // res.send('Get all projects');
  const posts = await Projects.find();
  res.send(posts);
});
```

### Create a project

```js
// Get one project by ID
router.get('/project/:id', async (req, res) => {
  try {
    const project = await Projects.findOne({
      _id: req.params.id,
    });
    res.send(project);
  } catch {
    res.status(404);
    res.send({
      error: 'Post doesn\'t exist!',
    });
  }
});
```

### Get a project based on its ID

```js
router.post('/project', async (req, res) => {
  const data = new Projects({
    name: req.body.name,
    stage: req.body.stage,
    description: req.body.description,
    notes: req.body.notes,
    type: req.body.type,
    codeURL: req.body.codeURL,
    otherURL: req.body.otherURL,
    writeupURL: req.body.writeupURL,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (err) {
    res.status(400).send(err);
  }
});
```

### Update a project

```js
// Update (patch) a project
router.patch('/project/:id', async (req, res) => {
  try {
    const project = await Projects.findOne({
      _id: req.params.id,
    });

    if (req.body.name) {
      project.name = req.body.name;
    }

    if (req.body.stage) {
      project.stage = req.body.stage;
    }

    if (req.body.description) {
      project.description = req.body.description;
    }

    if (req.body.notes) {
      project.notes = req.body.notes;
    }

    if (req.body.type) {
      project.type = req.body.type;
    }

    if (req.body.codeURL) {
      project.codeURL = req.body.codeURL;
    }

    if (req.body.otherURL) {
      project.otherURL = req.body.otherURL;
    }

    if (req.body.writeupURL) {
      project.writeupURL = req.body.writeupURL;
    }

    await project.save();
    res.send(project);
  } catch {
    res.status(404);
    res.send({error: 'Post doesn\'t exist!'});
  }
});
```

See [Difference Between PUT and PATCH Request](https://www.geeksforgeeks.org/difference-between-put-and-patch-request/)

### Delete a project

```js
// Delete a project by its ID
router.delete('/project/:id', async (req, res) => {
  try {
    const project = await Projects.findOneAndDelete({
      _id: req.params.id,
    });
    res.send(project);
  } catch {
    res.status(404);
    res.send({error: 'Post doesn\'t exist!'});
  }
});
```

### Exporting the router

```js
module.exports = router;
```
