import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@mini-crm/data-access';

/**
 * Authentication interceptor to add JWT token to HTTP requests.
 *
 * Automatically adds the `Authorization: Bearer {token}` header to all HTTP requests
 * if the user is authenticated.
 *
 * @usageNotes
 * ### Register in app.config.ts
 * ```typescript
 * import { provideHttpClient, withInterceptors } from '@angular/common/http';
 * import { authInterceptor } from '@mini-crm/feature-auth';
 *
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideHttpClient(withInterceptors([authInterceptor])),
 *     // ... other providers
 *   ]
 * };
 * ```
 *
 * **TODO**: Register this interceptor in `app.config.ts` during training session.
 *
 * @category Feature Auth
 * @see AuthService
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.token();

  // Si le token existe, ajouter le header Authorization
  if (token) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(clonedReq);
  }

  // Sinon, passer la requête telle quelle
  return next(req);
};

