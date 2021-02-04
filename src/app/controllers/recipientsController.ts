import { Request, Response } from 'express';

import CreateRecipientService from '../services/recipient/CreateRecipientService';
import DeleteRecipientService from '../services/recipient/DeleteRecipientService';
import GetRecipientService from '../services/recipient/GetRecipientService';
import ListRecipientsService from '../services/recipient/ListRecipientsService';
import UpdateRecipientService from '../services/recipient/UpdateRecipientService';

class RecipientsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      street,
      number,
      complement,
      city,
      state,
      zip_code,
    } = request.body;
    const user_id = request.user.id;

    const createRecipientService = new CreateRecipientService();
    const recipient = await createRecipientService.execute({
      user_id,
      name,
      street,
      number,
      complement,
      city,
      state,
      zip_code,
    });

    return response.status(200).json(recipient);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const recipientId = request.params.id;
    const user_id = request.user.id;

    const deleteRecipientService = new DeleteRecipientService();
    await deleteRecipientService.execute({ recipientId, user_id });

    return response.json({ deleted: true });
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const recipientId = request.params.id;
    const user_id = request.user.id;

    const getRecipientService = new GetRecipientService();
    const recipient = await getRecipientService.execute({
      recipientId,
      user_id,
    });

    return response.json(recipient);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const listRecipientsService = new ListRecipientsService();
    const recipientsList = await listRecipientsService.execute(id);

    return response.json(recipientsList);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const recipientId = request.params.id;
    const user_id = request.user.id;
    const {
      name,
      street,
      number,
      complement,
      city,
      state,
      zip_code,
    } = request.body;

    const updateRecipientService = new UpdateRecipientService();
    const recipient = await updateRecipientService.execute({
      recipientId,
      user_id,
      name,
      street,
      number,
      complement,
      city,
      state,
      zip_code,
    });

    return response.json(recipient);
  }
}

export default RecipientsController;
