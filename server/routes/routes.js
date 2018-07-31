/**
* @author Eneh, James Erozonachi
*
* @description Central point for all routes
*
* */
// import userRoutes from './userRoutes';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import entryRoutes from './entryRoutes';

// const apiRoutes = ApiRoutes();
export default function routes(app) {
  // routes to authentication
  authRoutes(app);
  // routes to user resources
  userRoutes(app);
  // routes to entry resources
  entryRoutes(app);
}
