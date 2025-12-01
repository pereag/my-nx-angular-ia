import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  LayoutComponent,
  HeaderComponent,
  SidebarComponent,
} from '@mini-crm/layout';

/**
 * Root component of the application.
 *
 * Uses the layout system with header and sidebar.
 * The router-outlet is contained in the LayoutComponent.
 *
 * @category App
 */
@Component({
  selector: 'app-root',
  imports: [LayoutComponent, HeaderComponent, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
