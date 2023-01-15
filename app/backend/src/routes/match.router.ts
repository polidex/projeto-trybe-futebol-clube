import { Router } from 'express';
import MatchController from '../controllers/match.controller';

const matchRouter = Router();

const matchController = new MatchController();

matchRouter.get('/', matchController.getMatches);

matchRouter.post('/', matchController.createMatch);

export default matchRouter;
