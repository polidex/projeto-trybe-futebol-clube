import * as jwt from 'jsonwebtoken';
import { JwtPayload, Secret, SignOptions } from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import IUserToken from '../interfaces/userToken.interface';

dotenv.config();

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

export const tokenize = (user: IUserToken) => {
  const token = jwt
    .sign({ ...user }, process.env.JWT_SECRET as Secret, jwtConfig as SignOptions);
  return token;
};

export const untokenize = (token: string) => {
  const decode = jwt.verify(token, process.env.JWT_SECRET as Secret);
  return decode as JwtPayload;
};
