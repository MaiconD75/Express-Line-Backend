import { Request, Response } from 'express';

import GetDeliverymanDeliveriesService from '../services/deliverymanDeliveries/GetDeliverymanDeliveriesService';
import UpdateDeliverymanDeliveriesService from '../services/deliverymanDeliveries/UpadateDeliverymanDeliveriesService';

class DeliverymenDeliveriesController {
  public async show(request: Request, response: Response): Promise<Response> {
    const deliverymanId = request.params.id;

    const pathArray = request.path.split('/');
    const completedDeliveries =
      pathArray[pathArray.length - 1] === 'completed-deliveries';

    const getDeliverymanDeliveriesService =
      new GetDeliverymanDeliveriesService();
    const deliveries = await getDeliverymanDeliveriesService.execute({
      deliverymanId,
      completedDeliveries,
    });

    return response.json(deliveries);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const signatureFilename = request.file?.filename;
    const { deliveryman_id, delivery_id } = request.params;

    const pathArray = request.path.split('/');
    const completOperation =
      pathArray[pathArray.length - 1] === 'complet-operation';

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
