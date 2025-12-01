/**
 * Configuration pour l'environnement de développement.
 *
 * Ce fichier est utilisé par défaut lors du développement local.
 * Il sera remplacé par environment.prod.ts lors des builds de production
 * grâce à la configuration fileReplacements dans project.json.
 *
 * @category Configuration
 */
export const environment = {
  /**
   * Indicateur d'environnement de production
   */
  production: false,

  /**
   * URL de l'API backend (json-server en local)
   */
  apiUrl: 'http://localhost:3000',
};

