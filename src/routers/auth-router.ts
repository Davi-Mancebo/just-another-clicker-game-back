import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { signInSchema } from '@/schemas/auth-schema';
import { signIn } from '@/controllers/users-controller';


const authenticationRouter = Router();

authenticationRouter.post('/', signIn).all('/*', authenticateToken).post('/save');

export { authenticationRouter };