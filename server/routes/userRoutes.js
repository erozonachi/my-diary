
/**
* @author Eneh, James Erozonachi
*
* @description MyDiary Application API endpoints routes
*
* */
import * as Constants from '../helpers/Constants';
import UserController from '../controllers/UserController';
import AuthController from '../controllers/AuthController';

export default function userRoutes(app, validate) {
  // POST /api/v1/users
  app.post(`${Constants.apiBaseURL}/:userId/notify/:setNotice`, AuthController.isAuthourized, UserController.setReminder);
}
