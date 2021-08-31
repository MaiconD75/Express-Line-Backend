import { classToClass } from 'class-transformer';
import { getRepository } from 'typeorm';
import RedisCache from '../../../lib/Redis';

import Delivery from '../../data/models/Delivery';

class ListDeliveriesService {
  public async execute(id: string): Promise<Delivery[]> {
    const cache = new RedisCache();
    const deliveriesRepository = getRepository(Delivery);

    let deliveriesList = await cache.recover<Delivery[]>(
      `deliveries-list:${id}`,
    );

    if (!deliveriesList) {
      deliveriesList = await deliveriesRepository.find({
        where: { user_id: id },
        relations: ['deliveryman', 'origin', 'recipient'],
        order: {
          created_at: 'ASC',
        },
      });

      await cache.save(`deliveries-list:${id}`, classToClass(deliveriesList));
    }

    return deliveriesList;
  }
}
export default ListDeliveriesService;
