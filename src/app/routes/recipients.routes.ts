import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import RecipientsController from '../controllers/recipientsController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const RecipientsRoutes = Router();
const recipientsController = new RecipientsController();

RecipientsRoutes.use(ensureAuthenticated);

RecipientsRoutes.get('/', recipientsController.show);
RecipientsRoutes.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required().uuid(),
    },
  }),
  recipientsController.index,
);

RecipientsRoutes.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required().uuid(),
    },
  }),
  recipientsController.delete,
);
RecipientsRoutes.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required().uuid(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      street: Joi.string().required(),
      number: Joi.number().required(),
      complement: Joi.string(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      zip_code: Joi.number().required(),
    },
  }),
  recipientsController.update,
);
RecipientsRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      street: Joi.string().required(),
      number: Joi.number().required(),
      complement: Joi.string(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      zip_code: Joi.number().required(),
    },
  }),
  recipientsController.create,
);

export default RecipientsRoutes;
