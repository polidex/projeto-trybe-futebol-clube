import { Router } from 'express';
import isEqualTeams from '../middlewares/isEqualTeams';
import MatchController from '../controllers/match.controller';

const matchRouter = Router();

const matchController = new MatchController();

matchRouter.get('/', matchController.getMatches);

matchRouter.post('/', isEqualTeams, matchController.createMatch);

matchRouter.patch('/:id/finish', matchController.finishMatch);

export default matchRouter;
