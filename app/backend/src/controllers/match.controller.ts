import { Request, Response } from 'express';
import MatchService from '../services/match.service';

class MatchController {
  matchService: MatchService;

  constructor() {
    this.matchService = new MatchService();
  }

  getMatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;

    if (inProgress) {
      const inProgressTrue = inProgress === 'true';
      const result = await this.matchService.getMatchesInProgress(inProgressTrue);
      return res.status(result.status).json(result.message);
    }
    const result = await this.matchService.getMatches();
    return res.status(result.status).json(result.message);
  };

  createMatch = async (req: Request, res: Response) => {
    const newMatch = req.body;
    const result = await this.matchService.createMatch(newMatch);
    return res.status(result.status).json(result.message);
  };

  finishMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.matchService.finishMatch(id);
    return res.status(result.status).json(result.message);
  };
}

export default MatchController;
