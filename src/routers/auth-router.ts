import { Router } from 'express';
import { validateBody } from '@/middlewares';
import { signInSchema } from '@/schemas/auth-schema';
import { signIn } from '@/controllers/users-controller';


const authenticationRouter = Router();

authenticationRouter.post('/sign-in', validateBody(signInSchema), signIn);

export { authenticationRouter };