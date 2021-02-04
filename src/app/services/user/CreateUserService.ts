import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import { classToClass } from 'class-transformer';

import User from '../../data/models/User';
import AppError from '../../error/AppError';

interface Request {
  email: string;
  name: string;
  password: string;
}

class CreateUserService {
  public async execute({ email, name, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    if (!email) {
      throw new AppError('Email was not provided');
    }

    if (!password) {
      throw new AppError('Password was not provided');
    }

    if (!name) {
      throw new AppError('Name was not provided');
    }

    const registeredEmail = await usersRepository.findOne({ email });

    if (registeredEmail) {
      throw new AppError('This email is already registered');
    }

    if (password.length < 6) {
      throw new AppError('The password need to have most of 6 characters');
    }

    const user = usersRepository.create({
      email,
      password_hash: bcrypt.hashSync(password, 8),
      name,
    });

    await usersRepository.save(user);

    return classToClass(user);
  }
}

export default CreateUserService;
