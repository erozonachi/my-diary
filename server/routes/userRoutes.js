
/**
* @author Eneh, James Erozonachi
*
* @description MyDiary Application API endpoints routes
*
* */
import * as Constants from '../helpers/Constants';
import UserController from '../controllers/UserController';
import UserValidation from '../helpers/validatelib/UserValidation';

export default function userRoutes(app, validate) {
  // POST /api/v1/users
  app.post(Constants.apiBaseURL, validate(UserValidation.create), UserController.create);
}
