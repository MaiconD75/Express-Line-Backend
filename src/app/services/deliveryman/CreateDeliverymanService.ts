import { getRepository } from 'typeorm';
import RedisCache from '../../../lib/Redis';

import Deliveryman from '../../data/models/Deliveryman';
import AppError from '../../error/AppError';

interface Request {
  user_id: string;
  name: string;
  email: string;
}

class CreateDeliverymanService {
  public async execute({
    user_id,
    name,
    email,
  }: Request): Promise<Deliveryman> {
    const cache = new RedisCache();
    const deliverymenRepository = getRepository(Deliveryman);

    if (!email) {
      throw new AppError('Email was not provided');
    }

    if (!name) {
      throw new AppError('Name was not provided');
    }

    const registeredEmail = await deliverymenRepository.findOne({
      where: { email, user_id },
    });

    if (registeredEmail) {
      throw new AppError('This email is already registered');
    }

    const deliveryman = deliverymenRepository.create({
      user_id,
      name,
      email,
    });

    await cache.invalidate(`deliverymen-list:${user_id}`);

    await deliverymenRepository.save(deliveryman);

    return deliveryman;
  }
}

export default CreateDeliverymanService;
