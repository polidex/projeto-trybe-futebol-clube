import ILeaderBoard from '../interfaces/ILeaderBoard.interface';
import MatchModel from '../database/models/matchModel';

class Leaderboard {
  public id: number;
  public teamName: string;
  public matches: MatchModel[];
  private _totalPoints!: number;
  private _totalGames!: number;
  private _totalVictories!: number;
  private _totalDraws!: number;
  private _totalLosses!: number;
  private _goalsFavor!: number;
  private _goalsOwn!: number;
  private _goalsBalance!: number;
  private _efficiency!: string;

  constructor(id: number, teamName: string, matches: MatchModel[]) {
    this.id = id;
    this.teamName = teamName;
    this.matches = matches;
    this.totalGames();
    this.totalVictories();
    this.totalDraws();
    this.totalLosses();
    this.goalsFavor();
    this.goalsOwn();
    this.goalsBalance();
    this.totalPoints();
    this.efficiency();
  }

  public generateBoard(): ILeaderBoard {
    const board = {
      name: this.teamName,
      totalPoints: this._totalPoints,
      totalGames: this._totalGames,
      totalVictories: this._totalVictories,
      totalDraws: this._totalDraws,
      totalLosses: this._totalLosses,
      goalsFavor: this._goalsFavor,
      goalsOwn: this._goalsOwn,
      goalsBalance: this._goalsBalance,
      efficiency: this._efficiency,
    };
    return board;
  }

  private totalGames(): void {
    const total = this.matches.reduce((sum, curr) => {
      if (this.id === curr.homeTeam) return sum + 1;
      if (this.id === curr.awayTeam) return sum + 1;
      return sum;
    }, 0);
    this._totalGames = total;
  }

  private totalVictories(): void {
    const total = this.matches.reduce((sum, curr) => {
      if (this.id === curr.homeTeam
          && curr.homeTeamGoals > curr.awayTeamGoals) return sum + 1;
      if (this.id === curr.awayTeam
          && curr.awayTeamGoals > curr.homeTeamGoals) return sum + 1;
      return sum;
    }, 0);
    this._totalVictories = total;
  }

  private totalDraws(): void {
    const total = this.matches.reduce((sum, curr) => {
      if (this.id === curr.homeTeam
          && curr.homeTeamGoals === curr.awayTeamGoals) return sum + 1;
      if (this.id === curr.awayTeam
          && curr.awayTeamGoals === curr.homeTeamGoals) return sum + 1;
      return sum;
    }, 0);
    this._totalDraws = total;
  }

  private totalLosses(): void {
    const total = this.matches.reduce((sum, curr) => {
      if (this.id === curr.homeTeam
          && curr.homeTeamGoals < curr.awayTeamGoals) return sum + 1;
      if (this.id === curr.awayTeam
          && curr.awayTeamGoals < curr.homeTeamGoals) return sum + 1;
      return sum;
    }, 0);
    this._totalLosses = total;
  }

  private goalsFavor(): void {
    const total = this.matches.reduce((sum, curr) => {
      if (this.id === curr.homeTeam) return sum + curr.homeTeamGoals;
      if (this.id === curr.awayTeam) return sum + curr.awayTeamGoals;
      return sum;
    }, 0);
    this._goalsFavor = total;
  }

  private goalsOwn(): void {
    const total = this.matches.reduce((sum, curr) => {
      if (this.id === curr.homeTeam) return sum + curr.awayTeamGoals;
      if (this.id === curr.awayTeam) return sum + curr.homeTeamGoals;
      return sum;
    }, 0);
    this._goalsOwn = total;
  }

  private goalsBalance(): void {
    this._goalsBalance = this._goalsFavor - this._goalsOwn;
  }

  private totalPoints(): void {
    this._totalPoints = (this._totalVictories * 3) + this._totalDraws;
  }

  private efficiency(): void {
    const result = (this._totalPoints / (this._totalGames * 3)) * 100;

    this._efficiency = result.toFixed(2);
  }
}

export default Leaderboard;
