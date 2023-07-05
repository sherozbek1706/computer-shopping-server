const Joi = require("joi");

const registerUserSchema = Joi.object({
  first_name: Joi.string().min(2).max(255).required(),
  last_name: Joi.string().min(2).max(255).required(),
  username: Joi.string(),
  password: Joi.string().required(),
});

module.exports = registerUserSchema;
