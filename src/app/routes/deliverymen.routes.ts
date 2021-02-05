import { Router } from 'express';
import multer from 'multer';

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

DeliverymenRoutes.get('/:id/deliveries', deliverymenDeliveriesController.show);
DeliverymenRoutes.patch(
  '/:deliveryman_id/deliveries/:delivery_id',
  upload.single('signature'),
  deliverymenDeliveriesController.update,
);

DeliverymenRoutes.use(ensureAuthenticated);

DeliverymenRoutes.get('/', deliverymenController.show);
DeliverymenRoutes.get('/:id', deliverymenController.index);

DeliverymenRoutes.delete('/:id', deliverymenController.delete);
DeliverymenRoutes.put('/:id', deliverymenController.update);
DeliverymenRoutes.post('/', deliverymenController.create);

DeliverymenRoutes.patch(
  '/images/:id',
  upload.single('avatar'),
  deliverymenAvatarsController.update,
);
DeliverymenRoutes.delete('/images/:id', deliverymenAvatarsController.delete);

export default DeliverymenRoutes;
