
/**
* @author Eneh, James Erozonachi
*
* @description MyDiary Application API endpoints routes
*
* */
import newUser from '../controllers/users/newUser';

export default function userRoutes(app, diary) {
  const route = '/api/v1/users';
  // POST /api/v1/users
  app.post(`${route}`, (req, res) => {
    const result = newUser(req.body, diary);
    res.status(result.statusCode).send(result.data);
  });
}
