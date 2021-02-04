import { Router } from 'express';
import RecipientsController from '../controllers/recipientsController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const RecipientsRoutes = Router();
const recipientsController = new RecipientsController();

RecipientsRoutes.use(ensureAuthenticated);

RecipientsRoutes.get('/', recipientsController.show);
RecipientsRoutes.get('/:id', recipientsController.index);

RecipientsRoutes.delete('/:id', recipientsController.delete);
RecipientsRoutes.put('/:id', recipientsController.update);
RecipientsRoutes.post('/', recipientsController.create);

export default RecipientsRoutes;
