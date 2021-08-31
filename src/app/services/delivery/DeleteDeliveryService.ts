import { getCustomRepository } from 'typeorm';
import uploadConfig from '../../../config/upload';
import RedisCache from '../../../lib/Redis';

import DeliveryRepository from '../../data/repositories/DeliveryRepository';
import AppError from '../../error/AppError';

interface Request {
  user_id: string;
  deliveryId: string;
}

class DeleteDeliveryService {
  public async execute({ user_id, deliveryId }: Request): Promise<void> {
    const cache = new RedisCache();
    const deliveriesRepository = getCustomRepository(DeliveryRepository);

    const delivery = await deliveriesRepository.findById(deliveryId);

    if (delivery.user_id !== user_id) {
      throw new AppError(
        'You does not have permission to delete this delivery',
        401,
      );
    }

    if (delivery.signature) {
      await uploadConfig.deleteUploadedFile(delivery.signature);
    }

    await cache.invalidate(`deliveries-list:${user_id}`);

    await deliveriesRepository.delete(delivery.id);
  }
}

export default DeleteDeliveryService;
