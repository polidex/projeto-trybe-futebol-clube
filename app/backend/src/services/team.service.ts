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

  getTeamsById = async (id: string) => {
    const teamId = await TeamModel.findByPk(id);
    if (teamId === null) return { status: 404, message: 'Team id not found...' };
    return { status: 200, message: teamId };
  };
}

export default TeamService;
