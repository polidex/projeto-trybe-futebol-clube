import { Request, Response, NextFunction } from 'express';

const emailValidation = (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const validation = email.match(regex);

  if (!validation) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }
  next();
};

export default emailValidation;
