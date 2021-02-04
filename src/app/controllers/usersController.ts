import { Request, Response } from 'express';
import CreateUserService from '../services/user/CreateUserService';

class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password, name } = request.body;

    const createUserService = new CreateUserService();
    const user = await createUserService.execute({ email, password, name });

    return response.status(200).json(user);
  }
}

export default UsersController;
