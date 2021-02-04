import { Router } from 'express';

import DeliverymenRouter from './deliverymen.routes';
import OriginsRouter from './origins.routes';
import RecipientsRouter from './recipients.routes';
import SessionsRouter from './sessions.routes';
import UsersRouter from './users.routes';

const routes = Router();

routes.use('/deliverymen', DeliverymenRouter);
routes.use('/origins', OriginsRouter);
routes.use('/recipients', RecipientsRouter);
routes.use('/sessions', SessionsRouter);
routes.use('/users', UsersRouter);

export default routes;
