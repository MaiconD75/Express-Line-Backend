import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import DeliveriesController from '../controllers/deliveriesController';
import DeliveryProblemsController from '../controllers/deliveryProblemsController';

const DeliveriesRoutes = Router();
const deliveriesController = new DeliveriesController();
const deliveryProblemsController = new DeliveryProblemsController();

DeliveriesRoutes.post('/:id/problems', deliveryProblemsController.create);
// DeliveriesRoutes.get('/:id/problems/', deliveryProblemsController.index);

DeliveriesRoutes.use(ensureAuthenticated);

DeliveriesRoutes.get('/problems', deliveryProblemsController.show);
DeliveriesRoutes.get('/', deliveriesController.show);
DeliveriesRoutes.get('/:id', deliveriesController.index);

DeliveriesRoutes.delete('/:id', deliveriesController.delete);
DeliveriesRoutes.put('/:id', deliveriesController.update);
DeliveriesRoutes.post('/', deliveriesController.create);

// DeliveriesRoutes.patch('/:id', deliveryProblemsController.update);

export default DeliveriesRoutes;
