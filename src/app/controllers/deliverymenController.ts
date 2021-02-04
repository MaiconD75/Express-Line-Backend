import { Request, Response } from 'express';

import CreateDeliverymanService from '../services/deliveryman/CreateDeliverymanService';
import DeleteDeliverymanService from '../services/deliveryman/DeleteDeliverymanService';
import GetDeliverymanService from '../services/deliveryman/GetDeliverymanService';
import ListDeliverymenService from '../services/deliveryman/ListDeliverymenService';
import UpdateDeliverymanService from '../services/deliveryman/UpadateDeliverymanService';

class DeliverymenController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    const user_id = request.user.id;

    const createDeliverymanService = new CreateDeliverymanService();
    const deliveryman = await createDeliverymanService.execute({
      user_id,
      name,
      email,
    });

    return response.json(deliveryman);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const deliverymanId = request.params.id;

    const deleteDeliverymanService = new DeleteDeliverymanService();
    await deleteDeliverymanService.execute({ user_id, deliverymanId });

    return response.json({ deleted: true });
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const deliverymanId = request.params.id;

    const getDeliverymanService = new GetDeliverymanService();
    const deliveryman = await getDeliverymanService.execute({
      user_id,
      deliverymanId,
    });

    return response.json(deliveryman);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const listDeliverymenService = new ListDeliverymenService();
    const deliverymenList = await listDeliverymenService.execute(id);

    return response.json(deliverymenList);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const deliverymanId = request.params.id;
    const { name, email } = request.body;

    const updateDeliverymanService = new UpdateDeliverymanService();
    const deliveryman = await updateDeliverymanService.execute({
      user_id,
      deliverymanId,
      name,
      email,
    });

    return response.json(deliveryman);
  }
}

export default DeliverymenController;
