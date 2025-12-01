/**
 * Représente une commande dans le système.
 *
 * @category Models
 * @see OrdersService
 */
export interface Order {
  /**
   * Identifiant unique de la commande
   * @format uuid
   */
  id: string;

  /**
   * Nom du client
   * @minLength 3
   * @maxLength 100
   */
  customer: string;

  /**
   * Nombre de jours de la prestation
   * @minimum 1
   */
  nbDays: number;

  /**
   * Taux journalier moyen (en euros)
   * @minimum 0
   */
  tjm: number;

  /**
   * Taux de TVA (en pourcentage)
   * @default 20
   */
  tauxTva: number;

  /**
   * Total hors taxes (calculé : nbDays * tjm)
   * @readonly
   */
  totalHt: number;

  /**
   * Total toutes taxes comprises (calculé : totalHt * (1 + tauxTva/100))
   * @readonly
   */
  totalTtc: number;

  /**
   * Statut de la commande
   * @default 'pending'
   */
  status: 'pending' | 'confirmed' | 'cancelled';
}

/**
 * Données requises pour créer une nouvelle commande.
 *
 * Exclut les propriétés calculées automatiquement (id, totalHt, totalTtc).
 *
 * @category Models
 */
export type CreateOrder = Omit<Order, 'id' | 'totalHt' | 'totalTtc'>;

/**
 * Données requises pour modifier une commande existante.
 *
 * Exclut les propriétés calculées automatiquement (id, totalHt, totalTtc).
 *
 * @category Models
 */
export type UpdateOrder = Omit<Order, 'id' | 'totalHt' | 'totalTtc'>;

