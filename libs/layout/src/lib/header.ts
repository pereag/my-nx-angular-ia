import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Header component for the application.
 *
 * Displays the application branding with icon and title.
 *
 * @usageNotes
 * ### Basic Usage
 * ```html
 * <lib-header layout-header></lib-header>
 * ```
 *
 * @category Layout
 */
@Component({
  selector: 'lib-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}

