import { getRepository } from 'typeorm';
import RedisCache from '../../../lib/Redis';

import Deliveryman from '../../data/models/Deliveryman';

class ListDeliverymenService {
  public async execute(id: string): Promise<Deliveryman[]> {
    const cache = new RedisCache();
    const deliverymenRepository = getRepository(Deliveryman);

    let deliverymenList = await cache.recover<Deliveryman[]>(
      `deliverymen-list:${id}`,
    );

    if (!deliverymenList) {
      deliverymenList = await deliverymenRepository.find({
        where: { user_id: id },
      });

      await cache.save(`deliverymen-list:${id}`, deliverymenList);
    }

    return deliverymenList;
  }
}
export default ListDeliverymenService;
