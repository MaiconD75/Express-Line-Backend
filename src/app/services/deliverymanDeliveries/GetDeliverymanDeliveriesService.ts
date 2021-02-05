import { getCustomRepository } from 'typeorm';

import Deliveryman from '../../data/models/Deliveryman';
import DeliverymanRepository from '../../data/repositories/DeliverymanRepository';
import DeliveryRepository from '../../data/repositories/DeliveryRepository';

interface Request {
  deliverymanId: string;
  completedDeliveries: false;
}

class GetDeliverymanDeliveriesService {
  public async execute({
    deliverymanId,
    completedDeliveries,
  }: Request): Promise<Deliveryman> {
    const deliverymenRepository = getCustomRepository(DeliverymanRepository);

    const deliveryman = await deliverymenRepository.findById(deliverymanId);

    const deliveriesRepository = getCustomRepository(DeliveryRepository);
    const deliveries = await deliveriesRepository.findByDeliveryman(
      deliverymanId,
      completedDeliveries,
    );

    const deliverymanResponse = {
      ...deliveryman,
      deliveries,
    };

    return deliverymanResponse;
  }
}

export default GetDeliverymanDeliveriesService;
