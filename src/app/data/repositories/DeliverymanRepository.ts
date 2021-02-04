import { EntityRepository, Repository } from 'typeorm';

import AppError from '../../error/AppError';
import Deliveryman from '../models/Deliveryman';

@EntityRepository(Deliveryman)
class DeliverymanRepository extends Repository<Deliveryman> {
  public async findById(id: string): Promise<Deliveryman> {
    try {
      const deliveryman = await this.findOne(id);

      if (!deliveryman) {
        throw new AppError('This deliveryman does not exist');
      }

      return deliveryman;
    } catch {
      throw new AppError(`This deliveryman's id is an invalid id`);
    }
  }
}

export default DeliverymanRepository;
