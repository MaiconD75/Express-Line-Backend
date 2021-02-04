import { getCustomRepository } from 'typeorm';

import OriginRepository from '../../data/repositories/OriginRepository';
import AppError from '../../error/AppError';

interface Request {
  user_id: string;
  originId: string;
}

class DeleteOriginService {
  public async execute({ user_id, originId }: Request): Promise<void> {
    const originsRepository = getCustomRepository(OriginRepository);

    const origin = await originsRepository.findById(originId);

    if (origin.user_id !== user_id) {
      throw new AppError(
        'You does not have permission to delete this origin',
        401,
      );
    }

    await originsRepository.delete(origin.id);
  }
}
export default DeleteOriginService;
