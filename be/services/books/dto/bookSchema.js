const Joi = require("joi");
const { genres } = require("../../../models/book/index");

// Define the Joi schema for a Book
const bookSchema = Joi.object({
  title: Joi.string().required().max(100),
  author: Joi.string().required().max(50),
  genre: Joi.string()
    .required()
    .valid(...genres), // Validate against allowed genres
  summary: Joi.string().required().max(200),
  publishedDate: Joi.date()
    .required()
    .custom((value, helpers) => {
      if (value > new Date()) {
        return helpers.error("any.invalid");
      }
      return value;
    }, "Custom published date validation")
    .messages({
      "any.invalid": "Published date cannot be in the future",
    }),
});

module.exports = {
  bookSchema,
};
