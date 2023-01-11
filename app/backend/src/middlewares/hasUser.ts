import { Request, Response, NextFunction } from 'express';
import UserModel from '../database/models/userModel';

const hasUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ where: { email, password } });

  if (!user) return res.status(401).json({ message: 'Incorrect email or password' });
  next();
};

export default hasUser;
