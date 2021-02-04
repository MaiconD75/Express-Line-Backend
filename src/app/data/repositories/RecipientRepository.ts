import { EntityRepository, Repository } from 'typeorm';

import AppError from '../../error/AppError';
import Recipient from '../models/Recipient';

@EntityRepository(Recipient)
class RecipientRepository extends Repository<Recipient> {
  public async findById(id: string): Promise<Recipient> {
    try {
      const recipient = await this.findOne(id);

      if (!recipient) {
        throw new AppError('This recipient does not exist');
      }

      return recipient;
    } catch {
      throw new AppError(`This recipient's id is an invalid id`);
    }
  }
}

export default RecipientRepository;
