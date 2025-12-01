import { CanActivateFn } from '@angular/router';
// import { inject } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from '@mini-crm/data-access';

/**
 * Authentication guard to protect routes.
 *
 * **Note**: This guard is currently in preparatory mode and returns `true` to allow all access.
 * It will be activated during the training session to enforce authentication.
 *
 * @usageNotes
 * ### Apply to routes
 * ```typescript
 * {
 *   path: 'orders',
 *   canActivate: [authGuard],
 *   loadChildren: () => import('@mini-crm/feature-orders').then(m => m.ORDERS_ROUTES)
 * }
 * ```
 *
 * ### How to activate during training
 * Uncomment the code below and replace `return true;` with the authentication logic.
 *
 * @category Feature Auth
 * @see AuthService
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const authGuard: CanActivateFn = (_route, _state) => {
  // ============================================
  // PRÉPARATOIRE : Retourne true pour ne pas bloquer l'accès
  // ============================================
  return true;

  // ============================================
  // À ACTIVER EN FORMATION
  // ============================================
  // const authService = inject(AuthService);
  // const router = inject(Router);
  //
  // if (authService.isAuthenticated()) {
  //   return true;
  // }
  //
  // // Redirection vers la page de connexion
  // return router.createUrlTree(['/auth/sign-in']);
};

