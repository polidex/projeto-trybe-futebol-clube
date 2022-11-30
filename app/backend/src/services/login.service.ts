import UserModel from '../database/models/userModel';
import ILogin from '../interfaces/login.interface';

class LoginService {
  userModel: UserModel;

  constructor() {
    this.userModel = new UserModel();
  }

  userLogin = async (login: ILogin) => {
    const { email, password } = login;

    const result = await UserModel.findOne({ where: { email, password } });
    return result;
  };
}

export default LoginService;
