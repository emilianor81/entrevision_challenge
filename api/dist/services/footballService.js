"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.footballService = void 0;
const axios_1 = __importDefault(require("axios"));
const Competition_1 = require("../entities/Competition");
const Team_1 = require("../entities/Team");
const Player_1 = require("../entities/Player");
class FootballService {
    importLeague(leagueCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.get(`https://api.football-data.org/v4/competitions/${leagueCode}`, {
                headers: { 'X-Auth-Token': `apiiiiii` }
            });
            const competitionData = response.data;
            let competition = yield Competition_1.Competition.findOne({ where: { code: competitionData.code } });
            if (!competition) {
                competition = yield Competition_1.Competition.create({
                    name: competitionData.name,
                    code: competitionData.code,
                });
            }
            const teamsResponse = yield axios_1.default.get(`https://api.football-data.org/v4/competitions/${leagueCode}/teams`, {
                headers: { 'X-Auth-Token': `apiiii` }
            });
            for (const teamData of teamsResponse.data.teams) {
                let team = yield Team_1.Team.findOne({ where: { tla: teamData.tla } });
                if (!team) {
                    team = yield Team_1.Team.create({
                        name: teamData.name,
                        tla: teamData.tla,
                        shortName: teamData.shortName,
                        crest: teamData.crest,
                        competitionId: competition.id,
                    });
                    const playersResponse = yield axios_1.default.get(`https://api.football-data.org/v4/teams/${teamData.id}`, {
                        headers: { 'X-Auth-Token': `apiii` }
                    });
                    for (const playerData of playersResponse.data.squad) {
                        yield Player_1.Player.create({
                            name: playerData.name,
                            position: playerData.position,
                            dateOfBirth: playerData.dateOfBirth,
                            nationality: playerData.nationality,
                            teamId: team.id,
                        });
                    }
                }
            }
        });
    }
    getTeams(leagueCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const competition = yield Competition_1.Competition.findOne({ where: { code: leagueCode }, include: [{ model: Team_1.Team, as: 'teams' }] });
            if (!competition) {
                throw new Error('League not found');
            }
            return competition.teams || [];
        });
    }
    getPlayers(leagueCode, teamId) {
        return __awaiter(this, void 0, void 0, function* () {
            const competition = yield Competition_1.Competition.findOne({ where: { code: leagueCode }, include: [{ model: Team_1.Team, as: 'teams', include: [{ model: Player_1.Player, as: 'players' }] }] });
            if (!competition) {
                throw new Error('League not found');
            }
            const teams = competition.teams || [];
            if (teamId) {
                const team = teams.find(t => t.id === parseInt(teamId));
                return team ? team.players || [] : [];
            }
            const players = teams.flatMap(team => team.players || []);
            return players;
        });
    }
}
exports.footballService = new FootballService();
