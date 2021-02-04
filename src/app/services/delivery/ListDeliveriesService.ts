import { getCustomRepository, getRepository } from 'typeorm';

import Delivery from '../../data/models/Delivery';
import DeliverymanRepository from '../../data/repositories/DeliverymanRepository';
import OriginRepository from '../../data/repositories/OriginRepository';
import RecipientRepository from '../../data/repositories/RecipientRepository';

class ListDeliveriesService {
  public async execute(id: string): Promise<Delivery[]> {
    const deliveriesRepository = getRepository(Delivery);

    const deliveriesList = await deliveriesRepository.find({
      where: { user_id: id },
    });

    const deliverymenRepository = getCustomRepository(DeliverymanRepository);
    const originsRepository = getCustomRepository(OriginRepository);
    const recipientsRepository = getCustomRepository(RecipientRepository);

    const deliveriesResponse = await Promise.all(
      deliveriesList.map(async delivery => ({
        ...delivery,
        deliveryman: await deliverymenRepository.findById(
          delivery.deliveryman_id,
        ),
        origin: await originsRepository.findById(delivery.origin_id),
        recipient: await recipientsRepository.findById(delivery.recipient_id),
      })),
    );

    return deliveriesResponse;
  }
}
export default ListDeliveriesService;
