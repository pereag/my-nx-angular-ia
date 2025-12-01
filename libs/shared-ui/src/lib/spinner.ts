import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Spinner component for loading states.
 *
 * Displays a Bootstrap spinner with a loading message accessible to screen readers.
 *
 * @usageNotes
 * ### Basic Usage
 * ```html
 * <lib-spinner />
 * ```
 *
 * @category Shared UI
 */
@Component({
  selector: 'lib-spinner',
  imports: [],
  template: `
    <div class="spinner-container">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Chargement...</span>
      </div>
    </div>
  `,
  styleUrl: './spinner.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {}
