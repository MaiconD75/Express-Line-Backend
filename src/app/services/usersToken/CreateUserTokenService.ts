import { getRepository } from 'typeorm';
import dayjs from 'dayjs';
import Queue from '../../../lib/Queue';

import User from '../../data/models/User';
import AppError from '../../error/AppError';
import UserToken from '../../data/models/UserToken';

class CreateUserTokenService {
  public async execute(email: string): Promise<UserToken> {
    const userTokensRepository = getRepository(UserToken);
    const usersRepository = getRepository(User);

    if (!email) {
      throw new AppError('Email was not provided.');
    }

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new AppError('This user does not exits.');
    }

    const oldUserToken = await userTokensRepository.find({
      where: { user_id: user.id },
    });

    if (oldUserToken) {
      oldUserToken.map(async token => {
        await userTokensRepository.delete({ id: token.id });
      });
    }

    const userToken = userTokensRepository.create({
      user_id: user.id,
      expires_date: dayjs().add(2, 'h'),
    });

    await userTokensRepository.save(userToken);

    const [createdToken] = await userTokensRepository.findByIds(
      [userToken.id],
      {
        relations: ['user'],
      },
    );

    console.log(createdToken.token);

    await Queue.add('ResetPassword', {
      userName: user.name,
      email,
      userToken: createdToken.token,
    });

    return createdToken;
  }
}

export default CreateUserTokenService;
