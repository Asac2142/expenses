import { Routes } from '@angular/router';

const homeComponent = () => import('./home/home.page').then(m => m.HomePage);

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadComponent: homeComponent },
];
