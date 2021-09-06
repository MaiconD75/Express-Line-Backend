import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import SessionsController from '../controllers/sessionsController';

const SessionsRoutes = Router();
const sessionController = new SessionsController();

SessionsRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    },
  }),
  sessionController.create,
);
export default SessionsRoutes;
