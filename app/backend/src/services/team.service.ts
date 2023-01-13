import TeamModel from '../database/models/teamModel';

class TeamService {
  teamModel: TeamModel;

  constructor() {
    this.teamModel = new TeamModel();
  }

  getTeams = async () => {
    const teams = await TeamModel.findAll();
    return { status: 200, message: teams };
  };
}

export default TeamService;
