import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, switchMap, tap, throwError } from 'rxjs';

import { CreateUserDto, UpdatePassDto, User } from '../models/user.model';
import { TokenService } from './token.service';
import { AuthService } from './auth.service';
import { apiToken } from '../interceptors/token.interceptor';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = `${environment.API_URL}/api/v1`;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private authService: AuthService
  ) {}

  create(dto: CreateUserDto) {
    return this.http
      .post<User>(`${this.apiUrl}/users`, dto)
      .pipe(
        tap((response) => {
          if (response.token)
            this.tokenService.saveItem('token', response.token);
        })
      )
      .pipe(switchMap(() => this.authService.getProfile()))
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === HttpStatusCode.InternalServerError) {
            return throwError(() => 'Algo fallo en el server');
          }
          if (error.status === HttpStatusCode.Conflict) {
            return throwError(() => 'El email ya se encuentra registrado');
          }
          console.log('Errrorrrrrrr', error);
          return throwError(() => 'Ups algo salió mal');
        })
      );
  }

  changePassword(id: number, data: UpdatePassDto) {
    return this.http
      .patch<String>(`${this.apiUrl}/users/change-password/${id}`, data, {
        context: apiToken('API'),
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === HttpStatusCode.InternalServerError) {
            return throwError(() => 'Algo fallo en el server');
          }
          if (error.status === HttpStatusCode.Unauthorized) {
            return throwError(() => 'Confirme el password anterior');
          }
          console.log('Errrorrrrrrr', error);
          return throwError(() => 'Ups algo salió mal');
        })
      );
  }

  delete(id: number) {
    return this.http.delete<String>(`${this.apiUrl}/users/${id}`, {
      context: apiToken('API'),
    });
  }
}
