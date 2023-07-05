const Joi = require("joi");

const loginUserSchema = Joi.object({
  username: Joi.string(),
  password: Joi.string().required(),
});
module.exports = loginUserSchema;
