import { Component, OnInit } from '@angular/core';
import { FootballService } from '../../services/football.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-team-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './team-list.component.html',
})
export class TeamListComponent implements OnInit {
  leagueCode: string = '';
  teams: any[] = [];
  filteredTeams: any[] = [];
  filter: string = '';

  constructor(private footballService: FootballService) { }

  ngOnInit(): void {}

  loadTeams() {
    this.footballService.getTeams(this.leagueCode).subscribe(data => {
      this.teams = data;
      this.filteredTeams = data;
    });
  }

  filterTeams() {
    this.filteredTeams = this.teams.filter(team => 
      team.name.toLowerCase().includes(this.filter.toLowerCase())
    );
  }
}
