const Joi = require("joi");

const postComputerSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.string().required(),  
  year: Joi.date(),
  brand_id: Joi.number().integer(),
  cotegory_id: Joi.number().integer(),
  model_id: Joi.number().integer(),
});

module.exports = postComputerSchema;
