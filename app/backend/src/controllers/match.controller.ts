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
}

export default MatchController;
