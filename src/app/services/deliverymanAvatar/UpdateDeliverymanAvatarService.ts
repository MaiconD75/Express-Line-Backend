import { getCustomRepository } from 'typeorm';
import uploadConfig from '../../../config/upload';

import Deliveryman from '../../data/models/Deliveryman';
import DeliverymanRepository from '../../data/repositories/DeliverymanRepository';
import AppError from '../../error/AppError';

class UpdateDeliverymanAvatarService {
  public async execute(
    deliverymanId: string,
    user_id: string,
    avatarFilename: string,
  ): Promise<Deliveryman> {
    const deliverymenRepository = getCustomRepository(DeliverymanRepository);

    const deliveryman = await deliverymenRepository.findById(deliverymanId);

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

    await deliverymenRepository.save(deliveryman);

    return deliveryman;
  }
}

export default UpdateDeliverymanAvatarService;
