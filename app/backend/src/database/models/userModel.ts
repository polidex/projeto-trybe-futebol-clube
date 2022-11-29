import { Model, INTEGER, STRING } from 'sequelize';
import database from '.';

class User extends Model {
  id!: number;
  role!: string;
  username!: string;
  email!: string;
  password!: string;
}

User.init(
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    role: {
      type: STRING,
      allowNull: false,
    },
    username: {
      type: STRING,
      allowNull: false,
    },
    email: {
      type: STRING,
      allowNull: false,
    },
    password: {
      type: STRING,
      allowNull: false,
    },
  },
  {
    sequelize: database,
    modelName: 'User',
    tableName: 'users',
    timestamps: false,
  },
);

export default User;
