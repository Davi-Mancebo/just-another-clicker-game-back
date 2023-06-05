import { Router } from 'express';

import { createUserSchema } from '../schemas/users-schemas';
import { validateBody } from '@/middlewares';
import { createUser } from '../controllers/users-controller';

const usersRouter = Router();

usersRouter.post('/', validateBody(createUserSchema), createUser);

export { usersRouter };
