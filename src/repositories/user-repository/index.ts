import { Prisma } from '@prisma/client';
import { prisma } from '@/config';

async function findByEmail(email: string, select?: Prisma.UsersSelect) {
  const params: Prisma.UsersFindUniqueArgs = {
    where: {
      email,
    },
  };

  if (select) {
    params.select = select;
  }

  return prisma.users.findUnique(params);
}

async function create(data: Prisma.UsersUncheckedCreateInput) {
  return prisma.users.create({
    data,
  });
}
async function saveGame(userId: number, powerId: number, quantity: number) {
  return prisma.userPower.create({
    data: {
      userId,
      powerId,
      quantity,
    },
  });
}
async function updateCurrentGame(powerUserId: number, quantity: number) {
  return prisma.userPower.update({
    data: {
      quantity: quantity,
    },
    where: {
      id: powerUserId,
    },
  });
}

const userRepository = {
  findByEmail,
  create,
  saveGame,
  updateCurrentGame,
};

export default userRepository;
