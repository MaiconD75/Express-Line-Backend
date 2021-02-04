import { getCustomRepository } from 'typeorm';

import Origin from '../../data/models/Origin';
import OriginRepository from '../../data/repositories/OriginRepository';
import AppError from '../../error/AppError';

interface Request {
  user_id: string;
  originId: string;
}

class GetOriginService {
  public async execute({ user_id, originId }: Request): Promise<Origin> {
    const originsRepository = getCustomRepository(OriginRepository);

    const origin = await originsRepository.findById(originId);

    if (origin.user_id !== user_id) {
      throw new AppError(
        'You does not have permission to get this origin',
        401,
      );
    }

    return origin;
  }
}

export default GetOriginService;
