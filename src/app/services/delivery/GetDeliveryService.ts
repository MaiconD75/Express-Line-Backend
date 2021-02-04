import { getCustomRepository } from 'typeorm';

import Delivery from '../../data/models/Delivery';
import DeliverymanRepository from '../../data/repositories/DeliverymanRepository';
import DeliveryRepository from '../../data/repositories/DeliveryRepository';
import OriginRepository from '../../data/repositories/OriginRepository';
import RecipientRepository from '../../data/repositories/RecipientRepository';
import AppError from '../../error/AppError';

interface Request {
  user_id: string;
  deliveryId: string;
}

class GetDeliveryService {
  public async execute({ user_id, deliveryId }: Request): Promise<Delivery> {
    const deliveriesRepository = getCustomRepository(DeliveryRepository);

    const delivery = await deliveriesRepository.findById(deliveryId);

    if (!delivery) {
      throw new AppError('This delivery does not exist');
    }

    if (delivery.user_id !== user_id) {
      throw new AppError(
        'You does not have permission to get this delivery',
        401,
      );
    }

    const deliverymenRepository = getCustomRepository(DeliverymanRepository);
    const originsRepository = getCustomRepository(OriginRepository);
    const recipientsRepository = getCustomRepository(RecipientRepository);

    const deliveryResponse = {
      ...delivery,
      deliveryman: await deliverymenRepository.findById(
        delivery.deliveryman_id,
      ),
      origin: await originsRepository.findById(delivery.origin_id),
      recipient: await recipientsRepository.findById(delivery.recipient_id),
    };

    return deliveryResponse;
  }
}

export default GetDeliveryService;
