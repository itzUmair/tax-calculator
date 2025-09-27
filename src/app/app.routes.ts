import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'tax', pathMatch: 'full' },
  {
    path: 'tax',
    loadComponent: () => import('./pages/tax/tax').then(component => component.Tax)
  }
];
