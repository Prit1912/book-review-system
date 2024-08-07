const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the allowed genres
const genres = [
  "Fiction",
  "Non-Fiction",
  "Science Fiction",
  "Fantasy",
  "Mystery",
  "Thriller",
  "Romance",
  "Horror",
];

// Define the Book schema
const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 100,
    },
    author: {
      type: String,
      required: true,
      maxlength: 50,
    },
    genre: {
      type: String,
      required: true,
      enum: genres, // Add the enum validator for genre
    },
    summary: {
      type: String,
      required: true,
      maxlength: 200,
    },
    publishedDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value <= new Date();
        },
        message: "Published date cannot be in the future",
      },
    },
  },
  { timestamps: true }
);

// Virtual to get the book details
bookSchema.virtual("reviews", {
  ref: "review",
  localField: "_id",
  foreignField: "bookId",
});

// Ensure virtuals are serialized
bookSchema.set("toObject", { virtuals: true });
bookSchema.set("toJSON", { virtuals: true });

const Book = mongoose.model("book", bookSchema);

module.exports = { Book, genres };
