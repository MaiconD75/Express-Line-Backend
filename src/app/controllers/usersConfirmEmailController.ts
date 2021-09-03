import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import UpdateUserConfirmEmailService from '../services/usersConfirmEmail/UpdateUserConfirmEmailService';

class usersConfirmEmailController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const updateUserConfirmEmailService = new UpdateUserConfirmEmailService();
    const user = await updateUserConfirmEmailService.execute(id);

    return response.status(200).json(classToClass(user));
  }
}

export default usersConfirmEmailController;
