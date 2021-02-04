import { getCustomRepository } from 'typeorm';

import Recipient from '../../data/models/Recipient';
import RecipientRepository from '../../data/repositories/RecipientRepository';
import AppError from '../../error/AppError';

interface Request {
  recipientId: string;
  user_id: string;
}

class GetRecipientService {
  public async execute({ recipientId, user_id }: Request): Promise<Recipient> {
    const recipientRepository = getCustomRepository(RecipientRepository);

    const recipient = await recipientRepository.findById(recipientId);

    if (!recipient) {
      throw new AppError('This recipient does not exist');
    }

    if (recipient.user_id !== user_id) {
      throw new AppError(
        'You does not have permission to get this recipient',
        401,
      );
    }

    return recipient;
  }
}

export default GetRecipientService;
