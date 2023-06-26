import { Users } from '@prisma/client';
import bcrypt from 'bcrypt';
import { duplicatedEmailError } from './errors';
import userRepository from '@/repositories/user-repository';
import powerRepository from '@/repositories/power-repository';

async function createUser({ email, name, password, points }: CreateUserParams): Promise<Users> {
  await validateUniqueEmailOrFail(email);

  const hashedPassword = await bcrypt.hash(password, 12);
  return userRepository.create({
    email,
    name,
    password: hashedPassword,
    points
  });
}

async function saveGame(userId: number, powerUpId: number, quantity: number) {
  const powerUpExistOnUser = await powerRepository.userHaveThisPower(userId, powerUpId)

  if(powerUpExistOnUser) {
    return userRepository.updateCurrentGame(powerUpExistOnUser.id, quantity)
  }
  else{
    return userRepository.saveGame(userId, powerUpId, quantity)
  }
}

async function validateUniqueEmailOrFail(email: string) {
  const userWithSameEmail = await userRepository.findByEmail(email);
  if (userWithSameEmail) {
    throw duplicatedEmailError();
  }
}

export type CreateUserParams = Pick<Users, 'email' | 'name' | 'password' | 'points'>;

const userService = {
  createUser,
  saveGame
};

export * from './errors';
export default userService;
