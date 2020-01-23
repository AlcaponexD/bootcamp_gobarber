import { Router } from 'express';

import User from './app/models/User'

import UserController from './app/controllers/User';

const routes = new Router();

routes.post('/users',UserController.store);


export default routes;