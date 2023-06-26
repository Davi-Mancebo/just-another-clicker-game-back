import powerRepository from '@/repositories/power-repository';

async function getAllPowerUps() {
  return await powerRepository.getAllPowerUps();
}

const gameService = {
  getAllPowerUps,
};

export default gameService;
