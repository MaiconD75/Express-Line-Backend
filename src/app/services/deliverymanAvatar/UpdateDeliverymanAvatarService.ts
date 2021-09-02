import { getCustomRepository } from 'typeorm';
import uploadConfig from '../../../config/upload';
import RedisCache from '../../../lib/Redis';

import Deliveryman from '../../data/models/Deliveryman';
import DeliverymanRepository from '../../data/repositories/DeliverymanRepository';
import AppError from '../../error/AppError';

class UpdateDeliverymanAvatarService {
  public async execute(
    deliverymanId: string,
    user_id: string,
    avatarFilename?: string,
  ): Promise<Deliveryman> {
    const cache = new RedisCache();
    const deliverymenRepository = getCustomRepository(DeliverymanRepository);

    const deliveryman = await deliverymenRepository.findById(deliverymanId);

    if (!avatarFilename) {
      throw new AppError('Avatar was not provided');
    }

    if (deliveryman.avatar) {
      await uploadConfig.deleteUploadedFile(deliveryman.avatar);
    }

    if (deliveryman.user_id !== user_id) {
      throw new AppError(
        'You does not have permission to change this deliveryman',
        401,
      );
    }

    deliveryman.avatar = avatarFilename;

    await cache.invalidate(`deliverymen-list:${user_id}`);

    await deliverymenRepository.save(deliveryman);

    return deliveryman;
  }
}

export default UpdateDeliverymanAvatarService;
