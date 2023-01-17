import IMatch from '../interfaces/match.interface';
import IMatchUpdate from '../interfaces/MatchUpdate.interface';
import MatchModel from '../database/models/matchModel';
import TeamModel from '../database/models/teamModel';

class MatchService {
  matchModel: MatchModel;

  constructor() {
    this.matchModel = new MatchModel();
  }

  getMatches = async () => {
    const matches = await MatchModel.findAll({
      include: [
        { model: TeamModel, as: 'teamHome', attributes: ['teamName'] },
        { model: TeamModel, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return { status: 200, message: matches };
  };

  getMatchesInProgress = async (isInProgress: boolean) => {
    const matches = await MatchModel.findAll({
      include: [
        { model: TeamModel, as: 'teamHome', attributes: ['teamName'] },
        { model: TeamModel, as: 'teamAway', attributes: ['teamName'] },
      ],
      where: { inProgress: isInProgress },
    });
    return { status: 200, message: matches };
  };

  createMatch = async (newMatch: IMatch) => {
    const match = await MatchModel.create({ ...newMatch, inProgress: true });
    return { status: 201, message: match };
  };

  finishMatch = async (id: string | undefined) => {
    await MatchModel.update({ inProgress: false }, { where: { id } });
    return { status: 200, message: 'Finished' };
  };

  updateMatch = async (id: string | undefined, matchInfo: IMatchUpdate) => {
    const { homeTeamGoals, awayTeamGoals } = matchInfo;
    await MatchModel.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });

    return { status: 200, message: 'Match updated' };
  };
}

export default MatchService;
