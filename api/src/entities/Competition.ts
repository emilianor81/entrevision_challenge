import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../utils/db';
import { Team } from './Team';

interface CompetitionAttributes {
  id: number;
  name: string;
  code: string;
}

interface CompetitionCreationAttributes extends Optional<CompetitionAttributes, 'id'> {}

export class Competition extends Model<CompetitionAttributes, CompetitionCreationAttributes>
  implements CompetitionAttributes {
  public id!: number;
  public name!: string;
  public code!: string;
  public teams?: Team[];
}

Competition.init(
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
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Competition',
  }
);

Competition.hasMany(Team, {
  sourceKey: 'id',
  foreignKey: 'competitionId',
  as: 'teams',
});
Team.belongsTo(Competition, { foreignKey: 'competitionId', as: 'competition' });
