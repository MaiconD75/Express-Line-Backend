import { getRepository } from 'typeorm';
import RedisCache from '../../../lib/Redis';

import Origin from '../../data/models/Origin';
import AppError from '../../error/AppError';

interface Request {
  user_id: string;
  street: string;
  number: number;
  complement: string;
  city: string;
  state: string;
  zip_code: number;
}

class CreateOriginService {
  public async execute({
    user_id,
    street,
    number,
    complement,
    city,
    state,
    zip_code,
  }: Request): Promise<Origin> {
    const cache = new RedisCache();
    const originsRepository = getRepository(Origin);

    const emptyRequiredFields =
      !street || !number || !city || !state || !zip_code;

    if (emptyRequiredFields) {
      throw new AppError('Not all required fields are filled out');
    }

    const origin = originsRepository.create({
      user_id,
      street,
      number,
      complement,
      city,
      state,
      zip_code,
    });

    await cache.invalidate(`origins-list:${user_id}`);

    await originsRepository.save(origin);

    return origin;
  }
}

export default CreateOriginService;
