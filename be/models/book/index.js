const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the Book schema
const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    publishedDate: {
      type: Date,
      required: true,
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

module.exports = { Book };
