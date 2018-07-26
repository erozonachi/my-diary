/**
* @author Eneh, James Erozonachi
*
* @description A module that validates request payloads for entry resource
*
* */
import Joi from 'joi';

export default {
  create: {
    body: {
      title: Joi.string().max(50).required(),
      description: Joi.string().max(500).required(),
      conclusion: Joi.string().max(200).allow(''),
    },
    params: {
      userId: Joi.number().required(),
    },
  },
  update: {
    body: {
      title: Joi.string().max(50).required(),
      description: Joi.string().max(500).required(),
      conclusion: Joi.string().max(200).allow(''),
    },
    params: {
      userId: Joi.number().required(),
      entryId: Joi.number().required(),
    },
  },
  read: {
    params: {
      userId: Joi.number().required(),
      entryId: Joi.number().required(),
    },
  },
  readAll: {
    params: {
      userId: Joi.number().required(),
    },
  },
};
