import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { OrderAddComponent } from './order-add.component';
import { API_CONFIG } from '@mini-crm/data-access';

describe('OrderAddComponent', () => {
  let component: OrderAddComponent;
  let fixture: ComponentFixture<OrderAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderAddComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        { provide: API_CONFIG, useValue: { apiUrl: 'http://localhost:3000' } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

