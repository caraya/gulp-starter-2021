/**
 * API for projects
 *
 * My first attempt at doing this kind of work. I'm sure there are many errors
 * so feedback is greatly appreciated
 *
 * @author carlos araya <carlos.araya@gmail.com>
 * @license MIT (caraya.mit-license.org)
 */
const express = require('express');
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

/**
 * We use this to provide permisive CORS headers.
 * Without this we will not be able to put or pull data
 */
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


/**
 * We initialize the db variable so we can use it in multiple places
 */
var db;


/**
 * DB connection and application start.
 *
 * We only start the app if the database connection was successful
 */
MongoClient.connect('mongodb://node:node@ds019033.mlab.com:19033/projects', (err, database) => {
  if (err) {
    return console.log(err);
  }
  db = database;


  // Needed to work on heroku
  // console.log returns undefined.
  app.listen( process.env.PORT || 3000, function() {
    console.log('Node app is running on port', app.get( 'port' ));
  });
});


// ROUTES FOR PROJECTS
/**
 * Post to project adds a new project to the database.
 *
 * Matches the content of the form to the newProject model and saves it to the database
 *
 * used this {@link http://stackoverflow.com/questions/32012367/how-to-submit-a-form-using-js-node-mongo-and-express| http://stackoverflow.com/questions/32012367/how-to-submit-a-form-using-js-node-mongo-and-express}
 * as reference
 */
app.post('/projects', (req, res) => {
  /**
   * This is the model definition. We'll use it in multiple places so we put it outside function declaration
   * @type {{name: *, stage: *, description: (*|Document.description), notes: *, type: *, url: {code: *, other: *, writeup: *}}}
   */
  var newProject = {
    name: req.body.name,
    stage: req.body.stage,
    description: req.body.description,
    notes: req.body.notes,
    type: req.body.type,
    url: {
      code: req.body.code,
      other: req.body.other,
      writeup: req.body.writeup
    }
  };
  // Save the content of the form to the database
  db.collection('projects').save(newProject, (err, result) => {
    if (err) {
      // If there's an error log it
      return console.log(err);
    }
    // If there's no error we saved successfully
    console.log('saved to database');
    // Redirect to the application's index page
    res.redirect('https://caraya.github.io/polymer-list/');
  });
});

/**
 * Deletes a single project. Still under development
 */
app.delete('/projects', (req, res) => {
  db.collection('quotes').findOneAndDelete({name: req.body.name},
    (err, res) => {
      if (err) {
        return res.send(500, err);
      }
      res.send('Project successfully deleted');
    });
});

/**
 * Put updates a single instance of a project.
 *
 * It will insert a new project in the database if it doesn't already exist
 */
app.put('/projects', (req, res, project) => {
  db.collection('projects')
    .findOneAndUpdate({name: project}, {
      $set: {
        name: req.body.name,
        quote: req.body.quote
      }
    }, {
      sort: {_id: -1},
      upsert: true
    }, (err, result) => {
      if (err) {
        return res.send(err);
      }
      res.send(result);
    });
});

/**
 * Get /projects returns an JSON object with all the projects available.
 */
app.get('/projects', (req, res) => {
  // Find all documents in MongoDB
  db.collection('projects').find().toArray(function (err, results) {
    // console.log(results);
    // Return them to the client
    return res.json(results);
  });

});


/**
 * Default get route redirects to the get /projects
 */
app.get('/', (req, res) => {
  // Since we're not pushing anything that is not JSON from index
  // we may as well redirect index to /projects
  res.redirect('/projects');
  // If we were pushing content we could uncomment the line below and
  // comment the redirect above :)
  //res.sendfile(__dirname + '/index.html');
});
