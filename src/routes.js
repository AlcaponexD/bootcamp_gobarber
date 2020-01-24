import { Router } from 'express';

import User from './app/models/User'
import UserController from './app/controllers/User';
import SessionController from './app/controllers/Session';

const routes = new Router();

routes.post('/users',UserController.store);
routes.post('/sessions',SessionController.store);

export default routes;