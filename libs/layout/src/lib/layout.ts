import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

// TODO: Importer AuthService une fois créé
// import { AuthService } from '@mini-crm/data-access';

/**
 * Layout component with content projection.
 *
 * Main container that orchestrates the application layout with header, sidebar, and main content.
 * Conditionally displays header and sidebar based on authentication state.
 *
 * @usageNotes
 * ### Basic Usage in app.component.html
 * ```html
 * <lib-layout>
 *   <lib-header layout-header></lib-header>
 *   <lib-sidebar layout-sidebar></lib-sidebar>
 * </lib-layout>
 * ```
 *
 * The layout will:
 * - Project header content into the header zone
 * - Project sidebar content into the sidebar zone (hidden if not authenticated)
 * - Display router-outlet in the main content area
 *
 * @category Layout
 */
@Component({
  selector: 'lib-layout',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  // TODO: Injecter AuthService une fois créé
  // private readonly authService = inject(AuthService);

  /**
   * Returns whether the user is authenticated
   * @readonly
   */
  get isAuthenticated(): boolean {
    // TODO: Utiliser authService.isAuthenticated() une fois créé
    // return this.authService.isAuthenticated();
    return true; // Temporaire : toujours authentifié pour les tests
  }
}

