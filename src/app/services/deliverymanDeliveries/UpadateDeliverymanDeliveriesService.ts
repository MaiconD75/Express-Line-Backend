import { getCustomRepository } from 'typeorm';
import { getHours } from 'date-fns';

import uploadConfig from '../../../config/upload';
import Delivery from '../../data/models/Delivery';

import DeliveryRepository from '../../data/repositories/DeliveryRepository';
import AppError from '../../error/AppError';
import RedisCache from '../../../lib/Redis';

interface Request {
  completOperation: boolean;
  deliveryman_id: string;
  delivery_id: string;
  signatureFilename?: string;
}

class UpdateDeliverymanDeliveriesService {
  public async execute({
    completOperation = false,
    deliveryman_id,
    delivery_id,
    signatureFilename,
  }: Request): Promise<Delivery> {
    const cache = new RedisCache();
    const deliveriesRepository = getCustomRepository(DeliveryRepository);

    const delivery = await deliveriesRepository.findById(delivery_id);

    if (!delivery) {
      throw new AppError('This delivery does not exist');
    }

    if (delivery.deliveryman_id !== deliveryman_id) {
      throw new AppError('You does not have access to this delivery', 401);
    }

    if (!completOperation) {
      if (!delivery.start_date) {
        const getedDeliveriesCount =
          await deliveriesRepository.findGetedDeliveriesInSameDay(
            deliveryman_id,
          );
        const currentHour = getHours(new Date());

        if (currentHour < 8 || currentHour >= 18) {
          throw new AppError('You just can get a delivery from 8pm to 6pm');
        }

        if (getedDeliveriesCount.length >= 5) {
          throw new AppError(
            'A deliveryman just can get 5 deliveries at a day',
          );
        }

        delivery.start_date = new Date();

        await deliveriesRepository.save(delivery);
      }
      return delivery;
    }

    if (!signatureFilename) {
      throw new AppError(
        'A delivery just can be completed with a signature picture',
      );
    }

    if (!delivery.start_date) {
      throw new AppError('A non started delivery does not can be completed');
    }

    if (delivery.canceled_at) {
      throw new AppError('A canceled delivery does not can be completed');
    }

    if (delivery.signature) {
      await uploadConfig.deleteUploadedFile(delivery.signature);
    }

    delivery.signature = signatureFilename;
    delivery.end_date = new Date();

    await cache.invalidate(
      `deliveryman-${
        completOperation ? 'completed' : 'pending'
      }-deliveries-list:${deliveryman_id}`,
    );

    await deliveriesRepository.save(delivery);

    return delivery;
  }
}

export default UpdateDeliverymanDeliveriesService;
