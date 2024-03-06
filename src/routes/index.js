const express = require("express");
const app = express();

const userRoute = require("./userRoute");
const appRoute = require("./aplikasiRoute");
const tierRoute = require("./tierRoute");
const authorization = require("../middlewares/authValidation");

app.use("/user", userRoute);
app.use("/app", appRoute);
app.use("/tier", tierRoute);
app.use("/login", authorization.authentication);
app.use(express.static(__dirname));

module.exports = app;
