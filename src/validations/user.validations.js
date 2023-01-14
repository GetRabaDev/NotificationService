const Joi = require('joi');
// import { join } from 'path/posix';

const signUp = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
    confirm_password: Joi.string()
      .required()
      .valid(Joi.ref('password'))
      .label('Please passwords must match'),
    last_name: Joi.string().required(),
    first_name: Joi.string().required(),
    phonenumber: Joi.string().required(),
    bvn: Joi.string().required(),
  }),
};

const loginValidation = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const activateUser = {
  body: Joi.object().keys({
    reset_token: Joi.string().uuid().required(),
    new_password: Joi.string().min(6).required(),
    confirm_password: Joi.string()
      .required()
      .valid(Joi.ref('new_password'))
      .label('Please passwords must match'),
    old_password: Joi.string().min(6).required(),
  }),
};

const forgotPasswordValidation = {
  body: Joi.object().keys({
    email_address: Joi.string().required(),
    baseUrl: Joi.string().optional(),
  }),
};

const resetPasswordValidation = {
  body: Joi.object().keys({
    new_password: Joi.string().min(6).required(),
    reset_token: Joi.string().required(),
    confirm_password: Joi.string()
      .required()
      .valid(Joi.ref('new_password'))
      .label('Please passwords must match'),
  }),
};

module.exports = {
  signUp,
  loginValidation,
  activateUser,
  forgotPasswordValidation,
  resetPasswordValidation,
};
