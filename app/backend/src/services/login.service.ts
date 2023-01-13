import { compare } from 'bcryptjs';
import UserModel from '../database/models/userModel';
import ILogin from '../interfaces/login.interface';
import { tokenize } from '../utilities/tokenize';

class LoginService {
  userModel: UserModel;

  constructor() {
    this.userModel = new UserModel();
  }

  userLogin = async (login: ILogin) => {
    // const { email, password } = login;

    // const user = await UserModel.findOne({ where: { email, password } });
    // // console.log('--------------->', user?.dataValues.id);
    // if (user === null) {
    //   return ({ message: 'Incorrect email or password' });
    // } const loginToken = tokenize(user);

    // return { token: loginToken };
    const user = await UserModel.findOne({ where: { email: login.email } });

    if (user) {
      const comparePassword = await compare(login.password, user.dataValues.password);
      if (comparePassword) {
        const { id, username } = user;
        const loginToken = tokenize({ id, username });

        return { status: 200, message: { token: loginToken } };
      }
    }
    return ({ status: 401, message: { message: 'Incorrect email or password' } });
  };
}

export default LoginService;
