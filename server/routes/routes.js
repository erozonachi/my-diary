/**
* @author Eneh, James Erozonachi
*
* @description Central point for all routes
*
* */
// import userRoutes from './userRoutes';
import authRoutes from './authRoutes';
import entryRoutes from './entryRoutes';

// const apiRoutes = ApiRoutes();
export default function routes(app, validate) {
  // routes to user resources
  //userRoutes(app, validate);
  // routtes to authentication
  authRoutes(app, validate);
  // routes to entry resources
  entryRoutes(app, validate);
}
