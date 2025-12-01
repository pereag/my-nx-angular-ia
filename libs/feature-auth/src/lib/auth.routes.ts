import { Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in.component';
import { SignUpComponent } from './components/sign-up.component';

/**
 * Routes for the authentication feature.
 *
 * @usageNotes
 * ### Lazy load in app.routes.ts
 * ```typescript
 * {
 *   path: 'auth',
 *   loadChildren: () => import('@mini-crm/feature-auth').then(m => m.AUTH_ROUTES)
 * }
 * ```
 *
 * @category Feature Auth
 */
export const AUTH_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full',
  },
  {
    path: 'sign-in',
    component: SignInComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
];

