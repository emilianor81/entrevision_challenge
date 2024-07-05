import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FootballService } from '../../services/football.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-list.component.html',
})
export class PlayerListComponent implements OnInit {
  teamId: number = 0;
  team: any;
  players: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private footballService: FootballService
  ) {}

  ngOnInit(): void {
    this.teamId = +(this.route.snapshot.paramMap.get('id') ?? 0);
    this.loadPlayers();
  }

  loadPlayers() {
    this.footballService.getPlayers(this.teamId).subscribe(data => {
      this.players = data.players;
      this.team = data.team;
    });
  }
}
