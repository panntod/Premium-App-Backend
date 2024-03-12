require("dotenv").config();
module.exports = {
  allowedOrigins: ["http://localhost:3000", "http://localhost:5173"],
  PORT: process.env.APP_PORT,
};
