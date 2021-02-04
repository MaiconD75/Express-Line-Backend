import { getCustomRepository } from 'typeorm';

import Origin from '../../data/models/Origin';
import OriginRepository from '../../data/repositories/OriginRepository';
import AppError from '../../error/AppError';

interface Request {
  originId: string;
  user_id: string;
  name?: string;
  street?: string;
  number?: number;
  complement?: string;
  city?: string;
  state?: string;
  zip_code?: number;
}

class UpdateOriginService {
  public async execute({
    originId,
    user_id,
    street,
    number,
    complement,
    city,
    state,
    zip_code,
  }: Request): Promise<Origin> {
    const originsRepository = getCustomRepository(OriginRepository);

    const origin = await originsRepository.findById(originId);

    if (origin.user_id !== user_id) {
      throw new AppError(
        'You does not have permission to delete this origin',
        401,
      );
    }

    origin.street = street || origin.street;
    origin.number = number || origin.number;
    origin.complement = complement || origin.complement;
    origin.city = city || origin.city;
    origin.state = state || origin.state;
    origin.zip_code = zip_code || origin.zip_code;

    await originsRepository.save(origin);

    return origin;
  }
}

export default UpdateOriginService;
