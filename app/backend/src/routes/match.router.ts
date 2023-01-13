import { Router } from 'express';
import MatchController from '../controllers/match.controller';

const matchRouter = Router();

const matchController = new MatchController();

matchRouter.get('/', matchController.getMatches);

export default matchRouter;
