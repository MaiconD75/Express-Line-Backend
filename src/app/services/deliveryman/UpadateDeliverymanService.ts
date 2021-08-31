import { getCustomRepository } from 'typeorm';

import Deliveryman from '../../data/models/Deliveryman';
import DeliverymanRepository from '../../data/repositories/DeliverymanRepository';
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
    const deliverymenRepository = getCustomRepository(DeliverymanRepository);

    const deliveryman = await deliverymenRepository.findById(deliverymanId);

    if (deliveryman.user_id !== user_id) {
      throw new AppError(
        'You does not have permission to delete this deliveryman',
        401,
      );
    }

    const registeredEmail = await deliverymenRepository.findOne({
      where: { email, user_id },
    });

    if (registeredEmail && registeredEmail.id !== deliverymanId) {
      throw new AppError('This email is already registered');
    }

    deliveryman.email = email || deliveryman.email;
    deliveryman.name = name || deliveryman.name;

    await deliverymenRepository.save(deliveryman);

    return deliveryman;
  }
}

export default UpdateDeliverymanService;
