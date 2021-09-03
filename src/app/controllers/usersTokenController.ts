import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import CreateUserTokenService from '../services/usersToken/CreateUserTokenService';

class UserTokensController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const createUserTokenService = new CreateUserTokenService();
    const user = await createUserTokenService.execute(email);

    return response.status(200).json(classToClass(user));
  }
}

export default UserTokensController;
