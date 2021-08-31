import { getCustomRepository } from 'typeorm';

import uploadConfig from '../../../config/upload';
import RedisCache from '../../../lib/Redis';
import DeliverymanRepository from '../../data/repositories/DeliverymanRepository';
import AppError from '../../error/AppError';

interface Request {
  user_id: string;
  deliverymanId: string;
}

class DeleteDeliverymanService {
  public async execute({ user_id, deliverymanId }: Request): Promise<void> {
    const cache = new RedisCache();
    const deliverymenRepository = getCustomRepository(DeliverymanRepository);

    const deliveryman = await deliverymenRepository.findById(deliverymanId);

    if (deliveryman.user_id !== user_id) {
      throw new AppError(
        'You does not have permission to delete this deliveryman',
        401,
      );
    }

    if (deliveryman.avatar) {
      await uploadConfig.deleteUploadedFile(deliveryman.avatar);
    }
    await cache.invalidate(`deliverymen-list:${user_id}`);

    await deliverymenRepository.delete(deliveryman.id);
  }
}

export default DeleteDeliverymanService;
