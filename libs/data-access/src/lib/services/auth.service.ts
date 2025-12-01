import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay } from 'rxjs';
import { tap } from 'rxjs/operators';
import { API_CONFIG } from '../config/api.config';
import {
  User,
  LoginRequest,
  RegisterRequest,
  AuthResponse,
} from '../models/auth.model';

/**
 * Service for managing authentication.
 *
 * Handles user authentication with mocked data (not connected to json-server-auth yet).
 * Manages authentication state with signals.
 *
 * @usageNotes
 * ### Inject in a component
 * ```typescript
 * private authService = inject(AuthService);
 * ```
 *
 * ### Sign in
 * ```typescript
 * this.authService.signIn({ email: 'user@example.com', password: 'password' })
 *   .subscribe({
 *     next: (response) => console.log('Logged in:', response.user),
 *     error: (err) => console.error('Login failed:', err)
 *   });
 * ```
 *
 * ### Check authentication
 * ```typescript
 * if (this.authService.isAuthenticated()) {
 *   // User is authenticated
 * }
 * ```
 *
 * @category Data Access
 * @see User
 * @see LoginRequest
 * @see RegisterRequest
 * @see AuthResponse
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiConfig = inject(API_CONFIG);

  /**
   * JWT token
   * @internal
   */
  private readonly _token = signal<string | null>(null);

  /**
   * Current authenticated user
   * @internal
   */
  private readonly _user = signal<User | null>(null);

  /**
   * JWT token (readonly)
   * @readonly
   */
  readonly token = this._token.asReadonly();

  /**
   * Current authenticated user (readonly)
   * @readonly
   */
  readonly user = this._user.asReadonly();

  /**
   * Whether the user is authenticated
   * @computed
   * @readonly
   */
  readonly isAuthenticated = computed(() => !!this._token());

  /**
   * Sign in with email and password.
   *
   * **Note**: This method is currently mocked and not connected to json-server-auth.
   * It will be replaced with real HTTP calls during the training session.
   *
   * @param credentials - User credentials (email and password)
   * @returns Observable of authentication response with token and user
   *
   * @example
   * ```typescript
   * this.authService.signIn({ email: 'user@example.com', password: 'password123' })
   *   .subscribe({
   *     next: (response) => {
   *       console.log('Logged in:', response.user);
   *       this.router.navigate(['/orders']);
   *     },
   *     error: (err) => console.error('Login failed:', err)
   *   });
   * ```
   */
  signIn(credentials: LoginRequest): Observable<AuthResponse> {
    // TODO: Remplacer par un vrai appel HTTP lors de la formation
    // return this.http.post<AuthResponse>(`${this.apiConfig.apiUrl}/login`, credentials)

    // Mock response (simulation d'un appel API avec délai)
    const mockResponse: AuthResponse = {
      accessToken: 'mock-jwt-token-' + Date.now(),
      user: {
        id: '1',
        email: credentials.email,
      },
    };

    return of(mockResponse).pipe(
      delay(500), // Simule un délai réseau
      tap((response) => {
        this._token.set(response.accessToken);
        this._user.set(response.user);
      })
    );
  }

  /**
   * Sign up with email and password.
   *
   * **Note**: This method is currently mocked and not connected to json-server-auth.
   * It will be replaced with real HTTP calls during the training session.
   *
   * @param credentials - User credentials (email and password)
   * @returns Observable of authentication response with token and user
   *
   * @example
   * ```typescript
   * this.authService.signUp({ email: 'user@example.com', password: 'password123' })
   *   .subscribe({
   *     next: (response) => {
   *       console.log('Account created:', response.user);
   *       this.router.navigate(['/orders']);
   *     },
   *     error: (err) => console.error('Registration failed:', err)
   *   });
   * ```
   */
  signUp(credentials: RegisterRequest): Observable<AuthResponse> {
    // TODO: Remplacer par un vrai appel HTTP lors de la formation
    // return this.http.post<AuthResponse>(`${this.apiConfig.apiUrl}/register`, credentials)

    // Mock response (simulation d'un appel API avec délai)
    const mockResponse: AuthResponse = {
      accessToken: 'mock-jwt-token-' + Date.now(),
      user: {
        id: '2',
        email: credentials.email,
      },
    };

    return of(mockResponse).pipe(
      delay(500), // Simule un délai réseau
      tap((response) => {
        this._token.set(response.accessToken);
        this._user.set(response.user);
      })
    );
  }

  /**
   * Log out the current user.
   *
   * Clears the authentication token and user data.
   *
   * @example
   * ```typescript
   * this.authService.logout();
   * this.router.navigate(['/auth/sign-in']);
   * ```
   */
  logout(): void {
    this._token.set(null);
    this._user.set(null);
  }
}

