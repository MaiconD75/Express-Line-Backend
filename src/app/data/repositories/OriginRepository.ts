import { EntityRepository, Repository } from 'typeorm';

import AppError from '../../error/AppError';
import Origin from '../models/Origin';

@EntityRepository(Origin)
class OriginRepository extends Repository<Origin> {
  public async findById(id: string): Promise<Origin | undefined> {
    try {
      const origin = await this.findOne(id);
      return origin;
    } catch {
      throw new AppError(`This origin's id is an invalid id`);
    }
  }
}

export default OriginRepository;
