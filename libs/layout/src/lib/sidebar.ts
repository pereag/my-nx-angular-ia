import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

/**
 * Sidebar component for navigation.
 *
 * Displays vertical navigation with links to different sections of the application.
 * Uses RouterLink and RouterLinkActive for navigation state management.
 *
 * @usageNotes
 * ### Basic Usage
 * ```html
 * <lib-sidebar layout-sidebar></lib-sidebar>
 * ```
 *
 * @category Layout
 */
@Component({
  selector: 'lib-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {}

