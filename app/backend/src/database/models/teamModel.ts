import { Model, INTEGER, STRING } from 'sequelize';
import database from '.';

class Team extends Model {
  id!: number;
  teamName!: string;
}

Team.init(
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    teamName: {
      type: STRING,
      allowNull: false,
    },
  },
  {
    sequelize: database,
    modelName: 'Team',
    tableName: 'teams',
    underscored: true,
    timestamps: false,
  },
);

export default Team;
