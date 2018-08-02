/**
* @author Eneh, James Erozonachi
*
* @description A module that validates request payloads for entry resource
*
* */
import FieldValidation from './FieldValidation';

export default {
  create(req, res, next) {
    try {
      if (FieldValidation.isEmpty(req.body.title)) {
        return res.status(400).json({status: 'fail', message: 'Title is required'});
      }
      if (FieldValidation.isEmpty(req.body.description)) {
        return res.status(400).json({status: 'fail', message: 'Description is required'});
      }
      if (!FieldValidation.maxLength(req.body.title, 50)) {
        return res.status(400).json({status: 'fail', message: 'Title: max length of 50 exceeded'});
      }
      if (!FieldValidation.maxLength(req.body.description, 500)) {
        return res.status(400).json({status: 'fail', message: 'Description: max length of 500 exceeded'});
      }
      if (!FieldValidation.isEmpty(req.body.conclusion)) {
        if (!FieldValidation.maxLength(req.body.conclusion, 200)) {
          return res.status(400).json({status: 'fail', message: 'Conclusion: max length of 200 exceeded'});
        }
      }
      if (!FieldValidation.isNumber(req.params.userId)) {
        return res.status(400).json({status: 'fail', message: 'User ID must be a number'});
      }
      next();
    } catch (error) {
      return res.status(400).json({status: 'fail', message: 'Bad request payload'});
    }
  },
  update(req, res, next) {
    try {
      if (FieldValidation.isEmpty(req.body.title)) {
        return res.status(400).json({status: 'fail', message: 'Title is required'});
      }
      if (FieldValidation.isEmpty(req.body.description)) {
        return res.status(400).json({status: 'fail', message: 'Description is required'});
      }
      if (!FieldValidation.maxLength(req.body.title, 50)) {
        return res.status(400).json({status: 'fail', message: 'Title: max length of 50 exceeded'});
      }
      if (!FieldValidation.maxLength(req.body.description, 500)) {
        return res.status(400).json({status: 'fail', message: 'Description: max length of 500 exceeded'});
      }
      if (!FieldValidation.isEmpty(req.body.conclusion)) {
        if (!FieldValidation.maxLength(req.body.conclusion, 200)) {
          return res.status(400).json({status: 'fail', message: 'Conclusion: max length of 200 exceeded'});
        }
      }
      if (!FieldValidation.isNumber(req.params.userId)) {
        return res.status(400).json({status: 'fail', message: 'User ID must be a number'});
      }
      if (!FieldValidation.isNumber(req.params.entryId)) {
        return res.status(400).json({status: 'fail', message: 'Entry ID must be a number'});
      }
      next();
    } catch (error) {
      return res.status(400).json({status: 'fail', message: 'Bad request payload'});
    }
  },
  read(req, res, next) {
    try {
      if (!FieldValidation.isNumber(req.params.userId)) {
        return res.status(400).json({status: 'fail', message: 'User ID must be a number'});
      }
      if (!FieldValidation.isNumber(req.params.entryId)) {
        return res.status(400).json({status: 'fail', message: 'Entry ID must be a number'});
      }
      next();
    } catch (error) {
      return res.status(400).json({status: 'fail', message: 'User or entry ID not provided'});
    }
  },
  readAll(req, res, next) {
    try {
      if (!FieldValidation.isNumber(req.params.userId)) {
        return res.status(400).json({status: 'fail', message: 'User ID must be a number'});
      }
      next();
    } catch (error) {
      return res.status(400).json({status: 'fail', message: 'User ID not provided'});
    }
  },
};
