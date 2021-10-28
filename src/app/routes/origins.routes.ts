import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import OriginsController from '../controllers/originsController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const OriginsRoutes = Router();
const originsController = new OriginsController();

OriginsRoutes.use(ensureAuthenticated);

OriginsRoutes.get('/', originsController.show);
OriginsRoutes.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required().uuid(),
    },
  }),
  originsController.index,
);

OriginsRoutes.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required().uuid(),
    },
  }),
  originsController.delete,
);
OriginsRoutes.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required().uuid(),
    },
    [Segments.BODY]: {
      street: Joi.string().required(),
      number: Joi.number().required(),
      complement: Joi.string().allow(null, ''),
      city: Joi.string().required(),
      state: Joi.string().required(),
      zip_code: Joi.number().required(),
    },
  }),
  originsController.update,
);
OriginsRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      street: Joi.string().required(),
      number: Joi.number().required(),
      complement: Joi.string().allow(null, ''),
      city: Joi.string().required(),
      state: Joi.string().required(),
      zip_code: Joi.number().required(),
    },
  }),
  originsController.create,
);

export default OriginsRoutes;
