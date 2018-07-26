
/**
* @author Eneh, James Erozonachi
*
* @description MyDiary Application API endpoints routes
*
* */
import * as Constants from '../helpers/Constants';
import EntryValidation from '../helpers/validatelib/EntryValidation';
import EntryController from '../controllers/EntryController';

export default function entryRoutes(app, validate) {
  // GET /api/v1/users/:userId/entries
  app.get(`${Constants.apiBaseURL}/:userId/entries`, validate(EntryValidation.readAll), EntryController.readAll);
  // GET /api/v1/users/:userId/entries/:entryId
  app.get(`${Constants.apiBaseURL}/:userId/entries/:entryId`, validate(EntryValidation.read), EntryController.read);
  // POST /api/v1/users/:userId/entries
  app.post(`${Constants.apiBaseURL}/:userId/entries`, validate(EntryValidation.create), EntryController.create);
  // PUT /api/v1/users/:userId/entries/:entryId
  app.put(`${Constants.apiBaseURL}/:userId/entries/:entryId`, validate(EntryValidation.update), EntryController.update);
}
