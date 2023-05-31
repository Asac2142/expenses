import { Routes } from '@angular/router';

const transactionsComponent = () => import('./pages/transactions/transactions.component').then(c => c.TransactionsComponent);
const analitycsComponent = () => import('./pages/analytics/analytics.component').then(c => c.AnalyticsComponent);
const homeComponent = () => import('./pages/home/home.page').then(c => c.HomePage);

export const routes: Routes = [
  { path: '', redirectTo: 'transactions', pathMatch: 'full' },
  {
    path: '',
    loadComponent: homeComponent,
    children: [
      { path: 'transactions', loadComponent: transactionsComponent },
      { path: 'analytics', loadComponent: analitycsComponent }
    ]
  },
  { path: '**', redirectTo: 'transactions' }
];
