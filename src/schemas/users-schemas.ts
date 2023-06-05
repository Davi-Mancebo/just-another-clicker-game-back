import Joi from 'joi';

export const createUserSchema = Joi.object ({
  email: Joi.string().email().required(),
  name: Joi.string().min(3),
  password: Joi.string().min(6).required(),
});
