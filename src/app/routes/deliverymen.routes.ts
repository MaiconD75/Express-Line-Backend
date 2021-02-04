import { Router } from 'express';
import multer from 'multer';

import DeliverymenController from '../controllers/deliverymenController';
import DeliverymenAvatarsController from '../controllers/deliverymenAvatarsController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '../../config/upload';

const DeliverymenRoutes = Router();
const deliverymenController = new DeliverymenController();
const deliverymenAvatarsController = new DeliverymenAvatarsController();

const upload = multer(uploadConfig);

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
