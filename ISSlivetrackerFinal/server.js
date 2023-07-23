const express = require("express");
const app = express();
const path = require("path");
const ISSupdate = require(path.join(__dirname + "/js/ISSdownload.js"));

app.get("/", function (req, res) {
  ISSupdate.updateISS();
  res.sendFile(path.join(__dirname + "/views/index.html"));
});

app.get("/3d", function (req, res) {
  ISSupdate.updateISS();
  res.sendFile(path.join(__dirname + "/3dviews/index.html"));
});

app.get("/3djs/script.js", function (req, res) {
  res.sendFile(path.join(__dirname + "/3djs/script.js"));
});

app.get("/views/style.css", function (req, res) {
  res.sendFile(path.join(__dirname + "/views/style.css"));
});

app.get("/views/ISS_icon.png", function (req, res) {
  res.sendFile(path.join(__dirname + "/views/ISS_icon.png"));
});

app.get("/views/info_icon.png", function (req, res) {
  res.sendFile(path.join(__dirname + "/views/info_icon.png"));
});

app.get("/js/script.js", function (req, res) {
  res.sendFile(path.join(__dirname + "/js/script.js"));
});

app.get("/js/ISSupdate.js", function (req, res) {
  res.sendFile(path.join(__dirname + "/js/ISSupdate.js"));
});

app.get("/js/ISSdata.json", function (req, res) {
  res.sendFile(path.join(__dirname + "/js/ISSdata.json"));
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
