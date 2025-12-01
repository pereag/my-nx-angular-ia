/**
 * Représente un utilisateur dans le système.
 *
 * @category Models
 */
export interface User {
  /**
   * Identifiant unique de l'utilisateur
   * @format uuid
   */
  id: string;

  /**
   * Adresse email de l'utilisateur
   * @format email
   */
  email: string;
}

/**
 * Données requises pour la connexion.
 *
 * @category Models
 */
export interface LoginRequest {
  /**
   * Adresse email de l'utilisateur
   * @format email
   */
  email: string;

  /**
   * Mot de passe de l'utilisateur
   * @minLength 6
   */
  password: string;
}

/**
 * Données requises pour l'inscription.
 *
 * @category Models
 */
export interface RegisterRequest {
  /**
   * Adresse email de l'utilisateur
   * @format email
   */
  email: string;

  /**
   * Mot de passe de l'utilisateur
   * @minLength 6
   */
  password: string;
}

/**
 * Réponse de l'API après authentification réussie.
 *
 * @category Models
 */
export interface AuthResponse {
  /**
   * Token JWT d'authentification
   */
  accessToken: string;

  /**
   * Données de l'utilisateur authentifié
   */
  user: User;
}

