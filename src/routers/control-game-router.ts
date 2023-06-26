import { authenticateToken } from '@/middlewares';
import { Router } from 'express';

const gameRouter = Router();

gameRouter
    .all('/*', authenticateToken)
    .get('/leaderboard', )
    

export { gameRouter };
