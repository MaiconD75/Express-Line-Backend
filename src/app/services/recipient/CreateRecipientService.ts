import { getRepository } from 'typeorm';
import RedisCache from '../../../lib/Redis';
import Recipient from '../../data/models/Recipient';
import AppError from '../../error/AppError';

interface Request {
  user_id: string;
  name: string;
  street: string;
  number: number;
  complement: string;
  city: string;
  state: string;
  zip_code: number;
}

class CreateRecipientService {
  public async execute({
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
    const recipientsRepository = getRepository(Recipient);

    if (!name) {
      throw new AppError('The name was not provided');
    }

    const emptyRequiredFields =
      !street || !number || !city || !state || !zip_code;

    if (emptyRequiredFields) {
      throw new AppError('Not all required fields are filled out');
    }

    const recipient = recipientsRepository.create({
      name,
      user_id,
      street,
      number,
      complement,
      city,
      state,
      zip_code,
    });

    await cache.invalidate(`recipients-list:${user_id}`);

    await recipientsRepository.save(recipient);

    return recipient;
  }
}

export default CreateRecipientService;
