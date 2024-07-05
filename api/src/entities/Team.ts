import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../utils/db';
import { Player } from './Player';

interface TeamAttributes {
  id: number;
  name: string;
  tla: string;
  shortName: string;
  crest: string;
  competitionId: number;
}

interface TeamCreationAttributes extends Optional<TeamAttributes, 'id'> {}

export class Team extends Model<TeamAttributes, TeamCreationAttributes> implements TeamAttributes {
  public id!: number;
  public name!: string;
  public tla!: string;
  public shortName!: string;
  public crest!: string;
  public competitionId!: number;
  public players?: Player[];
}

Team.init(
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
    tla: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shortName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    crest: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    competitionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Team',
  }
);

Team.hasMany(Player, {
  sourceKey: 'id',
  foreignKey: 'teamId',
  as: 'players',
});
Player.belongsTo(Team, { foreignKey: 'teamId', as: 'team' });
