import { getRepository } from 'typeorm';

import Delivery from '../../data/models/Delivery';

class ListDeliveriesService {
  public async execute(id: string): Promise<Delivery[]> {
    const deliveriesRepository = getRepository(Delivery);

    const deliveriesList = await deliveriesRepository.find({
      where: { user_id: id },
    });

    return deliveriesList;
  }
}
export default ListDeliveriesService;
