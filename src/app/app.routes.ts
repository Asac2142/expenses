import { Routes } from '@angular/router';

const transactionsComponent = () => import('./pages/transactions/transactions.component').then(c => c.TransactionsComponent);
const analitycsComponent = () => import('./pages/analytics/analytics.component').then(c => c.AnalyticsComponent);

export const routes: Routes = [
  { path: '', redirectTo: 'transactions', pathMatch: 'full' },
  { path: 'transactions', loadComponent: transactionsComponent },
  { path: 'analytics', loadComponent: analitycsComponent },
  { path: '**', redirectTo: 'transactions' }
];
