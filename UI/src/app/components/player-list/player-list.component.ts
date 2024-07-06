import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import { FootballService } from '../../services/football.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css'] 
})
export class PlayerListComponent implements OnInit {
  teamId: number = 0;
  team: any;
  players: any[] = [];
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private footballService: FootballService
  ) {}

  ngOnInit(): void {
    this.teamId = +(this.route.snapshot.paramMap.get('id') ?? 0);
    this.loadPlayers();
  }

  loadPlayers() {
    this.loading = true;
    this.footballService.getPlayers(this.teamId).subscribe(
      data => {
        this.players = data.players;
        this.team = data.team;
        this.loading = false;
      },
      error => {
        console.error('Error fetching players:', error);
        this.loading = false;
      }
    );
  }

  goBack() {
    this.router.navigate(['/teams']);
  }
}
