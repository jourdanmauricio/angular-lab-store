import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { environment } from 'environments/environment';
import { BehaviorSubject, catchError, switchMap, tap, throwError } from 'rxjs';

import { CreateUserDto, UpdatePassDto, User } from '../models/index';
import { LocalStorageService } from './local-storage.service';
import { apiToken } from '@core/interceptors/token.interceptor';
import { createUseMlDto, updateUserMlDto, UserMl } from '../models/index';
import {
  createCustomerDto,
  Customer,
  updateCustomerDto,
} from '../models/index';
import { AuthStateModel } from 'app/store/auth/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = `${environment.API_URL}/api/v1`;
  private apiUrlMl = `${environment.API_URL_ML}`;

  private userMl = new BehaviorSubject<UserMl | null>(null);
  userMl$ = this.userMl.asObservable();

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  create(dto: CreateUserDto) {
    return this.http
      .post<User>(`${this.apiUrl}/users`, dto)
      .pipe(
        tap((response) => {
          if (response.token)
            this.localStorageService.saveItem('token', response.token);
        })
      )
      .pipe(switchMap(() => this.getProfile()))
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

  getApiUserMl() {
    return this.http
      .get<UserMl>(`${this.apiUrl}/usersMl`, { context: apiToken('API') })
      .pipe(
        tap((userMl) => {
          this.userMl.next(userMl);
        })
      )
      .pipe(
        tap((response) => {
          this.localStorageService.saveItem('tokenMl', response.access_token);
          this.localStorageService.saveItem(
            'refreshTokenMl',
            response.refresh_token
          );
        })
      );
  }

  createApiUserMl(data: createUseMlDto) {
    return this.http.post<any>(`${this.apiUrl}/usersMl`, data, {
      context: apiToken('API'),
    });
  }

  updateUserMl(id: number, data: updateUserMlDto) {
    return this.http
      .put<any>(`${this.apiUrl}/usersMl/${id}`, data, {
        context: apiToken('API'),
      })
      .pipe(
        tap((userMl) => {
          this.userMl.next(userMl);
        })
      )
      .pipe(
        tap((response) => {
          this.localStorageService.saveItem('tokenMl', response.access_token);
          this.localStorageService.saveItem(
            'refreshTokenMl',
            response.refresh_token
          );
        })
      );
  }

  deleteApiUserMl(id: number) {
    return this.http
      .delete<any>(`${this.apiUrl}/usersMl/${id}`, {
        context: apiToken('API'),
      })
      .pipe(
        tap((response) => {
          this.localStorageService.removeItem('tokenMl');
          this.localStorageService.removeItem('refreshTokenMl');
        })
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === HttpStatusCode.NotFound) {
            return throwError(() => 'Not found');
          }
          return throwError(() => error);
        })
      );
  }

  getCustomer() {
    return this.http
      .get<Customer>(`${this.apiUrl}/customers`, { context: apiToken('API') })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === HttpStatusCode.NotFound) {
            return throwError(() => 'Not found');
          }
          return throwError(() => 'Ups algo salió mal');
        })
      );
  }

  createCustomer(data: createCustomerDto) {
    return this.http.post<Customer>(`${this.apiUrl}/customers`, data, {
      context: apiToken('API'),
    });
  }

  updateCustomer(id: number, data: updateCustomerDto) {
    return this.http.patch<Customer>(`${this.apiUrl}/customers/${id}`, data, {
      context: apiToken('API'),
    });
  }

  getProfile() {
    return this.http.get<AuthStateModel>(`${this.apiUrl}/users/profile`, {
      context: apiToken('API'),
    });
  }

  /* ######################### ML ######################### */

  getMlUserMl(user_id: number) {
    return this.http.get<UserMl>(`${this.apiUrlMl}/users/${user_id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.NotFound) {
          return throwError(() => 'Not found');
        }
        return throwError(() => error);
      })
    );
  }
}
