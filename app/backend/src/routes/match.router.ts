import { Router } from 'express';
import isEqualTeams from '../middlewares/isEqualTeams';
import MatchController from '../controllers/match.controller';
import hasTeam from '../middlewares/hasTeam';
import tokenAuth from '../middlewares/tokenAuth';

const matchRouter = Router();

const matchController = new MatchController();

matchRouter.get('/', matchController.getMatches);

matchRouter.post('/', tokenAuth, hasTeam, isEqualTeams, matchController.createMatch);

matchRouter.patch('/:id', matchController.updateMatch);

matchRouter.patch('/:id/finish', matchController.finishMatch);

export default matchRouter;
