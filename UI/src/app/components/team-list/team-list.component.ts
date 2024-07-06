import { Component, OnInit } from '@angular/core';
import { FootballService } from '../../services/football.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-team-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']  
})
export class TeamListComponent implements OnInit {
  leagueCode: string = '';
  teams: any[] = [];
  filteredTeams: any[] = [];
  filter: string = '';
  isValidInput: boolean = false;

  constructor(private footballService: FootballService) { }

  ngOnInit(): void {}

  validateInput() {
    this.isValidInput = this.leagueCode.length >= 2;
  }

  loadTeams() {
    this.teams = [];
    this.filteredTeams = [];
    
    this.footballService.getTeams(this.leagueCode).subscribe(data => {
      if (data.length === 0) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No league found with the entered code.'
        });
      } else {
        this.teams = data;
        this.filteredTeams = data;
      }
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while fetching the teams.'
      });
    });
  }

  filterTeams() {
    this.filteredTeams = this.teams.filter(team => 
      team.name.toLowerCase().includes(this.filter.toLowerCase())
    );
  }
}
