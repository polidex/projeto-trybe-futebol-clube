import { Router } from 'express';
import requiredFields from '../middlewares/requiredFields';
import hasUser from '../middlewares/hasUser';
// import emailValidation from '../middlewares/emailValidation';
import LoginController from '../controllers/login.controller';

const loginRouter = Router();

const loginController = new LoginController();

loginRouter.post('/', hasUser, requiredFields, /* emailValidation, */ loginController.userLogin);

export default loginRouter;
