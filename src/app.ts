import 'reflect-metadata';
import 'express-async-errors';
import express, { Express } from 'express';
import cors from 'cors';

import { loadEnv, connectDb, disconnectDB } from '@/config';
import { handleApplicationErrors } from '@/middlewares';
import { usersRouter } from './routers/users-router';
import { authenticationRouter } from './routers/auth-router';
import { gameRouter } from './routers/control-game-router';
import { baseGameRouter } from './routers/base-game-router';

loadEnv();

const app: Express = express();

// Configuração inicial do servidor
app.use(cors());
app.use(express.json());

// Rotas
app.get('/health', (_req, res) => res.send('OK!'));
app.use('/game', baseGameRouter)
app.use('/sign-up', usersRouter);
app.use('/sign-in', authenticationRouter);
app.use('/auth', gameRouter);

// Middleware para tratamento de erros de aplicação
app.use(handleApplicationErrors);

// Inicialização do servidor
export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

// Encerramento do servidor
export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;