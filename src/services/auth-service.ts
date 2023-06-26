import { Users } from '@prisma/client';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { exclude } from '@/utils/prisma-utils';
import userRepository from '@/repositories/user-repository';
import sessionRepository from '@/repositories/repository';
import { notFoundError } from '@/errors';

dotenv.config();

async function signIn(params: SignInParams): Promise<SignInResult> {
  const { email, password } = params;

  const user = await getUserOrFail(email);

  await validatePasswordOrFail(password, user.password);

  const token = await createSession(user.id);
  return {
    user: exclude(user, 'password'),
    token,
  };
}

async function getUserOrFail(email: string): Promise<GetUserOrFailResult> {
  const user = await userRepository.findByEmail(email, { id: true, name:  true, email: true, password: true });
  if (!user) throw notFoundError();

  return user;
}

async function createSession(userId: number) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  await sessionRepository.create({
    token,
    userId,
  });

  return token;
}

async function validatePasswordOrFail(password: string, userPassword: string) {
  const isPasswordValid = await bcrypt.compare(password, userPassword);
  if (!isPasswordValid) throw notFoundError();
}

export type SignInParams = Pick<Users, 'email' | 'password'>;

type SignInResult = {
  user: Pick<Users, 'id' | 'name' | 'email'>;
  token: string;
};

type GetUserOrFailResult = Pick<Users, 'id' | 'email' | 'name' | 'password'>;

const authenticationService = {
  signIn,
};

export default authenticationService;
export * from './errors';