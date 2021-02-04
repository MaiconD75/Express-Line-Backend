import { Router } from 'express';
import SessionsController from '../controllers/sessionsController';

const SessionsRoutes = Router();
const sessionController = new SessionsController();

SessionsRoutes.post('/', sessionController.create);
export default SessionsRoutes;
