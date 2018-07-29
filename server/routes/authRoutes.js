/**
* @author Eneh, James Erozonachi
*
* @description MyDiary Application API endpoints routes
*
* */
import * as Constants from '../helpers/Constants';
import AuthController from '../controllers/AuthController';
import UserValidation from '../helpers/validatelib/UserValidation';

export default function authRoutes(app, validate) {
  // POST /api/v1/users/auth/signup
  app.post(`${Constants.apiBaseURL}/auth/signup`, validate(UserValidation.create), AuthController.signUp);
  // POST /api/v1/users/auth/login
  app.post(`${Constants.apiBaseURL}/auth/login`, AuthController.signIn);
}
