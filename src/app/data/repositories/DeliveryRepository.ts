import { EntityRepository, Repository } from 'typeorm';

import AppError from '../../error/AppError';
import Deliveryman from '../models/Deliveryman';

@EntityRepository(Deliveryman)
class DeliverymanRepository extends Repository<Deliveryman> {
  public async findById(id: string): Promise<Deliveryman | undefined> {
    try {
      const deliveryman = await this.findOne(id);

      return deliveryman;
    } catch {
      throw new AppError('This is a invalid id');
    }
  }
}

export default DeliverymanRepository;
