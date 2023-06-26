import { Request, Response } from 'express';
import httpStatus from 'http-status';
import userService from '../services/userService';
import authenticationService, { SignInParams } from '../services/auth-service';
import { AuthenticatedRequest } from '@/middlewares';

export async function createUser(req: Request, res: Response) {
  const { email, name, password, points } = req.body;

  // Verificar se 'points' está presente no corpo da solicitação
  // Caso contrário, atribuir o valor 0
  const pointsValue = points !== undefined ? points : 0;

  try {
    const user = await userService.createUser({ email, name, password, points: pointsValue });
    return res.status(httpStatus.CREATED).json({
      id: user.id,
      email: user.email,
    });
  } catch (error) {
    if (error.name === 'DuplicatedEmailError') {
      return res.status(httpStatus.CONFLICT).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function signIn(req: Request, res: Response) {
  const { email, password } = req.body as SignInParams;

  try {
    const result = await authenticationService.signIn({ email, password });

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send(error);
  }
}

export async function saveGame(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const { powerUps } = req.body;

  try{
    for(let c = 0; c < powerUps.length; c++){
      await userService.saveGame(userId, powerUps[c].id, powerUps[c].quantity)
    }
    return res.sendStatus(httpStatus.CREATED)
  }catch(err){
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message)
  }
}
