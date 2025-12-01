import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderFormComponent } from './order-form.component';

describe('OrderFormComponent', () => {
  let component: OrderFormComponent;
  let fixture: ComponentFixture<OrderFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate totalHt correctly', () => {
    component.form.patchValue({
      nbDays: 10,
      tjm: 500,
    });

    expect(component.totalHt()).toBe(5000);
  });

  it('should calculate totalTtc correctly', () => {
    component.form.patchValue({
      nbDays: 10,
      tjm: 500,
      tauxTva: 20,
    });

    expect(component.totalTtc()).toBe(6000);
  });
});

