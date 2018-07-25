/**
* @author Eneh, James Erozonachi
*
* @description Central point for all routes
*
* */
import userRoutes from './userRoutes';
import entryRoutes from './entryRoutes';

// const apiRoutes = ApiRoutes();
export default function routes(app, db) {
  // routes to user resources
  userRoutes(app, db);
  // routes to entry resources
  entryRoutes(app, db);
}
