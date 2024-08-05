import { errorResponse } from "../utils/error";

const {
  getAllBooks: getAllBooksSerive,
  createBook: createBookService,
  getBookById: getBookByIdService,
  updateBookById: updateBookByIdService,
  deleteBookById: deleteBookByIdService,
  addBookReview: addBookReviewService,
  getAllBookReviews: getAllBookReviewsService,
} = require("../services/books/books.service");

export const getAllBooks = async (req, res) => {
  try {
    const books = await getAllBooksSerive();
    return res.send(books);
  } catch (error) {
    return errorResponse({
      req,
      res,
      error,
      defaultMessage: "Could not get all books",
    });
  }
};

export const createBook = async (req, res) => {
  try {
    const { body = {} } = req;
    const book = await createBookService(body);
    return res.send(book);
  } catch (error) {
    return errorResponse({
      req,
      res,
      error,
      defaultMessage: "Could not create book",
    });
  }
};

export const getBookById = async (req, res) => {
  try {
    const { id = "" } = req?.params || {};
    const book = await getBookByIdService(id);
    return res.send(book);
  } catch (error) {
    return errorResponse({
      req,
      res,
      error,
      defaultMessage: "Could not get book details",
    });
  }
};

export const updateBookById = async (req, res) => {
  try {
    const { body = {}, params: { id = "" } = {} } = req;
    const book = await updateBookByIdService(id, body);
    return res.send(book);
  } catch (error) {
    return errorResponse({
      req,
      res,
      error,
      defaultMessage: "Could not update book",
    });
  }
};

export const deleteBookById = async (req, res) => {
  try {
    const { params: { id = "" } = {} } = req;
    const result = await deleteBookByIdService(id);
    return res.send(result);
  } catch (error) {
    return errorResponse({
      req,
      res,
      error,
      defaultMessage: "Could not delete book",
    });
  }
};

export const addBookReview = async (req, res) => {
  try {
    const { body = {}, params: { id = "" } = {} } = req;

    const review = await addBookReviewService(id, body);
    return res.send(review);
  } catch (error) {
    return errorResponse({
      req,
      res,
      error,
      defaultMessage: "Could not add book review",
    });
  }
};

export const getBookReviews = async (req, res) => {
  try {
    const { params: { id = "" } = {} } = req;
    const reviews = await getAllBookReviewsService(id);
    return res.send(reviews);
  } catch (error) {
    return errorResponse({
      req,
      res,
      error,
      defaultMessage: "Could not get book reviews",
    });
  }
};
