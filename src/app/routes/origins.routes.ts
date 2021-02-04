import { Router } from 'express';
import OriginsController from '../controllers/originsController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const OriginsRoutes = Router();
const originsController = new OriginsController();

OriginsRoutes.use(ensureAuthenticated);

OriginsRoutes.get('/', originsController.show);
OriginsRoutes.get('/:id', originsController.index);

OriginsRoutes.delete('/:id', originsController.delete);
OriginsRoutes.put('/:id', originsController.update);
OriginsRoutes.post('/', originsController.create);

export default OriginsRoutes;
