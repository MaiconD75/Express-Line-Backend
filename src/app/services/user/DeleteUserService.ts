import { getRepository } from 'typeorm';

import User from '../../data/models/User';
import AppError from '../../error/AppError';

class DeleteUserService {
  public async execute(id: string): Promise<void> {
    const usersRepository = getRepository(User);

    const [user] = await usersRepository.findByIds([id]);

    if (!user) {
      throw new AppError('Invalid id');
    }

    if (user.verified) {
      throw new AppError('You just can delete a user to unconfirm email');
    }

    await usersRepository.delete(user.id);
  }
}

export default DeleteUserService;
