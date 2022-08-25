import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Auth, AuthChangePasswordDto } from '../models/auth.model';
import { BehaviorSubject, catchError, switchMap, tap, throwError } from 'rxjs';
import { TokenService } from './token.service';
import { User } from 'src/app/models/user.model';
import { apiToken } from '../interceptors/token.interceptor';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.API_URL}/api/v1`;
  token = '';

  private user = new BehaviorSubject<User | null>(null);
  user$ = this.user.asObservable();

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  login(email: string, password: string) {
    console.log('LOGIN');
    return this.http
      .post<Auth>(`${this.apiUrl}/auth/login`, { email, password })
      .pipe(
        tap((response) => {
          this.tokenService.saveItem('token', response.access_token);
        })
      );
  }

  getProfile() {
    return this.http
      .get<User>(`${this.apiUrl}/users/profile`, { context: apiToken() })
      .pipe(
        tap((user) => {
          console.log('user', user);
          this.user.next(user);
        })
      );
  }

  loginAndGetProfile(user: string, password: string) {
    return this.login(user, password)
      .pipe(switchMap(() => this.getProfile()))
      .pipe(
        tap((user) => {
          this.user.next(user);
        })
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === HttpStatusCode.InternalServerError) {
            return throwError(() => 'Algo fallo en el server');
          }
          if (error.status === HttpStatusCode.Unauthorized) {
            return throwError(() => 'No estas autorizado');
          }
          return throwError(() => 'Ups algo salió mal');
        })
      );
  }

  recoveryPassword(email: string) {
    return this.http
      .post<string>(`${this.apiUrl}/auth/recovery`, { email })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === HttpStatusCode.InternalServerError) {
            return throwError(() => 'Algo fallo en el server');
          }
          if (error.status === HttpStatusCode.Unauthorized) {
            return throwError(() => 'No estas autorizado');
          }
          return throwError(() => 'Ups algo salió mal');
        })
      );
  }

  changePassword(data: AuthChangePasswordDto) {
    return this.http
      .post<string>(`${this.apiUrl}/auth/change-password`, data)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === HttpStatusCode.InternalServerError) {
            return throwError(() => 'Algo fallo en el server');
          }
          if (error.status === HttpStatusCode.Unauthorized) {
            return throwError(() => 'No estas autorizado');
          }
          return throwError(() => 'Ups algo salió mal');
        })
      );
  }

  logout() {
    this.tokenService.removeItem('token');
    this.user.next(null);
  }
}
