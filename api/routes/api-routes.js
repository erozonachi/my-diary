
/**
* @author Eneh, James Erozonachi
*
* @description MyDiary Application API endpoints routes
*
* */
import newEntry from '../core/new-entry';
import getAllEntries from '../core/all-entries';

export default function apiRoutes(app, diary) {
  const urlPrefix = '/api/v1/';
  app.get(`${urlPrefix}entries`, (req, res) => {
    // GET /api/v1/entries
    const result = getAllEntries(diary);
    res.status(result.statusCode).send(result.data);
  });
  app.post(`${urlPrefix}entries`, (req, res) => {
    // POST /api/v1/entries
    const result = newEntry(req.body, diary);
    res.status(result.statusCode).send(result.data);
  });
}
