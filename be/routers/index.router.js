const express = require("express");
const booksRouter = require("./books.router");

const routes = (app) => {
  const v1Router = express.Router();

  v1Router.use("/books", booksRouter);

  app.use("/v1/", v1Router);
};

module.exports = routes;
