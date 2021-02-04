import { EntityRepository, Repository } from 'typeorm';

import AppError from '../../error/AppError';
import Delivery from '../models/Delivery';

@EntityRepository(Delivery)
class DeliveryRepository extends Repository<Delivery> {
  public async findById(id: string): Promise<Delivery | undefined> {
    try {
      const delivery = await this.findOne(id);
      return delivery;
    } catch {
      throw new AppError(`This delivery's id is an invalid id`);
    }
  }
}

export default DeliveryRepository;
