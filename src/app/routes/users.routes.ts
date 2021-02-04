import { Router } from 'express';

import UsersController from '../controllers/usersController';

const UsersRouter = Router();
const usersController = new UsersController();

UsersRouter.post('/', usersController.create);

export default UsersRouter;
