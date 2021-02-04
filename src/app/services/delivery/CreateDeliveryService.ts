import { getCustomRepository, getRepository } from 'typeorm';

import Delivery from '../../data/models/Delivery';
import DeliverymanRepository from '../../data/repositories/DeliverymanRepository';
import OriginRepository from '../../data/repositories/OriginRepository';
import RecipientRepository from '../../data/repositories/RecipientRepository';

import AppError from '../../error/AppError';

interface Request {
  user_id: string;
  deliveryman_id: string;
  origin_id: string;
  recipient_id: string;
  product: string;
}

class CreateDeliveryService {
  public async execute({
    user_id,
    deliveryman_id,
    origin_id,
    recipient_id,
    product,
  }: Request): Promise<Delivery> {
    const deliveriesRepository = getRepository(Delivery);

    if (!deliveryman_id) {
      throw new AppError(`deliveryman's id was not provided`);
    }

    if (!origin_id) {
      throw new AppError(`The origin's id was not provided`);
    }

    if (!recipient_id) {
      throw new AppError(`The recipient's id was not provided`);
    }

    if (!product) {
      throw new AppError(`The product was not provided`);
    }

    const deliverymenRepository = getCustomRepository(DeliverymanRepository);
    const originsRepository = getCustomRepository(OriginRepository);
    const recipientsRepository = getCustomRepository(RecipientRepository);

    const deliveryman = await deliverymenRepository.findById(deliveryman_id);
    const origin = await originsRepository.findById(origin_id);
    const recipient = await recipientsRepository.findById(recipient_id);

    if (!deliveryman) {
      throw new AppError('This deliveryman does not exist');
    }

    if (!origin) {
      throw new AppError('This origin does not exist');
    }

    if (!recipient) {
      throw new AppError('This recipient does not exist');
    }

    if (deliveryman.user_id !== user_id) {
      throw new AppError('You does not have this deliveryman');
    }

    if (origin.user_id !== user_id) {
      throw new AppError('You does not have this origin');
    }

    if (recipient.user_id !== user_id) {
      throw new AppError('You does not have this recipient');
    }

    const delivery = deliveriesRepository.create({
      user_id,
      deliveryman_id,
      origin_id,
      recipient_id,
      product,
    });

    await deliveriesRepository.save(delivery);

    return delivery;
  }
}

export default CreateDeliveryService;
