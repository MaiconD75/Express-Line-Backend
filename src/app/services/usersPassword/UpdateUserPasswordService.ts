import bcrypt from 'bcryptjs';
import { getRepository } from 'typeorm';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

import User from '../../data/models/User';
import AppError from '../../error/AppError';
import UserToken from '../../data/models/UserToken';

dayjs.extend(isSameOrAfter);

interface Request {
  token: string;
  password: string;
}

class UpdateUserPasswordService {
  public async execute({ token, password }: Request): Promise<User> {
    const userTokensRepository = getRepository(UserToken);
    const usersRepository = getRepository(User);

    const userToken = await userTokensRepository.findOne({
      where: { token },
      relations: ['user'],
    });

    if (!userToken) {
      throw new AppError('Invalid token');
    }

    if (dayjs().isAfter(userToken.expires_date)) {
      throw new AppError('This token has expired');
    }

    const [user] = await usersRepository.findByIds([userToken.user_id]);

    user.password_hash = bcrypt.hashSync(password, 8);

    await usersRepository.save(user);

    await userTokensRepository.delete(userToken.id);

    return user;
  }
}

export default UpdateUserPasswordService;
