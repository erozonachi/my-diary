
/**
* @author Eneh, James Erozonachi
*
* @description MyDiary Application API endpoints routes
*
* */
import newEntry from '../core/new-entry';

export default function apiRoutes(app, diary) {
  const urlPrefix = '/api/v1/';
  app.post(`${urlPrefix}entries`, (req, res) => {
    // POST /api/v1/entries
    const result = newEntry(req.body, diary);

    console.log(...diary);
    res.status(result.statusCode).send(result.data);
  });
}
