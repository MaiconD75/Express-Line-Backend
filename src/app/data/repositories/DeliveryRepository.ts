import {
  EntityRepository,
  getCustomRepository,
  IsNull,
  Not,
  Repository,
} from 'typeorm';

import AppError from '../../error/AppError';
import Delivery from '../models/Delivery';
import DeliverymanRepository from './DeliverymanRepository';
import OriginRepository from './OriginRepository';
import RecipientRepository from './RecipientRepository';

@EntityRepository(Delivery)
class DeliveryRepository extends Repository<Delivery> {
  public async findById(id: string): Promise<Delivery> {
    try {
      const delivery = await this.findOne(id);

      if (!delivery) {
        throw new AppError('This delivery does not exist');
      }

      const deliverymenRepository = getCustomRepository(DeliverymanRepository);
      const originsRepository = getCustomRepository(OriginRepository);
      const recipientsRepository = getCustomRepository(RecipientRepository);

      const deliveryResponse = {
        ...delivery,
        deliveryman: await deliverymenRepository.findById(
          delivery.deliveryman_id,
        ),
        origin: await originsRepository.findById(delivery.origin_id),
        recipient: await recipientsRepository.findById(delivery.recipient_id),
      };

      return deliveryResponse;
    } catch {
      throw new AppError(`This delivery's id is an invalid id`);
    }
  }

  public async findByDeliveryman(
    deliveryman_id: string,
    completedDeliveries: boolean,
  ): Promise<Delivery[]> {
    try {
      const deliveries = completedDeliveries
        ? await this.find({
            where: { deliveryman_id, end_date: Not(IsNull()) },
          })
        : await this.find({ where: { deliveryman_id, end_date: IsNull() } });

      if (!deliveries) {
        throw new AppError('This deliveryman does not have deliveries');
      }

      const originsRepository = getCustomRepository(OriginRepository);
      const recipientsRepository = getCustomRepository(RecipientRepository);

      const deliveriesResponse = await Promise.all(
        deliveries.map(async delivery => ({
          ...delivery,
          origin: await originsRepository.findById(delivery.origin_id),
          recipient: await recipientsRepository.findById(delivery.recipient_id),
        })),
      );

      return deliveriesResponse;
    } catch {
      throw new AppError(`This deliveryman's id is an invalid id`);
    }
  }
}

export default DeliveryRepository;
