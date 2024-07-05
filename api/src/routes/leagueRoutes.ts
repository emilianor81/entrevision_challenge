import { Router } from 'express';
import {
  importLeagueController,
/*   importAllLeaguesController,
 */  getTeamsController,
  getPlayersController
} from '../controllers/leagueController';

const router = Router();
//Todo: SWAGGER, hacer un archivo de swagger con los doc de endpoint
router.post('/index', (req, res) => {
  console.log('ENTRO AL INDEX!!!!');
  res.send('Index endpoint');
});

router.post('/import-league', importLeagueController);
router.get('/teams', getTeamsController);
router.get('/players', getPlayersController);

export { router as leagueRoutes };
