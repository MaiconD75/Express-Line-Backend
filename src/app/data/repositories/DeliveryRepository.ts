import { Between, EntityRepository, IsNull, Not, Repository } from 'typeorm';

import { startOfDay, endOfDay } from 'date-fns';

import AppError from '../../error/AppError';
import Delivery from '../models/Delivery';

@EntityRepository(Delivery)
class DeliveryRepository extends Repository<Delivery> {
  public async findById(id: string): Promise<Delivery> {
    try {
      const delivery = await this.findOne(id, {
        relations: ['deliveryman', 'origin', 'recipient'],
      });

      if (!delivery) {
        throw new AppError('This delivery does not exist');
      }

      return delivery;
    } catch {
      throw new AppError(`This delivery id is an invalid id`);
    }
  }

  public async findByDeliveryman(
    deliveryman_id: string,
    completedDeliveries: boolean,
  ): Promise<Delivery[]> {
    try {
      const deliveries = completedDeliveries
        ? await this.find({
            where: {
              deliveryman_id,
              end_date: Not(IsNull()),
            },
            relations: ['deliveryman', 'origin', 'recipient'],
            order: {
              created_at: 'ASC',
            },
          })
        : await this.find({
            where: {
              deliveryman_id,
              end_date: IsNull(),
              canceled_at: IsNull(),
            },
            relations: ['deliveryman', 'origin', 'recipient'],
            order: {
              created_at: 'ASC',
            },
          });

      if (!deliveries) {
        throw new AppError('This deliveryman does not have deliveries');
      }

      return deliveries;
    } catch {
      throw new AppError(`This deliveryman id is an invalid id`);
    }
  }

  public async findGetedDeliveriesInSameDay(
    deliveryman_id: string,
  ): Promise<Delivery[]> {
    const currentDate = new Date();

    const deliveries = await this.find({
      where: {
        start_date: Between(startOfDay(currentDate), endOfDay(currentDate)),
        deliveryman_id,
      },
      relations: ['deliveryman', 'origin', 'recipient'],
      order: {
        created_at: 'ASC',
      },
    });
    return deliveries;
  }
}

export default DeliveryRepository;
