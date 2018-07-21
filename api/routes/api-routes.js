
/**
* @author Eneh, James Erozonachi
*
* @description MyDiary Application API endpoints routes
*
* */
import newEntry from '../core/new-entry';
import getAllEntries from '../core/all-entries';
import getSingleEntry from '../core/single-entry';
import modifyEntry from '../core/modify-entry';

export default function apiRoutes(app, diary) {
  const route = '/api/v1/entries';
  // GET /api/v1/entries
  app.get(`${route}`, (req, res) => {
    const result = getAllEntries(diary);
    res.status(result.statusCode).send(result.data);
  });
  // GET /api/v1/entries/:entryId
  app.get(`${route}/:entryId`, (req, res) => {
    const { entryId } = req.params;
    const result = getSingleEntry(entryId, diary);
    res.status(result.statusCode).send(result.data);
  });
  app.post(`${route}`, (req, res) => {
    // POST /api/v1/entries
    const result = newEntry(req.body, diary);
    res.status(result.statusCode).send(result.data);
  });
  // PUT /api/v1/entries/:entryId
  app.put(`${route}/:entryId`, (req, res) => {
    const { entryId } = req.params;
    const result = modifyEntry(entryId, req.body, diary);
    res.status(result.statusCode).send(result.data);
  });
}
