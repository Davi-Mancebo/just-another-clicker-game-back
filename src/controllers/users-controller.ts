import { Request, Response } from 'express';
import httpStatus from 'http-status';
import userService from '../services/userService';
import authenticationService, { SignInParams } from '../services/auth-service';

export async function createUser(req: Request, res: Response) {
  const { email, name, password } = req.body;

  try {
    const user = await userService.createUser({ email, name, password });
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
    return res.status(httpStatus.UNAUTHORIZED).send({});
  }
}
