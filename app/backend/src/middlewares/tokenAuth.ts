import { Request, Response, NextFunction } from 'express';
import { untokenize } from '../utilities/tokenize';

const tokenAuth = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (authorization) {
    const user = untokenize(authorization);
    if (!user.role) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
  }
  next();
};

export default tokenAuth;
