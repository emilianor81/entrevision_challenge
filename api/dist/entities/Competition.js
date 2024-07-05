"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Competition = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../utils/db"));
const Team_1 = require("./Team");
class Competition extends sequelize_1.Model {
}
exports.Competition = Competition;
Competition.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    code: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: db_1.default,
    modelName: 'Competition',
});
Competition.hasMany(Team_1.Team, {
    sourceKey: 'id',
    foreignKey: 'competitionId',
    as: 'teams',
});
Team_1.Team.belongsTo(Competition, { foreignKey: 'competitionId', as: 'competition' });
