import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { OrderListComponent } from './order-list.component';
import { API_CONFIG } from '@mini-crm/data-access';

describe('OrderListComponent', () => {
  let component: OrderListComponent;
  let fixture: ComponentFixture<OrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderListComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        { provide: API_CONFIG, useValue: { apiUrl: 'http://localhost:3000' } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get correct badge class for status', () => {
    expect(component.getStatusBadgeClass('confirmed')).toBe('bg-success');
    expect(component.getStatusBadgeClass('cancelled')).toBe('bg-danger');
    expect(component.getStatusBadgeClass('pending')).toBe('bg-warning');
  });

  it('should get correct status label', () => {
    expect(component.getStatusLabel('confirmed')).toBe('Confirmée');
    expect(component.getStatusLabel('cancelled')).toBe('Annulée');
    expect(component.getStatusLabel('pending')).toBe('En attente');
  });
});

