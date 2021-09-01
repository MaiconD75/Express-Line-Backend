import { EntityRepository, Repository } from 'typeorm';

import AppError from '../../error/AppError';
import DeliveryProblem from '../models/DeliveryProblem';

@EntityRepository(DeliveryProblem)
class DeliveryProblemRepository extends Repository<DeliveryProblem> {
  public async findById(id: string): Promise<DeliveryProblem> {
    try {
      const origin = await this.findOne(id, {
        relations: ['delivery'],
      });

      if (!origin) {
        throw new AppError('This delivery problem does not exist');
      }

      return origin;
    } catch {
      throw new AppError(`This delivery problem id is an invalid id`);
    }
  }
}

export default DeliveryProblemRepository;
