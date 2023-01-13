import { Request, Response } from 'express';
import MatchService from '../services/match.service';

class MatchController {
  matchService: MatchService;

  constructor() {
    this.matchService = new MatchService();
  }

  getMatches = async (req: Request, res: Response) => {
    const result = await this.matchService.getMatches();
    return res.status(result.status).json(result.message);
  };
}

export default MatchController;
