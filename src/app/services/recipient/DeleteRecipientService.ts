import { getCustomRepository } from 'typeorm';

import RecipientRepository from '../../data/repositories/RecipientRepository';
import AppError from '../../error/AppError';

interface Request {
  user_id: string;
  recipientId: string;
}

class DeleteRecipientService {
  public async execute({ user_id, recipientId }: Request): Promise<void> {
    const recipientsRepository = getCustomRepository(RecipientRepository);

    const recipient = await recipientsRepository.findById(recipientId);

    if (recipient.user_id !== user_id) {
      throw new AppError(
        'You does not have permission to delete this recipient',
        401,
      );
    }

    await recipientsRepository.delete(recipient.id);
  }
}
export default DeleteRecipientService;
