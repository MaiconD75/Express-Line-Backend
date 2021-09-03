import { Router } from 'express';

import UsersController from '../controllers/usersController';
import UsersTokensController from '../controllers/usersTokenController';
import UsersPasswordsController from '../controllers/usersPasswordController';
import UsersConfirmEmailController from '../controllers/usersConfirmEmailController';

const UsersRouter = Router();
const usersController = new UsersController();
const userTokensController = new UsersTokensController();
const userConfirmEmailController = new UsersConfirmEmailController();
const usersPasswordController = new UsersPasswordsController();

UsersRouter.post('/', usersController.create);
UsersRouter.delete('/:id', usersController.delete);

UsersRouter.post('/forgotten-password', userTokensController.create);
UsersRouter.patch('/forgotten-password/:token', usersPasswordController.update);
UsersRouter.patch('/confirm-email/:id', userConfirmEmailController.update);

export default UsersRouter;
