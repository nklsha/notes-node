const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const routes = require('./routes.js');

const http = require('http')

function initExpress() {

    const app = express();
    
    // adding Helmet to enhance your Rest API's security
    app.use(helmet());
    
    // using bodyParser to parse JSON bodies into JS objects
    app.use(bodyParser.json());
    
    // enabling CORS for all requests
    app.use(cors());
    
    // adding morgan to log HTTP requests
    app.use(morgan('combined'));
    
    app.get('/allNotes', async (req, res) => {
        routes.handleRoutes(req, res, "get/allNotes")
      });
  
    app.post('/addNote', async (req, res) => {
        routes.handleRoutes(req, res, "post/addNote")
    })

    app.put('/updateNote', async (req, res) => {
        routes.handleRoutes(req, res, "put/updateNote")
    })

    app.delete('/removeNote', async (req, res) => {
        routes.handleRoutes(req, res, "delete/removeNote")
    })
    
    http.createServer(app)
    .listen(8080, () => {
      console.log('listening on port 8080');
    });
  }

  module.exports = {
    initExpress
}