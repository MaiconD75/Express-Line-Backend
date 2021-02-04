import { getCustomRepository } from 'typeorm';

import RecipientRepository from '../../data/repositories/RecipientRepository';
import AppError from '../../error/AppError';

class DeleteRecipientService {
  public async execute(id: string): Promise<void> {
    const recipientsRepository = getCustomRepository(RecipientRepository);

    const recipient = await recipientsRepository.findById(id);

    if (!recipient) {
      throw new AppError('This recipient does not exist');
    }

    await recipientsRepository.delete(recipient.id);
  }
}
export default DeleteRecipientService;
