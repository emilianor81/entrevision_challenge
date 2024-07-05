/* import { Routes } from '@angular/router';

export const routes: Routes = []; */

import { Routes } from '@angular/router';
import { TeamListComponent } from './components/team-list/team-list.component';
import { PlayerListComponent } from './components/player-list/player-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/teams', pathMatch: 'full' },
  { path: 'teams', component: TeamListComponent },
  { path: 'teams/:id', component: PlayerListComponent }
];
