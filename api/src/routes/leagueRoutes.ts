import { Router } from 'express';
import {
  importLeagueController,
  getTeamsController,
  getPlayersController
} from '../controllers/leagueController';

const router = Router();
//Todo: SWAGGER, hacer un archivo de swagger con los doc de endpoint
//Todo: mejorar el README!!! SI O SIII!!!
router.post('/import-league', importLeagueController);
router.get('/teams', getTeamsController);
router.get('/players', getPlayersController);


export { router as leagueRoutes };
