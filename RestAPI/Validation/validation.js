const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const signUpValidation = (data) => {
  const schema = {
    firstName: Joi.string().min().max().required(),
    firstName: Joi.string().min().max(),
    email: Joi.string().email().required(),
    phone: Joi.number().min().max().required(),
    password: Joi.string()
      .pattern(/^[a-zA-Z0-9]{3,30}$/)
      .required(),
  };

  return Joi.validate(data, schema);
};

const loginValidation = (data) => {
  const schema = {
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(/^[a-zA-Z0-9]{3,30}$/)
      .required(),
  };
  return Joi.validate(data, schema);
};

module.exports = { signUpValidation, loginValidation };
