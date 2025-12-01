import { Routes } from '@angular/router';
// import { authGuard } from '@mini-crm/feature-auth';

/**
 * Main application routes with lazy loading
 *
 * TODO: Ajouter authGuard sur la route orders en formation
 * Note: Le guard ne peut pas être importé statiquement depuis une lib lazy-loadée.
 * Solution en formation: Déplacer le guard dans data-access ou créer une lib shared-guards.
 */
export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/auth/sign-in',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('@mini-crm/feature-auth').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'orders',
    // TODO: Activer en formation après avoir déplacé le guard
    // canActivate: [authGuard],
    loadChildren: () =>
      import('@mini-crm/feature-orders').then((m) => m.ORDERS_ROUTES),
  },
];
