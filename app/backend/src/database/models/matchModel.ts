import { Model, INTEGER, BOOLEAN } from 'sequelize';
import database from '.';

import Team from './teamModel';

class Match extends Model {
  id!: number;
  homeTeam!: number;
  homeTeamGoals!: number;
  awayTeam!: number;
  awayTeamGoals!: number;
  inProgress!: boolean;
}

Match.init(
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    homeTeam: {
      type: INTEGER,
      allowNull: false,
    },
    homeTeamGoals: {
      type: INTEGER,
      allowNull: false,
    },
    awayTeam: {
      type: INTEGER,
      allowNull: false,
    },
    awayTeamGoals: {
      type: INTEGER,
      allowNull: false,
    },
    inProgress: {
      type: BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize: database,
    modelName: 'Match',
    tableName: 'matches',
    underscored: true,
    timestamps: false,
  },
);

Match.belongsTo(Team, {
  foreignKey: 'homeTeam',
  as: 'teamHome',
});
Match.belongsTo(Team, {
  foreignKey: 'awayTeam',
  as: 'teamAway',
});
Match.hasMany(Match, {
  foreignKey: 'homeTeam',
  as: 'homeMatch',
});
Match.hasMany(Match, {
  foreignKey: 'awayTeam',
  as: 'awayMatch',
});

export default Match;
