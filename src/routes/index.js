const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const routes = require('./routes.js');
const firebase = require('firebase-admin');


firebase.initializeApp({
  credential: firebase.credential.applicationDefault()
});

function initExpress() {

  const app = express();

  app.use(helmet());

  app.use(bodyParser.json());

  app.use(cors());

  app.use(morgan('combined'));

  return app;
}

function setup() {
  const app = initExpress();

  app.route('/note/:id')
    .get((req, res) => {
      routes.autherizeRequest(req, res, routes.getNote);
    })
    .put((req, res) => {
      routes.autherizeRequest(req, res, routes.updateNote);
    })
    .delete(
      (req, res) => {
        routes.autherizeRequest(req, res, routes.removeNote);
      });

  app.route('/note')
    .get(
      (req, res) => {
        routes.autherizeRequest(req, res, routes.getAllNotes);
      })
    .post(
      (req, res) => {
        routes.autherizeRequest(req, res, routes.addNote);
      });

  app.route('/login')
    .post((req, res) => {
      routes.loginUser(req, res, firebase);
    });
  return app;
}

module.exports = {
  setup
};