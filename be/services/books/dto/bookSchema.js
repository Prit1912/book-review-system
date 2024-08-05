const Joi = require("joi");

// Define the Joi schema for a Book
const bookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  genre: Joi.string().required(),
  summary: Joi.string().required(),
  publishedDate: Joi.date().required(),
});

module.exports = {
  bookSchema,
};
