import { getCustomRepository } from 'typeorm';

import Deliveryman from '../../data/models/Deliveryman';
import DeliverymanRepository from '../../data/repositories/DeliverymanRepository';
import AppError from '../../error/AppError';

interface Request {
  user_id: string;
  deliverymanId: string;
}
class GetDeliverymanService {
  public async execute({
    user_id,
    deliverymanId,
  }: Request): Promise<Deliveryman> {
    const deliverymenRepository = getCustomRepository(DeliverymanRepository);

    const deliveryman = await deliverymenRepository.findById(deliverymanId);

    if (deliveryman.user_id !== user_id) {
      throw new AppError(
        'You does not have permission to get this deliveryman',
        401,
      );
    }

    return deliveryman;
  }
}

export default GetDeliverymanService;
