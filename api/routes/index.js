const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const userAuthRoute = require("./userAuth");
const questionRoute = require("./question");

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extend: false }));

app.get("/", (req, res) => {
  res.send("Welcome to Stack");
});

app.use("/", userAuthRoute);
app.use("/", questionRoute);

module.exports = app;
