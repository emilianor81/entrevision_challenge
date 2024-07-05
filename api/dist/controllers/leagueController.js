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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeagueController = void 0;
const footballService_1 = require("../services/footballService");
class LeagueController {
    importLeague(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const leagueCode = req.body.leagueCode;
            try {
                yield footballService_1.footballService.importLeague(leagueCode);
                res.status(200).send({ message: 'League imported successfully' });
            }
            catch (error) {
                res.status(500).send({ error: error.message });
            }
        });
    }
    getTeams(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const leagueCode = req.query.leagueCode;
            try {
                const teams = yield footballService_1.footballService.getTeams(leagueCode);
                res.status(200).send(teams);
            }
            catch (error) {
                res.status(500).send({ error: error.message });
            }
        });
    }
    getPlayers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const leagueCode = req.query.leagueCode;
            const teamId = req.query.teamId;
            try {
                const players = yield footballService_1.footballService.getPlayers(leagueCode, teamId);
                res.status(200).send(players);
            }
            catch (error) {
                res.status(500).send({ error: error.message });
            }
        });
    }
}
exports.LeagueController = LeagueController;
