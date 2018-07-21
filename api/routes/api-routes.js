
/**
* @author Eneh, James Erozonachi
*
* @description MyDiary Application API endpoints routes
*
* */
import newUser from '../core/new-user';
import newEntry from '../core/new-entry';
import getAllEntries from '../core/all-entries';
import getSingleEntry from '../core/single-entry';
import modifyEntry from '../core/modify-entry';

export default function apiRoutes(app, diary) {
  const route = '/api/v1/users';
  // GET /api/v1/users/:userId/entries
  app.get(`${route}/:userId/entries`, (req, res) => {
    const { userId } = req.params;
    const result = getAllEntries(userId, diary);
    res.status(result.statusCode).send(result.data);
  });
  // GET /api/v1/users/:userId/entries/:entryId
  app.get(`${route}/:userId/entries/:entryId`, (req, res) => {
    const { userId, entryId } = req.params;
    const result = getSingleEntry(userId, entryId, diary);
    res.status(result.statusCode).send(result.data);
  });
  // POST /api/v1/users
  app.post(`${route}`, (req, res) => {
    const result = newUser(req.body, diary);
    res.status(result.statusCode).send(result.data);
  });
  // POST /api/v1/users/:userId/entries
  app.post(`${route}/:userId/entries`, (req, res) => {
    const { userId } = req.params;
    const result = newEntry(userId, req.body, diary);
    res.status(result.statusCode).send(result.data);
  });
  // PUT /api/v1/users/:userId/entries/:entryId
  app.put(`${route}/:userId/entries/:entryId`, (req, res) => {
    const { userId, entryId } = req.params;
    const result = modifyEntry(userId, entryId, req.body, diary);
    res.status(result.statusCode).send(result.data);
  });
}
