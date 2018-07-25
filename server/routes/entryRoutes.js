
/**
* @author Eneh, James Erozonachi
*
* @description MyDiary Application API endpoints routes
*
* */
import newEntry from '../controllers/entries/newEntry';
import fetchAllEntries from '../controllers/entries/fetchAllEntries';
import fetchSingleEntry from '../controllers/entries/fetchSingleEntry';
import modifyEntry from '../controllers/entries/modifyEntry';

export default function userRoutes(app, diary) {
  const route = '/api/v1/users';
  // GET /api/v1/users/:userId/entries
  app.get(`${route}/:userId/entries`, (req, res) => {
    const { userId } = req.params;
    const result = fetchAllEntries(userId, diary);
    res.status(result.statusCode).send(result.data);
  });
  // GET /api/v1/users/:userId/entries/:entryId
  app.get(`${route}/:userId/entries/:entryId`, (req, res) => {
    const { userId, entryId } = req.params;
    const result = fetchSingleEntry(userId, entryId, diary);
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
