import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ClientError } from './client-error.js';

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.get('Authorization');
  const token = authHeader?.split('Bearer ')[1];

  if (!authHeader || !token) {
    throw new ClientError(401, 'authentication required');
  }

  const hashKey = process.env.TOKEN_SECRET;

  if (!hashKey) throw new Error('TOKEN_SECRET not found in .env');

  const payload = jwt.verify(token, hashKey);
  req.user = payload as Request['user'];
  next();
}
