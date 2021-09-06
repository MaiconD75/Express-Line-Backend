import { Router } from 'express';
import multer from 'multer';

import { celebrate, Joi, Segments } from 'celebrate';
import DeliverymenController from '../controllers/deliverymenController';
import DeliverymenAvatarsController from '../controllers/deliverymenAvatarsController';
import DeliverymenDeliveriesController from '../controllers/deliverymenDeliveriesController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '../../config/upload';

const DeliverymenRoutes = Router();
const deliverymenController = new DeliverymenController();
const deliverymenAvatarsController = new DeliverymenAvatarsController();
const deliverymenDeliveriesController = new DeliverymenDeliveriesController();

const upload = multer(uploadConfig);

DeliverymenRoutes.get(
  '/:id/deliveries(/completed-deliveries)?',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required().uuid(),
    },
  }),

  deliverymenDeliveriesController.show,
);
DeliverymenRoutes.patch(
  '/:deliveryman_id/deliveries/:delivery_id/update(/complet-operation)?',
  celebrate({
    [Segments.PARAMS]: {
      deliveryman_id: Joi.string().required().uuid(),
      delivery_id: Joi.string().required().uuid(),
    },
  }),

  upload.single('signature'),
  deliverymenDeliveriesController.update,
);

DeliverymenRoutes.use(ensureAuthenticated);

DeliverymenRoutes.get('/', deliverymenController.show);
DeliverymenRoutes.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required().uuid(),
    },
  }),
  deliverymenController.index,
);

DeliverymenRoutes.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required().uuid(),
    },
  }),
  deliverymenController.delete,
);
DeliverymenRoutes.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required().uuid(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required().email(),
    },
  }),
  deliverymenController.update,
);
DeliverymenRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required().email(),
    },
  }),
  deliverymenController.create,
);

DeliverymenRoutes.patch(
  '/images/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required().uuid(),
    },
  }),
  upload.single('avatar'),
  deliverymenAvatarsController.update,
);
DeliverymenRoutes.delete(
  '/images/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required().uuid(),
    },
  }),
  deliverymenAvatarsController.delete,
);

export default DeliverymenRoutes;
