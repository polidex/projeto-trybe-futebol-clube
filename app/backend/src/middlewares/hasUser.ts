import { Request, Response, NextFunction } from 'express';
import { compare } from 'bcryptjs';
import UserModel from '../database/models/userModel';

const hasUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ where: { email, password } });

  if (user) {
    const decryptedPassword = await compare(password, user.password);
    if (!user && !decryptedPassword) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
  }
  next();
};

export default hasUser;
