/**
 * Configuration pour l'environnement de production.
 *
 * Ce fichier remplace environment.ts lors des builds de production
 * grâce à la configuration fileReplacements dans project.json.
 *
 * @category Configuration
 */
export const environment = {
  /**
   * Indicateur d'environnement de production
   */
  production: true,

  /**
   * URL de l'API backend (à modifier pour la production)
   * TODO: Remplacer par l'URL de l'API de production
   */
  apiUrl: 'http://localhost:3000',
};

