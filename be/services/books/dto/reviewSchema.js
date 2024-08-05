const Joi = require("joi");

const reviewSchema = Joi.object({
  reviewer: Joi.string().required(),
  rating: Joi.number().integer().min(1).max(5).required(),
  comment: Joi.string().required(),
});

module.exports = {
  reviewSchema,
};
