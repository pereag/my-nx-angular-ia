import { Routes } from '@angular/router';
import { OrderListComponent } from './components/order-list.component';
import { OrderAddComponent } from './components/order-add.component';
import { OrderEditComponent } from './components/order-edit.component';

/**
 * Routes for the orders feature.
 *
 * @usageNotes
 * ### Lazy load in app.routes.ts
 * ```typescript
 * {
 *   path: 'orders',
 *   loadChildren: () => import('@mini-crm/feature-orders').then(m => m.ORDERS_ROUTES)
 * }
 * ```
 *
 * @category Feature Orders
 */
export const ORDERS_ROUTES: Routes = [
  {
    path: '',
    component: OrderListComponent,
  },
  {
    path: 'add',
    component: OrderAddComponent,
  },
  {
    path: 'edit/:id',
    component: OrderEditComponent,
  },
];

