import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError, of } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Order, CreateOrder, UpdateOrder } from '../models/order.model';

/**
 * Service for managing orders.
 *
 * Handles all CRUD operations for orders with json-server backend.
 * Manages orders state with signals.
 *
 * @usageNotes
 * ### Inject in a component
 * ```typescript
 * private ordersService = inject(OrdersService);
 * ```
 *
 * ### Load all orders
 * ```typescript
 * ngOnInit() {
 *   this.ordersService.getAll().subscribe();
 * }
 * ```
 *
 * ### Create an order
 * ```typescript
 * this.ordersService.create({
 *   customer: 'Acme Corp',
 *   nbDays: 10,
 *   tjm: 500,
 *   tauxTva: 20,
 *   status: 'pending'
 * }).subscribe();
 * ```
 *
 * @category Data Access
 * @see Order
 * @see CreateOrder
 * @see UpdateOrder
 */
@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private readonly http = inject(HttpClient);
  private readonly apiConfig = inject(API_CONFIG);
  private readonly apiUrl = `${this.apiConfig.apiUrl}/orders`;

  /**
   * List of orders
   * @internal
   */
  private readonly _orders = signal<Order[]>([]);

  /**
   * Loading state
   * @internal
   */
  private readonly _loading = signal(false);

  /**
   * Error message
   * @internal
   */
  private readonly _error = signal<string | null>(null);

  /**
   * List of orders (readonly)
   * @readonly
   */
  readonly orders = this._orders.asReadonly();

  /**
   * Loading state (readonly)
   * @readonly
   */
  readonly loading = this._loading.asReadonly();

  /**
   * Error message (readonly)
   * @readonly
   */
  readonly error = this._error.asReadonly();

  /**
   * Retrieve all orders from the API.
   *
   * Updates the orders signal with the fetched data.
   *
   * @returns Observable that completes when orders are loaded
   *
   * @example
   * ```typescript
   * this.ordersService.getAll().subscribe({
   *   next: () => console.log('Orders loaded'),
   *   error: (err) => console.error('Error loading orders', err)
   * });
   * ```
   */
  getAll() {
    this._loading.set(true);
    this._error.set(null);

    return this.http.get<Order[]>(this.apiUrl).pipe(
      tap((orders) => {
        this._orders.set(orders);
        this._loading.set(false);
      }),
      catchError((err) => {
        this._error.set(err.message || 'Erreur lors du chargement des commandes');
        this._loading.set(false);
        return of([]);
      })
    );
  }

  /**
   * Get an order by ID from the orders signal.
   *
   * @param id - Order ID
   * @returns The order if found, undefined otherwise
   *
   * @example
   * ```typescript
   * const order = this.ordersService.getById('1');
   * if (order) {
   *   console.log('Order found:', order);
   * }
   * ```
   */
  getById(id: string): Order | undefined {
    return this._orders().find((order) => order.id === id);
  }

  /**
   * Create a new order.
   *
   * Calculates totalHt and totalTtc automatically.
   * Refreshes the orders list after creation.
   *
   * @param orderData - Order data without id, totalHt, and totalTtc
   * @returns Observable that completes when order is created
   *
   * @example
   * ```typescript
   * this.ordersService.create({
   *   customer: 'Acme Corp',
   *   nbDays: 10,
   *   tjm: 500,
   *   tauxTva: 20,
   *   status: 'pending'
   * }).subscribe({
   *   next: () => {
   *     console.log('Order created');
   *     this.router.navigate(['/orders']);
   *   }
   * });
   * ```
   */
  create(orderData: CreateOrder) {
    this._loading.set(true);
    this._error.set(null);

    // Calcul des totaux
    const totalHt = orderData.nbDays * orderData.tjm;
    const totalTtc = totalHt * (1 + orderData.tauxTva / 100);

    const newOrder: Omit<Order, 'id'> = {
      ...orderData,
      totalHt,
      totalTtc,
    };

    return this.http.post<Order>(this.apiUrl, newOrder).pipe(
      tap(() => {
        this._loading.set(false);
        // Refresh la liste après création
        this.getAll().subscribe();
      }),
      catchError((err) => {
        this._error.set(err.message || 'Erreur lors de la création de la commande');
        this._loading.set(false);
        throw err;
      })
    );
  }

  /**
   * Update an existing order.
   *
   * Calculates totalHt and totalTtc automatically.
   * Refreshes the orders list after update.
   *
   * @param id - Order ID to update
   * @param orderData - Updated order data without id, totalHt, and totalTtc
   * @returns Observable that completes when order is updated
   *
   * @example
   * ```typescript
   * this.ordersService.update('1', {
   *   customer: 'Acme Corp Updated',
   *   nbDays: 15,
   *   tjm: 550,
   *   tauxTva: 20,
   *   status: 'confirmed'
   * }).subscribe({
   *   next: () => {
   *     console.log('Order updated');
   *     this.router.navigate(['/orders']);
   *   }
   * });
   * ```
   */
  update(id: string, orderData: UpdateOrder) {
    this._loading.set(true);
    this._error.set(null);

    // Calcul des totaux
    const totalHt = orderData.nbDays * orderData.tjm;
    const totalTtc = totalHt * (1 + orderData.tauxTva / 100);

    const updatedOrder: Order = {
      id,
      ...orderData,
      totalHt,
      totalTtc,
    };

    return this.http.put<Order>(`${this.apiUrl}/${id}`, updatedOrder).pipe(
      tap(() => {
        this._loading.set(false);
        // Refresh la liste après modification
        this.getAll().subscribe();
      }),
      catchError((err) => {
        this._error.set(err.message || 'Erreur lors de la modification de la commande');
        this._loading.set(false);
        throw err;
      })
    );
  }

  /**
   * Delete an order.
   *
   * Refreshes the orders list after deletion.
   *
   * @param id - Order ID to delete
   * @returns Observable that completes when order is deleted
   *
   * @example
   * ```typescript
   * this.ordersService.delete('1').subscribe({
   *   next: () => console.log('Order deleted'),
   *   error: (err) => console.error('Error deleting order', err)
   * });
   * ```
   */
  delete(id: string) {
    this._loading.set(true);
    this._error.set(null);

    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this._loading.set(false);
        // Refresh la liste après suppression
        this.getAll().subscribe();
      }),
      catchError((err) => {
        this._error.set(err.message || 'Erreur lors de la suppression de la commande');
        this._loading.set(false);
        throw err;
      })
    );
  }
}

