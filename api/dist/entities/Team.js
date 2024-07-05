"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Team = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../utils/db"));
const Player_1 = require("./Player");
class Team extends sequelize_1.Model {
}
exports.Team = Team;
Team.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    tla: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    shortName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    crest: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    competitionId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: db_1.default,
    modelName: 'Team',
});
Team.hasMany(Player_1.Player, {
    sourceKey: 'id',
    foreignKey: 'teamId',
    as: 'players',
});
Player_1.Player.belongsTo(Team, { foreignKey: 'teamId', as: 'team' });
