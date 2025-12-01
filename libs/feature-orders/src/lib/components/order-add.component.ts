import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService, Order } from '@mini-crm/data-access';
import { OrderFormComponent } from './order-form.component';

/**
 * Component for adding a new order.
 *
 * Uses OrderFormComponent in create mode (without order input).
 * Navigates to orders list after successful creation.
 *
 * @usageNotes
 * ### In routing configuration
 * ```typescript
 * {
 *   path: 'add',
 *   component: OrderAddComponent
 * }
 * ```
 *
 * @category Feature Orders
 */
@Component({
  selector: 'lib-order-add',
  imports: [OrderFormComponent],
  template: `
    <div class="order-add-container">
      <lib-order-form
        (save)="onSave($event)"
        (cancelled)="onCancel()"
      />
    </div>
  `,
  styleUrl: './order-add.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderAddComponent {
  private readonly ordersService = inject(OrdersService);
  private readonly router = inject(Router);

  /**
   * Handle order creation
   * @param order - Order data to create
   * @internal
   */
  onSave(order: Order): void {
    // Extract only the data needed for creation (without id, totalHt, totalTtc)
    const { customer, nbDays, tjm, tauxTva, status } = order;

    this.ordersService.create({ customer, nbDays, tjm, tauxTva, status }).subscribe({
      next: () => {
        this.router.navigate(['/orders']);
      },
      error: (err) => {
        console.error('Error creating order:', err);
      },
    });
  }

  /**
   * Handle cancel action
   * @internal
   */
  onCancel(): void {
    this.router.navigate(['/orders']);
  }
}

