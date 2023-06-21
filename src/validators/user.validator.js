const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  last_name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const userSchemaLogin = Joi .object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(50),
  last_name: Joi.string().min(3).max(50),
  email: Joi.string().email(),
  password: Joi.string(),
});

module.exports = {
  userSchema,
  updateUserSchema,
  userSchemaLogin
};