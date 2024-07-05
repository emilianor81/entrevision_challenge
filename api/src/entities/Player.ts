import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../utils/db';

interface PlayerAttributes {
  id: number;
  name: string;
  position: string;
  dateOfBirth: string;
  nationality: string;
  teamId: number;
}

interface PlayerCreationAttributes extends Optional<PlayerAttributes, 'id'> {}

export class Player extends Model<PlayerAttributes, PlayerCreationAttributes> implements PlayerAttributes {
  public id!: number;
  public name!: string;
  public position!: string;
  public dateOfBirth!: string;
  public nationality!: string;
  public teamId!: number;
}

Player.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nationality: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    teamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Player',
  }
);
