/**
* @author Eneh, James Erozonachi
*
* @description A module that validates request payloads for user resource
*
* */
import FieldValidation from './FieldValidation';

export default {
  create(req, res, next) {
    try {
      if (FieldValidation.isEmpty(req.body.firstName)) {
        return res.status(400).json({status: 'fail', message: 'First name is required'});
      }
      if (FieldValidation.isEmpty(req.body.lastName)) {
        return res.status(400).json({status: 'fail', message: 'Last name is required'});
      }
      if (FieldValidation.isEmpty(req.body.username)) {
        return res.status(400).json({status: 'fail', message: 'Username is required'});
      }
      if (FieldValidation.isEmpty(req.body.email)) {
        return res.status(400).json({status: 'fail', message: 'Email is required'});
      }
      if (FieldValidation.isEmpty(req.body.password)) {
        return res.status(400).json({status: 'fail', message: 'Password is required'});
      }
      if (!FieldValidation.isAlpha(req.body.firstName)) {
        return res.status(400).json({status: 'fail', message: 'First name can only contain letters'});
      }
      if (!FieldValidation.isAlpha(req.body.lastName)) {
        return res.status(400).json({status: 'fail', message: 'Last name can only contain letters'});
      }
      if (!FieldValidation.maxLength(req.body.firstName, 20)) {
        return res.status(400).json({status: 'fail', message: 'First name: max length exceeded'});
      }
      if (!FieldValidation.maxLength(req.body.lastName, 20)) {
        return res.status(400).json({status: 'fail', message: 'Last name: max length exceeded'});
      }
      if (!FieldValidation.maxLength(req.body.username, 20)) {
        return res.status(400).json({status: 'fail', message: 'Username: max length exceeded'});
      }
      if (!FieldValidation.maxLength(req.body.email, 45)) {
        return res.status(400).json({status: 'fail', message: 'Email: max length exceeded'});
      }
      if (!FieldValidation.isEmail(req.body.email)) {
        return res.status(400).json({status: 'fail', message: 'Email not valid'});
      }
      if (!FieldValidation.minLength(req.body.password)) {
        return res.status(400).json({status: 'fail', message: 'Password cannot be less than 10 characters'});
      }
      if (FieldValidation.isAlpha(req.body.password) || FieldValidation.isNumeric(req.body.password)) {
        return res.status(400).json({status: 'fail', message: 'Password must be a mix of letters, digits or symbols'});
      }
      next();
    } catch (error) {
      return res.status(500).json({status: 'fail', message: 'User Validation failed'});
    }
  },
  login(req, res, next) {
    try {
      if (FieldValidation.isEmpty(req.body.loginName)) {
        return res.status(400).json({status: 'fail', message: 'Username or Email is required'});
      }
      if (FieldValidation.isEmpty(req.body.loginPassword)) {
        return res.status(400).json({status: 'fail', message: 'Password is required'});
      }
      next();
    } catch (error) {
      return res.status(400).json({status: 'fail', message: 'Malformed Username or Password'});
    }
  },
  reminder(req, res, next) {
    try{
      if (!FieldValidation.isNumber(req.params.userId)) {
        return res.status(400).json({status: 'fail', message: 'User ID must be a number'});
      }
      if (FieldValidation.isEmpty(req.params.setNotice)) {
        return res.status(400).json({status: 'fail', message: 'setNotice value on or off is required'});
      }
      next();
    } catch (error) {
      return res.status(400).json({status: 'fail', message: 'Malformed Reminder set value'});
    }
  },
};
