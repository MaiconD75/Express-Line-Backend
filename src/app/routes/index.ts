import { Router } from 'express';

import UsersRouter from './users.routes';
import DeliverymenRouter from './deliverymen.routes';
import RecipientsRouter from './recipients.routes';
import SessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/users', UsersRouter);
routes.use('/deliverymen', DeliverymenRouter);
routes.use('/recipients', RecipientsRouter);
routes.use('/sessions', SessionsRouter);

export default routes;
