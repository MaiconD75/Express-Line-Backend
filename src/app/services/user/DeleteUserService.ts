import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import { classToClass } from 'class-transformer';

import User from '../../data/models/User';
import AppError from '../../error/AppError';

class DeleteUserService {
  public async execute(id: string): Promise<User> {
    const usersRepository = getRepository(User);

    const [user] = await usersRepository.findByIds([id]);

    if (!user) {
      throw new AppError('Invalid id');
    }

    await usersRepository.delete(user);

    return classToClass(user);
  }
}

export default DeleteUserService;
