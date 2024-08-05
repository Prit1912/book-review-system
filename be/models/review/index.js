const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema(
  {
    bookId: {
      type: Schema.Types.ObjectId,
      ref: "book",
      required: true,
    },
    reviewer: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Virtual to get the book details
reviewSchema.virtual("bookDetails", {
  ref: "book",
  localField: "bookId",
  foreignField: "_id",
  justOne: true,
});

// Ensure virtuals are serialized
reviewSchema.set("toObject", { virtuals: true });
reviewSchema.set("toJSON", { virtuals: true });

const Review = mongoose.model("review", reviewSchema);

module.exports = {
  Review,
};
