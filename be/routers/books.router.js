const express = require("express");
const {
  getAllBooks,
  createBook,
  getBookById,
  updateBookById,
  deleteBookById,
  addBookReview,
  getBookReviews,
} = require("../controllers/books.controller");
const loggerMiddleware = require("../middleware/logger.middleware");

const booksRouter = express.Router();

booksRouter.get("/", getAllBooks);
booksRouter.post("/", createBook);
booksRouter.get("/:id", getBookById);
booksRouter.put("/:id", updateBookById);
booksRouter.delete("/:id", deleteBookById);
booksRouter.post("/:id/reviews", addBookReview);
booksRouter.get("/:id/reviews", getBookReviews);

module.exports = booksRouter;
