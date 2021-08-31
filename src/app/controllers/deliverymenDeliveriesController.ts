import { Request, Response } from 'express';

import GetDeliverymanDeliveriesService from '../services/deliverymanDeliveries/GetDeliverymanDeliveriesService';
import UpdateDeliverymanDeliveriesService from '../services/deliverymanDeliveries/UpadateDeliverymanDeliveriesService';

class DeliverymenDeliveriesController {
  public async show(request: Request, response: Response): Promise<Response> {
    const deliverymanId = request.params.id;

    const { completedDeliveries } = request.body;

    const getDeliverymanService = new GetDeliverymanDeliveriesService();
    const deliveryman = await getDeliverymanService.execute({
      deliverymanId,
      completedDeliveries,
    });

    return response.json(deliveryman);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const signatureFilename = request.file?.filename;
    const { deliveryman_id, delivery_id } = request.params;
    const { completOperation } = request.body;

    const updateDeliverymanDeliveriesService =
      new UpdateDeliverymanDeliveriesService();
    const delivery = await updateDeliverymanDeliveriesService.execute({
      completOperation,
      deliveryman_id,
      delivery_id,
      signatureFilename,
    });

    return response.json(delivery);
  }
}

export default DeliverymenDeliveriesController;
