import { Router } from 'express';

import UsersController from '../controllers/usersController';
import UsersTokensController from '../controllers/usersTokenController';
import UsersPasswordsController from '../controllers/usersPasswordController';

const UsersRouter = Router();
const usersController = new UsersController();
const userTokensController = new UsersTokensController();
const usersPasswordController = new UsersPasswordsController();

UsersRouter.post('/', usersController.create);

UsersRouter.post('/forgotten-password', userTokensController.create);
UsersRouter.patch('/forgotten-password/:token', usersPasswordController.update);

export default UsersRouter;
