// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

const getTimestamp = date => ({
  unix: date.getTime(),
  utc: date.toUTCString()
});
// your first API endpoint...
app.get("/api/timestamp", function(req, res) {
  const dateString = req.url.split("/api/timestamp/")[1];
  let timestamp;
  if (dateString === undefined || dateString.trim() === "") {
    timestamp = getTimestamp(new Date());
  } else {
    const date = !isNaN(dateString)
      ? new Date(parseInt(dateString))
      : new Date(dateString);
    if (!isNaN(date.getTime())) {
      timestamp = getTimestamp(date);
    } else {
      timestamp = { error: "invalid date" };
    }
  }
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(timestamp));
});
// Handle 404 - Keep this as a last route
app.use(function(req, res, next) {
  res.status(404);
  res.send("404: File Not Found");
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
