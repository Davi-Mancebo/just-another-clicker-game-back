import { getAllPowerUps } from '@/controllers/game-controller';
import { Router } from 'express';


const baseGameRouter = Router();

baseGameRouter.get('/powers', getAllPowerUps);

export { baseGameRouter };