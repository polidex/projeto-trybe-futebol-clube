import { Router } from 'express';
import requiredFields from '../middlewares/requiredFields';
import LoginController from '../controllers/login.controller';

const loginRouter = Router();

const loginController = new LoginController();

loginRouter.post('/', requiredFields, loginController.userLogin);

export default loginRouter;
