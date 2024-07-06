import { Request, Response } from 'express';
import { importLeague, getTeams, getPlayers } from '../services/footballService';

export const importLeagueController = async (req: Request, res: Response) => {
  const { leagueCode } = req.body;
  if (!leagueCode) {
    return res.status(400).send({ error: 'leagueCode is required' });
  }

  try {
    await importLeague(leagueCode);
    res.status(200).send({ message: 'League imported successfully' });
  } catch (error) {
    const errorMessage = (error as Error).message || 'An unknown error occurred';
    res.status(500).send({ error: errorMessage });
  }
};
//TODO: PONER LIMITE Y PAGINADO
export const getTeamsController = async (req: Request, res: Response) => {
  const leagueCode = req.query.leagueCode as string;
  try {
    const teams = await getTeams(leagueCode);
    res.status(200).send(teams);
  } catch (error) {
    const errorMessage = (error as Error).message || 'An unknown error occurred';
    res.status(500).send({ error: errorMessage });
  }
};
//TODO: PONER LIMITE Y PAGINADO
export const getPlayersController = async (req: Request, res: Response) => {
  const leagueCode = req.query.leagueCode as string;
  const teamId = req.query.teamId as string;
  try {
    const result = await getPlayers(leagueCode, teamId);
    res.status(200).send(result);
  } catch (error) {
    const errorMessage = (error as Error).message || 'An unknown error occurred';
    res.status(500).send({ error: errorMessage });
  }
};
