import Leaderboard from '../utilities/leaderboard';
import MatchModel from '../database/models/matchModel';
import TeamModel from '../database/models/teamModel';
import ILeaderBoard from '../interfaces/ILeaderBoard.interface';

class LearderboardService {
  matchModel: MatchModel;
  teamModel: TeamModel;

  constructor() {
    this.matchModel = new MatchModel();
    this.teamModel = new TeamModel();
  }

  getFinishedMatches = async (location?: string) => {
    const matches = await MatchModel.findAll({ where: { inProgress: false } });
    const teams = await TeamModel.findAll();
    let finishedMatches = matches;

    const board = teams.map((team: TeamModel) => {
      if (location === 'home') {
        finishedMatches = this.filterHomeMatches(team.id, matches);
      }
      if (location === 'away') {
        finishedMatches = this.filterAwayMatches(team.id, matches);
      }
      const leaderboard = new Leaderboard(team.id, team.teamName, finishedMatches);
      return leaderboard.generateBoard();
    });
    return this.sortLeaderboard(board);
  };

  sortLeaderboard = (board: ILeaderBoard[]): ILeaderBoard[] => {
    const result = board.sort((a, b) => b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || b.goalsOwn - a.goalsOwn);
    return result;
  };

  filterHomeMatches = (id: number, matches: MatchModel[]): MatchModel[] => matches
    .filter((match) => id === match.homeTeam);

  filterAwayMatches = (id: number, matches: MatchModel[]): MatchModel[] => matches
    .filter((match) => id === match.awayTeam);
}

export default LearderboardService;
