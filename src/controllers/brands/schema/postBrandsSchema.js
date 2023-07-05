const Joi = require("joi");

const postBrandsSchema = Joi.object({
  name: Joi.string().required().min(2).max(255),
});
module.exports = postBrandsSchema;
