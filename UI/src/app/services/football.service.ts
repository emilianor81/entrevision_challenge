import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FootballService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getTeams(leagueCode: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/teams?leagueCode=${leagueCode}`);
  }

  getPlayers(teamId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/players?teamId=${teamId}`);
  }
}
