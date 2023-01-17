import { Request, Response, NextFunction } from 'express';
import { untokenize } from '../utilities/tokenize';

const tokenAuth = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token must be provided' });
  }
  try {
    untokenize(authorization);
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default tokenAuth;
