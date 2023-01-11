import { Request, Response, NextFunction } from 'express';
import ILogin from '../interfaces/login.interface';

const requiredFields = (req: Request, res: Response, next: NextFunction) => {
  const { email, password }: ILogin = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  next();
};

export default requiredFields;
