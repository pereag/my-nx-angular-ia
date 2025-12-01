import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmModalComponent } from './confirm-modal';

describe('ConfirmModalComponent', () => {
  let component: ConfirmModalComponent;
  let fixture: ComponentFixture<ConfirmModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmModalComponent);
    fixture.componentRef.setInput('modalId', 'testModal');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default title', () => {
    expect(component.title()).toBe('Confirmation');
  });

  it('should emit confirm event when onConfirm is called', () => {
    let emitted = false;
    component.confirm.subscribe(() => {
      emitted = true;
    });

    component.onConfirm();

    expect(emitted).toBe(true);
  });
});

