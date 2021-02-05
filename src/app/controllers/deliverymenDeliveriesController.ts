import { Request, Response } from 'express';

import GetDeliverymanDeliveriesService from '../services/deliverymanDeliveries/GetDeliverymanDeliveriesService';
// import UpdateDeliverymanDeliveriesService from '../services/deliverymanDeliveries/UpadateDeliverymanDeliveriesService';

class DeliverymenDeliveriesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const deliverymanId = request.params.id;

    const { completedDeliveries } = request.body;

    const getDeliverymanService = new GetDeliverymanDeliveriesService();
    const deliveryman = await getDeliverymanService.execute({
      deliverymanId,
      completedDeliveries,
    });

    return response.json(deliveryman);
  }

  // public async update(
  //   request: Request,
  //   response: Response,
  // ): Promise<Response> {}
}

export default DeliverymenDeliveriesController;
