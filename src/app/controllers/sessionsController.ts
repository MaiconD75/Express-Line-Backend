import { Request, Response } from 'express';
import CreateSessionService from '../services/session/CreateSessionService';

class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSessionService = new CreateSessionService();
    const session = await createSessionService.execute({ email, password });

    return response.json(session);
  }
}

export default SessionsController;
