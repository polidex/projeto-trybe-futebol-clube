import { Request, Response, NextFunction } from 'express';
import TeamService from '../services/team.service';

const hasTeam = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;
  const teamService = new TeamService();
  const hostTeam = await teamService.getTeamsById(homeTeam);
  const visitorTeam = await teamService.getTeamsById(awayTeam);

  if (!hostTeam || !visitorTeam) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }
  next();
};

export default hasTeam;
