const Joi = require("joi");

const modelSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  brand_id: Joi.number().integer(),
});

module.exports = modelSchema;
