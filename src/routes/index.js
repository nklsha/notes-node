const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const routes = require("./routes.js");


function initExpress() {

  const app = express();

  app.use(helmet());

  app.use(bodyParser.json());

  app.use(cors({ origin: "http://localhost:3000" }));

  app.use(morgan("combined"));

  return app;
}

function setup() {
  const app = initExpress();

  app.route("/note/:id")
    .get(routes.getNote)
    .put(routes.updateNote)
    .delete(routes.removeNote);

  app.route("/note")
    .get(routes.getAllNotes)
    .post(routes.addNote);

  return app;
}

module.exports = {
  setup
};