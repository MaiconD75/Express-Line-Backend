import { getRepository } from 'typeorm';

import Deliveryman from '../../data/models/Deliveryman';

class ListDeliverymenService {
  public async execute(id: string): Promise<Deliveryman[]> {
    const deliverymenRepository = getRepository(Deliveryman);

    const deliverymanList = await deliverymenRepository.find({
      where: { user_id: id },
    });

    return deliverymanList;
  }
}
export default ListDeliverymenService;
