/**
* @author Eneh, James Erozonachi
*
* @description A module that validates request payloads for user resource
*
* */
import FieldValidation from './FieldValidation';

export default {
  create(req, res, next) {
    if (FieldValidation.isEmpty(req.body.firstName)) {
      return res.status(400).json({status: 'failed', message: 'First name is required'});
    }
    if (FieldValidation.isEmpty(req.body.lastName)) {
      return res.status(400).json({status: 'failed', message: 'Last name is required'});
    }
    if (FieldValidation.isEmpty(req.body.username)) {
      return res.status(400).json({status: 'failed', message: 'Username is required'});
    }
    if (FieldValidation.isEmpty(req.body.email)) {
      return res.status(400).json({status: 'failed', message: 'Email is required'});
    }
    if (FieldValidation.isEmpty(req.body.password)) {
      return res.status(400).json({status: 'failed', message: 'Password is required'});
    }
    if (!FieldValidation.isAlpha(req.body.firstName)) {
      return res.status(400).json({status: 'failed', message: 'First name can only contain letters'});
    }
    if (!FieldValidation.isAlpha(req.body.lastName)) {
      return res.status(400).json({status: 'failed', message: 'Last name can only contain letters'});
    }
    if (!FieldValidation.maxLength(req.body.firstName, 20)) {
      return res.status(400).json({status: 'failed', message: 'First name: max length exceeded'});
    }
    if (!FieldValidation.maxLength(req.body.lastName, 20)) {
      return res.status(400).json({status: 'failed', message: 'Last name: max length exceeded'});
    }
    if (!FieldValidation.maxLength(req.body.username, 20)) {
      return res.status(400).json({status: 'failed', message: 'Username: max length exceeded'});
    }
    if (!FieldValidation.maxLength(req.body.email, 45)) {
      return res.status(400).json({status: 'failed', message: 'Email: max length exceeded'});
    }
    if (!FieldValidation.isEmail(req.body.email)) {
      return res.status(400).json({status: 'failed', message: 'Email not valid'});
    }
    if (!FieldValidation.minLength(req.body.password)) {
      return res.status(400).json({status: 'failed', message: 'Password cannot be less than 10 characters'});
    }
    if (FieldValidation.isAlpha(req.body.password) || FieldValidation.isNumeric(req.body.password)) {
      return res.status(400).json({status: 'failed', message: 'Password must be a mix of letters, digits or symbols'});
    }
    next();
  },
  login(req, res, next) {
    if (FieldValidation.isEmpty(req.body.loginName)) {
      return res.status(400).json({status: 'failed', message: 'Username or Email is required'});
    }
    if (FieldValidation.isEmpty(req.body.loginPassword)) {
      return res.status(400).json({status: 'failed', message: 'Password is required'});
    }
    next();
  },
  reminder(req, res, next) {
    if (!FieldValidation.isNumber(req.params.userId)) {
      return res.status(400).json({status: 'failed', message: 'User ID must be a number'});
    }
    if (FieldValidation.isEmpty(req.params.setNotice)) {
      return res.status(400).json({status: 'failed', message: 'setNotice value on or off is required'});
    }
    next();
  },
};
