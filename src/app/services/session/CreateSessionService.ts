import { compare } from 'bcryptjs';
import { classToClass } from 'class-transformer';
import { sign } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import authConfig from '../../../config/auth';
import User from '../../data/models/User';
import AppError from '../../error/AppError';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class CreateSessionService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ email });

    if (!user) {
      throw new AppError('The email and password does not match', 401);
    }

    const passwordMatched = await compare(password, user.password_hash);

    if (!passwordMatched) {
      throw new AppError('The email and password does not match', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user: classToClass(user),
      token,
    };
  }
}

export default CreateSessionService;
