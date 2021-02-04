import { Router } from 'express';
import DeliveriesController from '../controllers/deliveriesController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const DeliveriesRoutes = Router();
const deliveriesController = new DeliveriesController();

DeliveriesRoutes.use(ensureAuthenticated);

DeliveriesRoutes.get('/', deliveriesController.show);
DeliveriesRoutes.get('/:id', deliveriesController.index);

DeliveriesRoutes.delete('/:id', deliveriesController.delete);
DeliveriesRoutes.put('/:id', deliveriesController.update);
DeliveriesRoutes.post('/', deliveriesController.create);

export default DeliveriesRoutes;
