
/**
* @author Eneh, James Erozonachi
*
* @description MyDiary Application API endpoints routes
*
* */
import * as Constants from '../helpers/Constants';
import AuthController from '../controllers/AuthController';
import UserValidation from '../helpers/validatelib/UserValidation';
import UserController from '../controllers/UserController';

export default function userRoutes(app) {
  // POST /api/v1/users
  app.post(`${Constants.apiBaseURL}/:userId/notify/:setNotice`, AuthController.isAuthenticated, UserValidation.reminder, UserController.setReminder);
}
