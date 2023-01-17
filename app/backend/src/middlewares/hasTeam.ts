import { Request, Response, NextFunction } from 'express';
import TeamModel from '../database/models/teamModel';

const hasTeam = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;
  const hostTeam = await TeamModel.findByPk(homeTeam);
  const visitorTeam = await TeamModel.findByPk(awayTeam);

  if (!hostTeam || !visitorTeam) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }
  next();
};

export default hasTeam;
