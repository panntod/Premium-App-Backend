const express = require("express");
const app = express();

const userRoute = require("./userRoute");
app.use("/user", userRoute);

module.exports = app;
