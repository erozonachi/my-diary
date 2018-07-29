
/**
* @author Eneh, James Erozonachi
*
* @description MyDiary Application API endpoints routes
*
* */
import * as Constants from '../helpers/Constants';
import AuthController from '../controllers/AuthController';
import EntryValidation from '../helpers/validatelib/EntryValidation';
import EntryController from '../controllers/EntryController';

export default function entryRoutes(app, validate) {
  // GET /api/v1/users/:userId/entries
  app.get(`${Constants.apiBaseURL}/:userId/entries`, AuthController.isAuthourized, validate(EntryValidation.readAll), EntryController.readAll);
  // GET /api/v1/users/:userId/entries/:entryId
  app.get(`${Constants.apiBaseURL}/:userId/entries/:entryId`, AuthController.isAuthourized, validate(EntryValidation.read), EntryController.read);
  // POST /api/v1/users/:userId/entries
  app.post(`${Constants.apiBaseURL}/:userId/entries`, AuthController.isAuthourized, validate(EntryValidation.create), EntryController.create);
  // PUT /api/v1/users/:userId/entries/:entryId
  app.put(`${Constants.apiBaseURL}/:userId/entries/:entryId`, AuthController.isAuthourized, validate(EntryValidation.update), EntryController.update);
}
