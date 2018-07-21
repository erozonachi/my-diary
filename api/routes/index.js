/**
* @author Eneh, James Erozonachi
*
* @description Central point for all routes
*
* */
import apiRoutes from './api-routes';

// const apiRoutes = ApiRoutes();
export default function routes(app, db) {
  apiRoutes(app, db);
  // Other route groups could go here, in the future
}
