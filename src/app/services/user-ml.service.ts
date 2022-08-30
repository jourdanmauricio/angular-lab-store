import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import {
  createUseMlDto,
  updateUserMlDto,
  UserMl,
} from '../models/userMl.model';
import { apiToken } from '../interceptors/token.interceptor';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root',
})
export class UserMlService {
  private apiUrlMl = `${environment.API_URL_ML}`;
  private apiUrl = `${environment.API_URL}/api/v1`;

  private userMl = new BehaviorSubject<UserMl | null>(null);
  userMl$ = this.userMl.asObservable();

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  /************** ML *********************/

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

  /************** API *********************/

  getApiUserMl() {
    return this.http
      .get<UserMl>(`${this.apiUrl}/usersMl`, { context: apiToken('API') })
      .pipe(
        tap((userMl) => {
          console.log('user', userMl);
          this.userMl.next(userMl);
        })
      )
      .pipe(
        tap((response) => {
          console.log('getApiUserMl', response);
          this.tokenService.saveItem('tokenMl', response.access_token);
          this.tokenService.saveItem('refreshTokenMl', response.refresh_token);
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

  createApiUserMl(data: createUseMlDto) {
    return this.http.post<any>(`${this.apiUrl}/usersMl`, data, {
      context: apiToken('API'),
    });
  }

  updateUserMl(id: number, data: updateUserMlDto) {
    console.log('updateUserMl', data);
    return this.http
      .put<any>(`${this.apiUrl}/usersMl/${id}`, data, {
        context: apiToken('API'),
      })
      .pipe(
        tap((userMl) => {
          console.log('user', userMl);
          this.userMl.next(userMl);
        })
      )
      .pipe(
        tap((response) => {
          console.log('getApiUserMl', response);
          this.tokenService.saveItem('tokenMl', response.access_token);
          this.tokenService.saveItem('refreshTokenMl', response.refresh_token);
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
          console.log('getApiUserMl', response);
          this.tokenService.removeItem('tokenMl');
          this.tokenService.removeItem('refreshTokenMl');
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
}
