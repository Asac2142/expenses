import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

const homeComponent = () => import('./pages/home/home.page').then(c => c.HomePage);
const transactionsComponent = () => import('./pages/transactions/transactions.component').then(c => c.TransactionsComponent);
const analitycsComponent = () => import('./pages/analytics/analytics.component').then(c => c.AnalyticsComponent);

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'transactions' },
      {
        path: '',
        loadComponent: homeComponent,
        children: [
          { path: 'transactions', loadComponent: transactionsComponent },
          { path: 'analytics', loadComponent: analitycsComponent }
        ]
      }
    ]
  },
  { path: '**', redirectTo: '' }
];
