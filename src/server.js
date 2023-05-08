// importing the dependencies

const { setup } = require("./routes/index.js");

const http = require("http");


const app = setup();

http.createServer(app)
  .listen(8080, () => {
    console.log("listening on port 8080");
  });

module.exports = app;
