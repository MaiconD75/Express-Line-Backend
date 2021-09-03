import { resolve } from 'path';
import { getRepository } from 'typeorm';
import dayjs from 'dayjs';

import User from '../../data/models/User';
import AppError from '../../error/AppError';
import UserToken from '../../data/models/UserToken';
import EtherealMail from '../../../lib/EtherealMail';

class CreateUserTokenService {
  public async execute(email: string): Promise<UserToken> {
    const mail = new EtherealMail();
    const userTokensRepository = getRepository(UserToken);
    const usersRepository = getRepository(User);

    const templatePath = resolve(
      __dirname,
      '..',
      '..',
      'views',
      'emails',
      'resetPassword',
      'index.hbs',
    );

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

    const variables = {
      userName: user.name,
      link: `http://localhost:3333/users/forgotten-password/${user.id}`,
    };

    await mail.sendMail(
      user.email,
      'Redefinição de senha',
      templatePath,
      variables,
    );

    return createdToken;
  }
}

export default CreateUserTokenService;
