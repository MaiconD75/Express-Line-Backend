import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import UpdateUserPasswordService from '../services/usersPassword/UpdateUserPasswordService';

class UsersPasswordController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { token } = request.params;
    const { password } = request.body;

    const updateUserPasswordService = new UpdateUserPasswordService();
    const user = await updateUserPasswordService.execute({ token, password });

    return response.status(200).json(classToClass(user));
  }
}

export default UsersPasswordController;
