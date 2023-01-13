import MatchModel from '../database/models/matchModel';
import Team from '../database/models/teamModel';

class MatchService {
  matchModel: MatchModel;

  constructor() {
    this.matchModel = new MatchModel();
  }

  getMatches = async () => {
    const matches = await MatchModel.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return { status: 200, message: matches };
  };
}

export default MatchService;
