import { Book, Review } from "../../models";
import { BadRequestError, UnprocessableEntityError } from "../../utils/error";
import { bookSchema } from "./dto/bookSchema";
import { isValidObjectId } from "mongoose";
import { reviewSchema } from "./dto/reviewSchema";
import { validateSchema } from "../../utils/validators/schemaValidator";

export const getAllBooks = async (page = 1, limit = 10) => {
  try {
    // Convert page and limit to integers
    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);

    // Ensure pageNumber and pageSize are positive integers
    if (pageNumber < 1 || pageSize < 1) {
      throw new BadRequestError("Page number and limit must be greater than 0");
    }

    // Calculate the skip value
    const skip = (pageNumber - 1) * pageSize;

    // Query the database with pagination
    const books = await Book.find()
      .populate({ path: "reviews" })
      .skip(skip)
      .limit(pageSize);

    // Count the total number of books
    const totalBooks = await Book.countDocuments();

    return {
      books,
      totalBooks,
      totalPages: Math.ceil(totalBooks / pageSize),
      currentPage: pageNumber,
    };
  } catch (error) {
    throw error;
  }
};

export const createBook = async (createBookPayload) => {
  try {
    // validate book payload
    validateSchema(bookSchema, createBookPayload);

    // create book
    const book = new Book(createBookPayload);
    await book.save();
    return book;
  } catch (error) {
    throw error;
  }
};

export const getBookById = async (id) => {
  try {
    // check id is valid or not
    if (!isValidObjectId(id)) {
      throw new BadRequestError("Invalid id");
    }

    const book = await Book.findById(id).populate({ path: "reviews" });
    if (!book) {
      throw new UnprocessableEntityError("Book not found");
    }

    return book;
  } catch (error) {
    throw error;
  }
};

export const updateBookById = async (id, updateBookPayload) => {
  try {
    // check if id is valid or not
    if (!isValidObjectId(id)) {
      throw new BadRequestError("Invalid id");
    }

    // validate book payload
    validateSchema(bookSchema, updateBookPayload);

    // update book details
    const book = await Book.findByIdAndUpdate(id, updateBookPayload, {
      new: true,
    });
    if (!book) {
      throw new UnprocessableEntityError("Book not found");
    }
    return book;
  } catch (error) {
    throw error;
  }
};

export const deleteBookById = async (id) => {
  try {
    //  check if id is valid or not
    if (!isValidObjectId(id)) {
      throw new BadRequestError("Invalid id");
    }

    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      throw new UnprocessableEntityError("Book not found");
    }
    return { success: true };
  } catch (error) {
    throw error;
  }
};

export const addBookReview = async (bookId, reviewPayload) => {
  try {
    // check if book id is valid
    if (!isValidObjectId(bookId)) {
      throw new BadRequestError("Invalid book id");
    }

    // validate review payload
    validateSchema(reviewSchema, reviewPayload);

    // check book is present or not
    await getBookById(bookId);

    const review = new Review({ bookId, ...reviewPayload });
    await review.save();
    return review;
  } catch (error) {
    throw error;
  }
};

export const getAllBookReviews = async (bookId) => {
  try {
    // check if book id is valid
    if (!isValidObjectId(bookId)) {
      throw new BadRequestError("Invalid book id");
    }

    // check book is present or not
    await getBookById(bookId);

    const reviews = await Review.find({ bookId }).populate({
      path: "bookDetails",
      select: "title author",
    });
    return reviews;
  } catch (error) {
    throw error;
  }
};
