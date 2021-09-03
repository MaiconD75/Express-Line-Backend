import { Request, Response } from 'express';
import CreateUserService from '../services/user/CreateUserService';
import DeleteUserService from '../services/user/DeleteUserService';

class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password, name } = request.body;

    const createUserService = new CreateUserService();
    const user = await createUserService.execute({ email, password, name });

    return response.status(200).json(user);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteUserService = new DeleteUserService();
    const user = await deleteUserService.execute(id);

    return response.status(200).json(user);
  }
}

export default UsersController;
