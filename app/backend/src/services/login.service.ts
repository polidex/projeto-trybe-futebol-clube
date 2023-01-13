import { compare } from 'bcryptjs';
import UserModel from '../database/models/userModel';
import ILogin from '../interfaces/login.interface';
import { tokenize, untokenize } from '../utilities/tokenize';

class LoginService {
  userModel: UserModel;

  constructor() {
    this.userModel = new UserModel();
  }

  userLogin = async (login: ILogin) => {
    const user = await UserModel.findOne({ where: { email: login.email } });

    if (user) {
      const comparePassword = await compare(login.password, user.dataValues.password);
      if (comparePassword) {
        const { id, username, role } = user;
        const loginToken = tokenize({ id, username, role });

        return { status: 200, message: { token: loginToken } };
      }
    }
    return ({ status: 401, message: { message: 'Incorrect email or password' } });
  };

  userValidate = async (authorization: string | undefined) => {
    if (authorization) {
      const validUser = untokenize(authorization);
      console.log('------------->', validUser);
      return { status: 200, message: { role: validUser.role } };
    }
    return { status: 401, message: 'Invalid token' };
  };
}

export default LoginService;
