import { Request, Response } from 'express';
import TeamService from '../services/team.service';

class TeamController {
  teamService: TeamService;

  constructor() {
    this.teamService = new TeamService();
  }

  getTeams = async (_req: Request, res: Response) => {
    const result = await this.teamService.getTeams();
    return res.status(result.status).json(result.message);
  };

  getTeamsById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.teamService.getTeamsById(id);
    return res.status(result.status).json(result.message);
  };
}

export default TeamController;
