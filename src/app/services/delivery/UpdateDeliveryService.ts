import { getCustomRepository } from 'typeorm';

import DeliverymanRepository from '../../data/repositories/DeliverymanRepository';
import DeliveryRepository from '../../data/repositories/DeliveryRepository';
import OriginRepository from '../../data/repositories/OriginRepository';
import RecipientRepository from '../../data/repositories/RecipientRepository';

import Delivery from '../../data/models/Delivery';
import AppError from '../../error/AppError';

interface Request {
  user_id: string;
  deliveryId: string;
  deliveryman_id?: string;
  origin_id?: string;
  recipient_id?: string;
  product?: string;
}
class UpdateDeliveryService {
  public async execute({
    user_id,
    deliveryId,
    deliveryman_id,
    origin_id,
    recipient_id,
    product,
  }: Request): Promise<Delivery> {
    const deliveriesRepository = getCustomRepository(DeliveryRepository);

    const delivery = await deliveriesRepository.findById(deliveryId);

    if (delivery.user_id !== user_id) {
      throw new AppError(
        'You does not have permission to update this delivery',
        401,
      );
    }

    const deliverymenRepository = getCustomRepository(DeliverymanRepository);
    const deliveryman = await deliverymenRepository.findById(
      deliveryman_id || delivery.deliveryman_id,
    );

    if (deliveryman.user_id !== user_id) {
      throw new AppError('You does not have this deliveryman');
    }

    const originsRepository = getCustomRepository(OriginRepository);
    const origin = await originsRepository.findById(
      origin_id || delivery.origin_id,
    );

    if (origin.user_id !== user_id) {
      throw new AppError('You does not have this origin');
    }

    const recipientsRepository = getCustomRepository(RecipientRepository);
    const recipient = await recipientsRepository.findById(
      recipient_id || delivery.recipient_id,
    );

    if (recipient.user_id !== user_id) {
      throw new AppError('You does not have this recipient');
    }

    delivery.deliveryman = deliveryman;
    delivery.origin = origin;
    delivery.recipient = recipient;
    delivery.product = product || delivery.product;

    await deliveriesRepository.save(delivery);

    return delivery;
  }
}

export default UpdateDeliveryService;
