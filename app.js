const express = require("express");
const mustacheExpress = require("mustache-express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const routes = require("./src/index");
const dotenv = require('dotenv').config();

const app = express();

// view engine setup
app.engine("mustache", mustacheExpress());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "mustache");

app.use(logger("dev"));

// Parse json and encoded body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

app.use("/", routes);

module.exports = app;

