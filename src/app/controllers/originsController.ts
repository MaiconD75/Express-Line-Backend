import { Request, Response } from 'express';

import CreateOriginService from '../services/origin/CreateOriginService';
import DeleteOriginService from '../services/origin/DeleteOriginService';
import GetOriginService from '../services/origin/GetOriginService';
import ListOriginsService from '../services/origin/ListOriginsService';
import UpdateOriginService from '../services/origin/UpdateOriginService';

class OriginsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { street, number, complement, city, state, zip_code } = request.body;
    const user_id = request.user.id;

    const createOriginService = new CreateOriginService();
    const origin = await createOriginService.execute({
      user_id,
      street,
      number,
      complement,
      city,
      state,
      zip_code,
    });

    return response.status(200).json(origin);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const originId = request.params.id;
    const user_id = request.user.id;

    const deleteOriginService = new DeleteOriginService();
    await deleteOriginService.execute({ originId, user_id });

    return response.json({ deleted: true });
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const originId = request.params.id;
    const user_id = request.user.id;

    const getOriginService = new GetOriginService();
    const origin = await getOriginService.execute({ originId, user_id });

    return response.json(origin);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const listOriginsService = new ListOriginsService();
    const originsList = await listOriginsService.execute(id);

    return response.json(originsList);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const originId = request.params.id;
    const user_id = request.user.id;
    const { street, number, complement, city, state, zip_code } = request.body;

    const updateOriginService = new UpdateOriginService();
    const origin = await updateOriginService.execute({
      originId,
      user_id,
      street,
      number,
      complement,
      city,
      state,
      zip_code,
    });

    return response.json(origin);
  }
}

export default OriginsController;
