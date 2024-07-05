import axios from 'axios';
import { Competition } from '../entities/Competition';
import { Team } from '../entities/Team';
import { Player } from '../entities/Player';
import dotenv from 'dotenv';

dotenv.config();

const API_TOKEN = process.env.API_TOKEN || ''; 
const MAX_REQUESTS_PER_MINUTE = 10;
const TIME_FRAME = 60000; 

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


const requestWithExponentialBackoff = async (
  url: string,
  headers: object,
  retries: number = 10,
  delayMs: number = 1000,
  timeoutMs: number = 5000 
) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await axios.get(url, { headers, timeout: timeoutMs });
      return response;
    } catch (error: any) {
      if (error.response && error.response.status === 429) {
        const waitTime = delayMs * Math.pow(2, i);
        console.log(`Rate limit hit. Retrying in ${waitTime}ms...`);
        await delay(waitTime);
      } else if (error.code === 'ECONNABORTED') {
        console.log(`Request timed out. Retrying (${i + 1}/${retries})...`);
        await delay(delayMs * (i + 1));
      } else {
        throw error;
      }
    }
  }
  throw new Error('Exceeded maximum retries');
};

export const importLeague = async (leagueCode: string) => {
  try {
    const response = await requestWithExponentialBackoff(
      `https://api.football-data.org/v4/competitions/${leagueCode}`,
      { 'X-Auth-Token': API_TOKEN }
    );
    const competitionData = response.data;

    let competition = await Competition.findOne({ where: { code: competitionData.code } });
    
    if (!competition) {
      competition = await Competition.create({
        name: competitionData.name,
        code: competitionData.code,
      });
    }

    const teamsResponse = await requestWithExponentialBackoff(
      `https://api.football-data.org/v4/competitions/${leagueCode}/teams`,
      { 'X-Auth-Token': API_TOKEN }
    );

    let requestCount = 0;
    const teamQueue = [];

    for (const teamData of teamsResponse.data.teams) {
      teamQueue.push(async () => {
        let team = await Team.findOne({ where: { tla: teamData.tla } });

        if (!team) {
          team = await Team.create({
            name: teamData.name,
            tla: teamData.tla,
            shortName: teamData.shortName || '',
            crest: teamData.crest || '',
            competitionId: competition.id,
          });
        }

        const playersResponse = await requestWithExponentialBackoff(
          `https://api.football-data.org/v4/teams/${teamData.id}`,
          { 'X-Auth-Token': API_TOKEN }
        );

        for (const playerData of playersResponse.data.squad) {
          await Player.create({
            name: playerData.name || 'Unknown',
            position: playerData.position || 'Unknown',
            dateOfBirth: playerData.dateOfBirth || 'Unknown',
            nationality: playerData.nationality || 'Unknown',
            teamId: team.id,
          });
        }
      });

      if (++requestCount % MAX_REQUESTS_PER_MINUTE === 0) {
        console.log('Rate limit reached. Waiting for the next minute...');
        await delay(TIME_FRAME);
      }
    }

    for (const task of teamQueue) {
      await task();
    }
  } catch (error) {
    console.error('Error importing league:', error);
    throw error;
  }
};

export const getTeams = async (leagueCode: string) => {
  const competition = await Competition.findOne({ where: { code: leagueCode }, include: [{ model: Team, as: 'teams' }] });

  if (!competition) {
    throw new Error('League not found');
  }

  return competition.teams || [];
};

export const getPlayers = async (leagueCode?: string, teamId?: string) => {
  if (teamId) {
    const team = await Team.findOne({ where: { id: parseInt(teamId, 10) }, include: [{ model: Player, as: 'players' }] });

    if (!team) {
      throw new Error('Team not found');
    }

    return team.players || [];
  } else if (leagueCode) {
    const competition = await Competition.findOne({
      where: { code: leagueCode },
      include: [{ model: Team, as: 'teams', include: [{ model: Player, as: 'players' }] }]
    });

    if (!competition) {
      throw new Error('League not found');
    }

    const teams = competition.teams || [];
    const players = teams.flatMap(team => team.players || []);
    return players;
  } else {
    throw new Error('Either leagueCode or teamId must be provided');
  }
};



