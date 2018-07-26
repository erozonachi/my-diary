/**
* @author Eneh, James Erozonachi
*
* @description A module that validates request payloads for user resource
*
* */
import Joi from 'joi';

export default {
  create: {
    body: {
      firstName: Joi.string().regex(/^[a-zA-Z]+$/).max(20).required(),
      lastName: Joi.string().regex(/^[a-zA-Z]+$/).max(20).required(),
      username: Joi.string().max(20).required(),
      email: Joi.string().email().max(50).required(),
      password: Joi.string().min(10).required(),
    },
  },
};
