import { Request, Response } from 'express';
import LoginService from '../services/login.service';
import { tokenize } from '../utilities/tokenize';

class LoginController {
  loginService: LoginService;

  constructor() {
    this.loginService = new LoginService();
  }

  userLogin = async (req: Request, res: Response) => {
    const login = req.body;

    const result = await this.loginService.userLogin(login);
    if (result === undefined) {
      return res.status(401).json({ message: 'Email or passaword invalid' });
    }
    const loginToken = tokenize(login);
    return res.status(200).json({ token: loginToken });
  };
}

export default LoginController;
