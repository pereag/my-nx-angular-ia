import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have invalid form initially', () => {
    expect(component.form.valid).toBe(false);
  });

  it('should validate password match', () => {
    component.form.patchValue({
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'different',
    });

    expect(component.form.errors?.['passwordMismatch']).toBeTruthy();

    component.form.patchValue({
      confirmPassword: 'password123',
    });

    expect(component.form.errors?.['passwordMismatch']).toBeFalsy();
  });
});

