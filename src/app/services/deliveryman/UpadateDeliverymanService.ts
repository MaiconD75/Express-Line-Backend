import { getCustomRepository } from 'typeorm';
import Deliveryman from '../../data/models/Deliveryman';
import DeliverymanRepository from '../../data/repositories/DeliveryRepository';
import AppError from '../../error/AppError';

interface Request {
  user_id: string;
  deliverymanId: string;
  email?: string;
  name?: string;
}

class UpdateDeliverymanService {
  public async execute({
    user_id,
    deliverymanId,
    email,
    name,
  }: Request): Promise<Deliveryman> {
    const deliverymanRepository = getCustomRepository(DeliverymanRepository);

    const deliveryman = await deliverymanRepository.findById(deliverymanId);

    if (!deliveryman) {
      throw new AppError('This deliveryman does not exist');
    }

    if (deliveryman.user_id !== user_id) {
      throw new AppError(
        'You does not have permission to delete this deliveryman',
        401,
      );
    }

    deliveryman.email = email || deliveryman.email;
    deliveryman.name = name || deliveryman.name;

    await deliverymanRepository.save(deliveryman);

    return deliveryman;
  }
}

export default UpdateDeliverymanService;
