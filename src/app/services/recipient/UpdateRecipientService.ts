import { getCustomRepository } from 'typeorm';
import RedisCache from '../../../lib/Redis';

import Recipient from '../../data/models/Recipient';
import RecipientRepository from '../../data/repositories/RecipientRepository';
import AppError from '../../error/AppError';

interface Request {
  recipientId: string;
  user_id: string;
  name?: string;
  street?: string;
  number?: number;
  complement?: string;
  city?: string;
  state?: string;
  zip_code?: number;
}

class UpdateRecipientService {
  public async execute({
    recipientId,
    user_id,
    name,
    street,
    number,
    complement,
    city,
    state,
    zip_code,
  }: Request): Promise<Recipient> {
    const cache = new RedisCache();
    const recipientsRepository = getCustomRepository(RecipientRepository);

    const recipient = await recipientsRepository.findById(recipientId);

    if (recipient.user_id !== user_id) {
      throw new AppError(
        'You does not have permission to delete this recipient',
        401,
      );
    }

    recipient.name = name || recipient.name;
    recipient.street = street || recipient.street;
    recipient.number = number || recipient.number;
    recipient.complement = complement || recipient.complement;
    recipient.city = city || recipient.city;
    recipient.state = state || recipient.state;
    recipient.zip_code = zip_code || recipient.zip_code;

    await cache.invalidate(`recipients-list:${user_id}`);

    await recipientsRepository.save(recipient);

    return recipient;
  }
}

export default UpdateRecipientService;
