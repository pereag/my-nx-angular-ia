import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@mini-crm/data-access';
import { CommonModule } from '@angular/common';

/**
 * Custom validator to check if password and confirmPassword match
 * @internal
 */
function passwordMatchValidator(
  control: AbstractControl
): ValidationErrors | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (!password || !confirmPassword) {
    return null;
  }

  return password.value === confirmPassword.value
    ? null
    : { passwordMismatch: true };
}

/**
 * Sign-up component for user registration.
 *
 * Displays a reactive form with email, password, and confirm password fields.
 * Uses Bootstrap validation styles and custom password match validator.
 *
 * @usageNotes
 * ### In routing configuration
 * ```typescript
 * {
 *   path: 'sign-up',
 *   component: SignUpComponent
 * }
 * ```
 *
 * @category Feature Auth
 */
@Component({
  selector: 'lib-sign-up',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  /**
   * Loading state during sign-up
   */
  readonly loading = signal(false);

  /**
   * Error message if sign-up fails
   */
  readonly error = signal<string | null>(null);

  /**
   * Reactive form for sign-up
   */
  readonly form = this.fb.nonNullable.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: passwordMatchValidator }
  );

  /**
   * Submit the sign-up form
   * @internal
   */
  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    const { email, password } = this.form.getRawValue();

    this.authService.signUp({ email, password }).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/orders']);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err.message || "Erreur lors de l'inscription");
      },
    });
  }
}

