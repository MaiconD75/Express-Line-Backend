import { getCustomRepository } from 'typeorm';

import Delivery from '../../data/models/Delivery';
import DeliveryRepository from '../../data/repositories/DeliveryRepository';
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

    return delivery;
  }
}

export default GetDeliveryService;
