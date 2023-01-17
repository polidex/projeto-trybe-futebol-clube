// import { Request, Response } from 'express';
// import LeaderboardService from '../services/leaderboard.service';

// class LeaderboardController {
//   leaderboardService: LeaderboardService;

//   constructor() {
//     this.leaderboardService = new LeaderboardService();
//   }

//   getLeaderboard = async (_req: Request, res: Response) => {
//     const result = await this.leaderboardService.getFinishedMatches();
//     return res.status(200).json(result);
//   };

//   getHomeLeaderboard = async (_req: Request, res: Response) => {
//     const result = await this.leaderboardService.getFinishedMatches('home');
//     return res.status(200).json(result);
//   };

//   getAwayLeaderboard = async (_req: Request, res: Response) => {
//     const result = await this.leaderboardService.getFinishedMatches('away');
//     return res.status(200).json(result);
//   };
// }

// export default LeaderboardController;
