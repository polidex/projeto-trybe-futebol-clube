import UserModel from '../database/models/userModel';
import ILogin from '../interfaces/login.interface';
import { tokenize } from '../utilities/tokenize';

class LoginService {
  userModel: UserModel;

  constructor() {
    this.userModel = new UserModel();
  }

  userLogin = async (login: ILogin) => {
    const { email, password } = login;

    const user = await UserModel.findOne({ where: { email, password } });
    // console.log('--------------->', user?.dataValues.id);
    if (user === null) {
      return ({ message: 'Email or passaword invalid' });
    } const loginToken = tokenize(user);

    return { token: loginToken };
  };
}

export default LoginService;
