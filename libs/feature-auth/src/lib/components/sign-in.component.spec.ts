import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SignInComponent } from './sign-in.component';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignInComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have invalid form initially', () => {
    expect(component.form.valid).toBe(false);
  });

  it('should validate email', () => {
    const emailControl = component.form.controls.email;
    emailControl.setValue('invalid-email');
    expect(emailControl.invalid).toBe(true);

    emailControl.setValue('valid@email.com');
    expect(emailControl.valid).toBe(true);
  });

  it('should validate password minlength', () => {
    const passwordControl = component.form.controls.password;
    passwordControl.setValue('short');
    expect(passwordControl.invalid).toBe(true);

    passwordControl.setValue('longenough');
    expect(passwordControl.valid).toBe(true);
  });
});

