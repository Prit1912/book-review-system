const express = require("express");
const expressFileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("../routers/index.router");
const loggerMiddleware = require("../middleware/logger.middleware");

module.exports = ({ app }) => {
  app.use(cors());
  app.use(express.json());
  app.use(bodyParser.json());
  app.use(expressFileUpload());
  app.use(loggerMiddleware); // logs each request

  // load routers
  routes(app);
};
