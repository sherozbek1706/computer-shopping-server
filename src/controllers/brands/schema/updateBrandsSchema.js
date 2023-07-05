const Joi = require("joi");

const updateBrandsSchema = Joi.object({
  name: Joi.string().min(2).max(255),
});
module.exports = updateBrandsSchema;
