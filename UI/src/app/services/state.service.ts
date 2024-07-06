import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private teams: any[] = [];
  private leagueCode: string = '';

  setTeams(teams: any[], leagueCode: string) {
    this.teams = teams;
    this.leagueCode = leagueCode;
  }

  getTeams() {
    return this.teams;
  }

  getLeagueCode() {
    return this.leagueCode;
  }

  clearTeams() {
    this.teams = [];
    this.leagueCode = '';
  }
}