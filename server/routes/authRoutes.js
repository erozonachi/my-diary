/**
* @author Eneh, James Erozonachi
*
* @description MyDiary Application API endpoints routes
*
* */
import * as Constants from '../helpers/Constants';
import AuthController from '../controllers/AuthController';
import UserValidation from '../helpers/validatelib/UserValidation';

export default function authRoutes(app) {
  // POST /api/v1/users/auth/signup
  app.post(`${Constants.apiBaseURL}/auth/signup`, UserValidation.create, AuthController.signUp);
  // POST /api/v1/users/auth/login
  app.post(`${Constants.apiBaseURL}/auth/login`, UserValidation.login, AuthController.signIn);
}
