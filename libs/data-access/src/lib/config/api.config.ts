import { InjectionToken } from '@angular/core';

/**
 * Configuration de l'API backend.
 *
 * @category Configuration
 */
export interface ApiConfig {
  /**
   * URL de base de l'API backend
   * @example 'http://localhost:3000'
   */
  apiUrl: string;
}

/**
 * Token d'injection pour la configuration de l'API.
 *
 * Permet d'injecter l'URL de l'API dans les services sans dépendre
 * directement des fichiers environment de l'application.
 *
 * @usageNotes
 * ### Dans un service
 * ```typescript
 * export class OrdersService {
 *   private readonly apiConfig = inject(API_CONFIG);
 *   private readonly apiUrl = this.apiConfig.apiUrl;
 * }
 * ```
 *
 * ### Dans app.config.ts
 * ```typescript
 * import { API_CONFIG } from '@mini-crm/data-access';
 * import { environment } from '../environments/environment';
 *
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     { provide: API_CONFIG, useValue: { apiUrl: environment.apiUrl } }
 *   ]
 * };
 * ```
 *
 * @see ApiConfig
 * @category Configuration
 */
export const API_CONFIG = new InjectionToken<ApiConfig>('API_CONFIG');

