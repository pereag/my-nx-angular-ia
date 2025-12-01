import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@mini-crm/data-access';
import { CommonModule } from '@angular/common';

/**
 * Sign-in component for user authentication.
 *
 * Displays a reactive form with email and password fields.
 * Uses Bootstrap validation styles.
 *
 * @usageNotes
 * ### In routing configuration
 * ```typescript
 * {
 *   path: 'sign-in',
 *   component: SignInComponent
 * }
 * ```
 *
 * @category Feature Auth
 */
@Component({
  selector: 'lib-sign-in',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  /**
   * Loading state during sign-in
   */
  readonly loading = signal(false);

  /**
   * Error message if sign-in fails
   */
  readonly error = signal<string | null>(null);

  /**
   * Reactive form for sign-in
   */
  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  /**
   * Submit the sign-in form
   * @internal
   */
  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    this.authService.signIn(this.form.getRawValue()).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/orders']);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err.message || 'Erreur lors de la connexion');
      },
    });
  }
}

