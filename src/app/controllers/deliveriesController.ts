import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';

import CreateDeliveryService from '../services/delivery/CreateDeliveryService';
import DeleteDeliveryService from '../services/delivery/DeleteDeliveryService';
import GetDeliveryService from '../services/delivery/GetDeliveryService';
import ListDeliveriesService from '../services/delivery/ListDeliveriesService';
import UpdateDeliveryService from '../services/delivery/UpdateDeliveryService';

class DeliveriesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { deliveryman_id, origin_id, recipient_id, product } = request.body;
    const user_id = request.user.id;

    const createDeliveryService = new CreateDeliveryService();
    const delivery = await createDeliveryService.execute({
      user_id,
      deliveryman_id,
      origin_id,
      recipient_id,
      product,
    });

    return response.status(200).json(classToClass(delivery));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deliveryId = request.params.id;
    const user_id = request.user.id;

    const deleteDeliveryService = new DeleteDeliveryService();
    await deleteDeliveryService.execute({ deliveryId, user_id });

    return response.json({ deleted: true });
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const deliveryId = request.params.id;
    const user_id = request.user.id;

    const getDeliveryService = new GetDeliveryService();
    const delivery = await getDeliveryService.execute({ deliveryId, user_id });

    return response.status(200).json(classToClass(delivery));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const listDeliveriesService = new ListDeliveriesService();
    const deliveriesList = await listDeliveriesService.execute(id);

    return response.json(classToClass(deliveriesList));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const deliveryId = request.params.id;
    const { deliveryman_id, origin_id, recipient_id, product } = request.body;

    const updateDeliveryService = new UpdateDeliveryService();
    const delivery = await updateDeliveryService.execute({
      user_id,
      deliveryId,
      deliveryman_id,
      origin_id,
      recipient_id,
      product,
    });

    return response.json(classToClass(delivery));
  }
}

export default DeliveriesController;
