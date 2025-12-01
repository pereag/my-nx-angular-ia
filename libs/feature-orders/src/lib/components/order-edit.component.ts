import { ChangeDetectionStrategy, Component, inject, signal, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrdersService, Order } from '@mini-crm/data-access';
import { OrderFormComponent } from './order-form.component';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '@mini-crm/shared-ui';

/**
 * Component for editing an existing order.
 *
 * Loads the order from route params, uses OrderFormComponent in edit mode.
 * Navigates to orders list after successful update.
 *
 * @usageNotes
 * ### In routing configuration
 * ```typescript
 * {
 *   path: 'edit/:id',
 *   component: OrderEditComponent
 * }
 * ```
 *
 * @category Feature Orders
 */
@Component({
  selector: 'lib-order-edit',
  imports: [CommonModule, OrderFormComponent, SpinnerComponent],
  template: `
    <div class="order-edit-container">
      @if (order()) {
        <lib-order-form
          [order]="order()"
          (save)="onSave($event)"
          (cancelled)="onCancel()"
        />
      } @else {
        <lib-spinner />
      }
    </div>
  `,
  styleUrl: './order-edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderEditComponent implements OnInit {
  private readonly ordersService = inject(OrdersService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  /**
   * Order being edited
   */
  readonly order = signal<Order | null>(null);

  /**
   * Initialize component and load order from route params
   */
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const foundOrder = this.ordersService.getById(id);
      if (foundOrder) {
        this.order.set(foundOrder);
      } else {
        // Order not found in signal, navigate back
        this.router.navigate(['/orders']);
      }
    }
  }

  /**
   * Handle order update
   * @param order - Updated order data
   * @internal
   */
  onSave(order: Order): void {
    // Extract only the data needed for update (without id, totalHt, totalTtc)
    const { customer, nbDays, tjm, tauxTva, status } = order;

    this.ordersService.update(order.id, { customer, nbDays, tjm, tauxTva, status }).subscribe({
      next: () => {
        this.router.navigate(['/orders']);
      },
      error: (err) => {
        console.error('Error updating order:', err);
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

