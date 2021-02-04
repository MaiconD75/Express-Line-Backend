import { getRepository } from 'typeorm';

import Deliveryman from '../../data/models/Deliveryman';

class ListDeliverymenService {
  public async execute(id: string): Promise<Deliveryman[]> {
    const deliverymanRepository = getRepository(Deliveryman);

    const deliverymanList = await deliverymanRepository.find({
      where: { user_id: id },
    });

    return deliverymanList;
  }
}
export default ListDeliverymenService;
