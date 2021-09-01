import { getCustomRepository } from 'typeorm';
import Delivery from '../../data/models/Delivery';

import DeliveryRepository from '../../data/repositories/DeliveryRepository';

interface Request {
  deliverymanId: string;
  completedDeliveries: boolean;
}

class GetDeliverymanDeliveriesService {
  public async execute({
    deliverymanId,
    completedDeliveries,
  }: Request): Promise<Delivery[]> {
    const deliveriesRepository = getCustomRepository(DeliveryRepository);

    const deliveries = await deliveriesRepository.findByDeliveryman(
      deliverymanId,
      completedDeliveries,
    );

    return deliveries;
  }
}

export default GetDeliverymanDeliveriesService;
