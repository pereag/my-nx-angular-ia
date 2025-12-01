import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  output,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Order } from '@mini-crm/data-access';
import { CommonModule } from '@angular/common';

/**
 * Reusable form component for creating/editing orders.
 *
 * Displays a reactive form with real-time calculations of totalHt and totalTtc.
 * Can be used in create mode (without order input) or edit mode (with order input).
 *
 * @usageNotes
 * ### Create mode
 * ```html
 * <lib-order-form
 *   (save)="onCreate($event)"
 *   (cancel)="onCancel()"
 * />
 * ```
 *
 * ### Edit mode
 * ```html
 * <lib-order-form
 *   [order]="order"
 *   (save)="onUpdate($event)"
 *   (cancel)="onCancel()"
 * />
 * ```
 *
 * @category Feature Orders
 */
@Component({
  selector: 'lib-order-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderFormComponent {
  private readonly fb = inject(FormBuilder);

  /**
   * Order to edit (null for create mode)
   */
  order = input<Order | null>(null);

  /**
   * Emitted when the form is submitted
   * @event
   */
  save = output<Order>();

  /**
   * Emitted when the user cancels
   * @event
   */
  cancelled = output<void>();

  /**
   * Reactive form for order data
   */
  readonly form = this.fb.nonNullable.group({
    customer: ['', [Validators.required]],
    nbDays: [1, [Validators.required, Validators.min(1)]],
    tjm: [0, [Validators.required, Validators.min(0)]],
    tauxTva: [20, [Validators.required, Validators.min(0), Validators.max(100)]],
    status: ['pending' as 'pending' | 'confirmed' | 'cancelled'],
  });

  /**
   * Real-time calculation of total HT based on form values
   * @computed
   * @readonly
   */
  readonly totalHt = computed(() => {
    const nbDays = this.form.controls.nbDays.value;
    const tjm = this.form.controls.tjm.value;
    return nbDays * tjm;
  });

  /**
   * Real-time calculation of total TTC based on form values
   * @computed
   * @readonly
   */
  readonly totalTtc = computed(() => {
    const totalHt = this.totalHt();
    const tauxTva = this.form.controls.tauxTva.value;
    return totalHt * (1 + tauxTva / 100);
  });

  constructor() {
    // Effect to patch form when order input changes (edit mode)
    effect(() => {
      const order = this.order();
      if (order) {
        this.form.patchValue({
          customer: order.customer,
          nbDays: order.nbDays,
          tjm: order.tjm,
          tauxTva: order.tauxTva,
          status: order.status,
        });
      }
    });
  }

  /**
   * Submit the form
   * @internal
   */
  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.getRawValue();

    const orderData: Order = {
      id: this.order()?.id || '',
      ...formValue,
      totalHt: this.totalHt(),
      totalTtc: this.totalTtc(),
    };

    this.save.emit(orderData);
  }

  /**
   * Cancel the form
   * @internal
   */
  onCancel(): void {
    this.cancelled.emit();
  }
}

