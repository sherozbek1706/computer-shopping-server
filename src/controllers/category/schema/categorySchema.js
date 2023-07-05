const Joi = require("joi");

const categorySchema = Joi.object({
  name: Joi.string().min(2).max(255).required(),
});

module.exports = categorySchema;
