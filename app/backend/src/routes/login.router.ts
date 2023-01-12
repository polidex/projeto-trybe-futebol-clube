import { Router } from 'express';
import requiredFields from '../middlewares/requiredFields';
import hasUser from '../middlewares/hasUser';
import LoginController from '../controllers/login.controller';

const loginRouter = Router();

const loginController = new LoginController();

loginRouter.post(
  '/',
  hasUser,
  requiredFields,
  loginController.userLogin,
);

export default loginRouter;
