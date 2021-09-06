import { Router } from 'express';

import { celebrate, Joi, Segments } from 'celebrate';
import UsersController from '../controllers/usersController';
import UsersTokensController from '../controllers/usersTokenController';
import UsersPasswordsController from '../controllers/usersPasswordController';
import UsersConfirmEmailController from '../controllers/usersConfirmEmailController';

const UsersRouter = Router();
const usersController = new UsersController();
const userTokensController = new UsersTokensController();
const userConfirmEmailController = new UsersConfirmEmailController();
const usersPasswordController = new UsersPasswordsController();

UsersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);
UsersRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required().uuid(),
    },
  }),
  usersController.delete,
);

UsersRouter.post(
  '/forgotten-password',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required().email(),
    },
  }),
  userTokensController.create,
);
UsersRouter.patch(
  '/forgotten-password/:token',
  celebrate({
    [Segments.PARAMS]: {
      token: Joi.string().required().uuid(),
    },
    [Segments.BODY]: {
      password: Joi.string().required(),
    },
  }),
  usersPasswordController.update,
);
UsersRouter.patch(
  '/confirm-email/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required().uuid(),
    },
  }),
  userConfirmEmailController.update,
);

export default UsersRouter;
