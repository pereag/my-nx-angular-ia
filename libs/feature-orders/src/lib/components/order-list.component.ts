import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from '@mini-crm/data-access';
import { SpinnerComponent, ConfirmModalComponent } from '@mini-crm/shared-ui';
import { CommonModule } from '@angular/common';

/**
 * Component for displaying the list of orders.
 *
 * Displays orders in a responsive Bootstrap table with actions (edit, delete).
 * Integrates SpinnerComponent for loading state and ConfirmModalComponent for delete confirmation.
 *
 * @usageNotes
 * ### In routing configuration
 * ```typescript
 * {
 *   path: '',
 *   component: OrderListComponent
 * }
 * ```
 *
 * @category Feature Orders
 */
@Component({
  selector: 'lib-order-list',
  imports: [CommonModule, SpinnerComponent, ConfirmModalComponent],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderListComponent implements OnInit {
  readonly ordersService = inject(OrdersService);
  private readonly router = inject(Router);

  /**
   * ID of the order to delete (for confirm modal)
   * @internal
   */
  orderToDeleteId: string | null = null;

  /**
   * Initialize component and load orders
   */
  ngOnInit(): void {
    this.ordersService.getAll().subscribe();
  }

  /**
   * Navigate to add order page
   * @internal
   */
  onAdd(): void {
    this.router.navigate(['/orders/add']);
  }

  /**
   * Navigate to edit order page
   * @param id - Order ID to edit
   * @internal
   */
  onEdit(id: string): void {
    this.router.navigate(['/orders/edit', id]);
  }

  /**
   * Prepare order deletion (opens confirm modal)
   * @param id - Order ID to delete
   * @internal
   */
  onDeletePrepare(id: string): void {
    this.orderToDeleteId = id;
  }

  /**
   * Confirm and execute order deletion
   * @internal
   */
  onDeleteConfirm(): void {
    if (this.orderToDeleteId) {
      this.ordersService.delete(this.orderToDeleteId).subscribe({
        next: () => {
          this.orderToDeleteId = null;
        },
        error: (err) => {
          console.error('Error deleting order:', err);
          this.orderToDeleteId = null;
        },
      });
    }
  }

  /**
   * Get badge class for order status
   * @param status - Order status
   * @returns Bootstrap badge class
   * @internal
   */
  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'confirmed':
        return 'bg-success';
      case 'cancelled':
        return 'bg-danger';
      default:
        return 'bg-warning';
    }
  }

  /**
   * Get status label in French
   * @param status - Order status
   * @returns Localized status label
   * @internal
   */
  getStatusLabel(status: string): string {
    switch (status) {
      case 'confirmed':
        return 'Confirmée';
      case 'cancelled':
        return 'Annulée';
      default:
        return 'En attente';
    }
  }
}

