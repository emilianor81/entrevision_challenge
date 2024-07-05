"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../utils/db"));
class Player extends sequelize_1.Model {
}
exports.Player = Player;
Player.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    position: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    dateOfBirth: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    nationality: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    teamId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: db_1.default,
    modelName: 'Player',
});
