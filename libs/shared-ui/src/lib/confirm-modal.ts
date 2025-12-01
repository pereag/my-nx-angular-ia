import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  inject,
  PLATFORM_ID,
  afterNextRender,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// Type Bootstrap Modal
declare const bootstrap: {
  Modal: {
    new (element: HTMLElement): {
      hide(): void;
    };
  };
};

/**
 * Modal component for confirmation dialogs.
 *
 * Uses Bootstrap's modal component with customizable title and message.
 * Emits a `confirm` event when the user confirms the action.
 *
 * @usageNotes
 * ### Basic Usage
 * ```html
 * <lib-confirm-modal
 *   [modalId]="'deleteModal'"
 *   [title]="'Supprimer la commande'"
 *   [message]="'Êtes-vous sûr de vouloir supprimer cette commande ?'"
 *   (confirm)="onDelete()"
 * />
 * ```
 *
 * ### Opening the modal
 * ```html
 * <button
 *   class="btn btn-danger"
 *   data-bs-toggle="modal"
 *   [attr.data-bs-target]="'#deleteModal'">
 *   Supprimer
 * </button>
 * ```
 *
 * @category Shared UI
 */
@Component({
  selector: 'lib-confirm-modal',
  imports: [],
  templateUrl: './confirm-modal.html',
  styleUrl: './confirm-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmModalComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private modalInstance: { hide(): void } | null = null;

  /**
   * Unique ID for the modal (required for Bootstrap modal)
   * @required
   */
  modalId = input.required<string>();

  /**
   * Title displayed in the modal header
   * @default 'Confirmation'
   */
  title = input<string>('Confirmation');

  /**
   * Message displayed in the modal body
   */
  message = input<string>('');

  /**
   * Emitted when the user confirms the action
   * @event
   */
  confirm = output<void>();

  constructor() {
    // Initialize Bootstrap modal after rendering (only in browser)
    afterNextRender(() => {
      if (isPlatformBrowser(this.platformId)) {
        const modalElement = document.getElementById(this.modalId());
        if (modalElement) {
          this.modalInstance = new bootstrap.Modal(modalElement);
        }
      }
    });
  }

  /**
   * Called when user clicks the Confirm button
   * @internal
   */
  onConfirm(): void {
    this.confirm.emit();
    this.closeModal();
  }

  /**
   * Closes the modal programmatically
   * @internal
   */
  private closeModal(): void {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
  }
}

