import { classToClass } from 'class-transformer';
import { getCustomRepository } from 'typeorm';
import RedisCache from '../../../lib/Redis';
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
    const cache = new RedisCache();
    const deliveriesRepository = getCustomRepository(DeliveryRepository);

    const cacheInfix = completedDeliveries ? 'completed' : 'pending';

    let deliveries = await cache.recover<Delivery[]>(
      `deliveryman-${cacheInfix}-deliveries-list:${deliverymanId}`,
    );

    if (!deliveries) {
      deliveries = await deliveriesRepository.findByDeliveryman(
        deliverymanId,
        completedDeliveries,
      );

      await cache.save(
        `deliveryman-${cacheInfix}-deliveries-list:${deliverymanId}`,
        classToClass(deliveries),
      );
    }

    return deliveries;
  }
}

export default GetDeliverymanDeliveriesService;
