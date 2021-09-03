import { getRepository } from 'typeorm';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

import User from '../../data/models/User';
import AppError from '../../error/AppError';

dayjs.extend(isSameOrAfter);

class UpdateUserConfirmEmailService {
  public async execute(id: string): Promise<User> {
    const usersRepository = getRepository(User);

    const [user] = await usersRepository.findByIds([id]);

    if (!user) {
      throw new AppError('Invalid id');
    }

    if (user.verified) {
      throw new AppError('Your email is already confirmed');
    }

    user.verified = true;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserConfirmEmailService;
