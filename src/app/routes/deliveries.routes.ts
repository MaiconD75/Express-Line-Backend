import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import DeliveriesController from '../controllers/deliveriesController';
import DeliveryProblemsController from '../controllers/deliveryProblemsController';

const DeliveriesRoutes = Router();
const deliveriesController = new DeliveriesController();
const deliveryProblemsController = new DeliveryProblemsController();

DeliveriesRoutes.post(
  '/:id/problems',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required().uuid(),
    },
    [Segments.BODY]: {
      description: Joi.string().required(),
      deliveryman_id: Joi.string().required().uuid(),
    },
  }),
  deliveryProblemsController.create,
);
DeliveriesRoutes.get(
  '/:id/problems/',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required().uuid(),
    },
  }),
  deliveryProblemsController.index,
);

DeliveriesRoutes.use(ensureAuthenticated);

DeliveriesRoutes.get('/problems', deliveryProblemsController.show);

DeliveriesRoutes.get('/', deliveriesController.show);
DeliveriesRoutes.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required().uuid(),
    },
  }),
  deliveriesController.index,
);

DeliveriesRoutes.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required().uuid(),
    },
  }),
  deliveriesController.delete,
);
DeliveriesRoutes.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required().uuid(),
    },
    [Segments.BODY]: {
      product: Joi.string().required(),
      deliveryman_id: Joi.string().required().uuid(),
      recipient_id: Joi.string().required().uuid(),
      origin_id: Joi.string().required().uuid(),
    },
  }),
  deliveriesController.update,
);
DeliveriesRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      product: Joi.string().required(),
      deliveryman_id: Joi.string().required().uuid(),
      recipient_id: Joi.string().required().uuid(),
      origin_id: Joi.string().required().uuid(),
    },
  }),
  deliveriesController.create,
);

DeliveriesRoutes.delete(
  '/problem/:id/cancel-delivery',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required().uuid(),
    },
  }),
  deliveryProblemsController.delete,
);

export default DeliveriesRoutes;
