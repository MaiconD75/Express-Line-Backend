import { Request, Response } from 'express';
import UpdateUserConfirmEmailService from '../services/usersConfirmEmail/UpdateUserConfirmEmailService';

class usersConfirmEmailController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const updateUserConfirmEmailService = new UpdateUserConfirmEmailService();
    await updateUserConfirmEmailService.execute(id);

    return response.json({ deleted: true });
  }
}

export default usersConfirmEmailController;
