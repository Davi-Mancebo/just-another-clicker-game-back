import { prisma } from '@/config';

async function getAllPowerUps() {
    return prisma.powerUp.findMany()
}

async function userHaveThisPower(userId: number, powerId: number) {
    return prisma.userPower.findFirst({where: {
        userId,
        powerId
    }})
}

const powerRepository = {
    userHaveThisPower,
    getAllPowerUps
}
export default powerRepository