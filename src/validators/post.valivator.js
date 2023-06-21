const Joi = require('joi');

const addPostSchema = Joi.object({
  uuid: Joi.string().required(),
  name: Joi.string().required(),
  description: Joi.string().required(),
});

const updatePostSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  estado: Joi.number().required(),
});

module.exports = {
  addPostSchema,
  updatePostSchema,
};
