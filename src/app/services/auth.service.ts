import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpStatusCode,
} from '@angular/common/http';
import { environment } from 'environments/environment';
import { Auth, AuthChangePasswordDto } from '../models/index';
import { catchError, map, switchMap, tap, throwError } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { AuthMl } from '../models/index';
import { createUseMlDto } from '../models/index';
import { SettingsService } from './settings.service';
import { UsersService } from './users.service';
import { IAuth } from '@models/state/IAuth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.API_URL}/api/v1`;
  private apiUrlMl = `${environment.API_URL_ML}`;
  token = '';
  credentials!: AuthMl;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private usersService: UsersService,
    private settingsService: SettingsService
  ) {}

  login(email: string, password: string) {
    return this.http.post<IAuth>(`${this.apiUrl}/auth/login`, {
      email,
      password,
    });
    // .pipe(
    //   tap((response) => {
    //     this.localStorageService.saveItem('token', response.access_token);
    //   })
    // );
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

  // logout() {
  //   this.localStorageService.removeItem('token');
  //   this.localStorageService.removeItem('tokenMl');
  //   this.localStorageService.removeItem('refreshTokenMl');
  // }

  /* ######################### ML ######################### */

  changeCodeForToken(code: string) {
    const data = {
      grant_type: 'authorization_code',
      client_id: environment.ML_APP_ID,
      client_secret: environment.ML_SECRET,
      code: code,
      redirect_uri: `${environment.FRONT_END_URI}/meli-callback`,
    };

    let headers = new HttpHeaders();
    headers = headers.set('accept', 'application/json');
    headers = headers.set('content-type', 'application/x-www-form-urlencoded');

    return this.http.post<AuthMl>(`${this.apiUrlMl}/oauth/token`, data, {
      headers,
    });
  }

  createUserMl(code: string, nickname: string) {
    return this.changeCodeForToken(code)
      .pipe(
        switchMap((res) => {
          this.credentials = res;
          let headers = new HttpHeaders();
          headers = headers.set('content-type', 'application/json');
          headers = headers.set(
            'Authorization',
            `Bearer ${this.credentials.access_token}`
          );
          return this.usersService.getMlUserMl(res.user_id);
        }),
        switchMap((resUserMl) => {
          if (nickname !== resUserMl.nickname) {
            return throwError(
              () => 'El nickname no coincide con el usuario logueado en ML'
            );
          }
          this.localStorageService.saveItem(
            'tokenMl',
            this.credentials.access_token
          );
          this.localStorageService.saveItem(
            'refreshTokenMl',
            this.credentials.refresh_token
          );
          const userMl: createUseMlDto = {
            id: resUserMl.id,
            nickname: resUserMl.nickname,
            permalink: resUserMl.permalink,
            access_token: this.credentials.access_token,
            token_type: this.credentials.token_type,
            expires_in: this.credentials.expires_in,
            scope: this.credentials.scope,
            refresh_token: this.credentials.refresh_token,
            site_id: resUserMl.site_id,
          };
          return this.usersService.createApiUserMl(userMl);
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
          if (error.status === HttpStatusCode.Conflict) {
            return throwError(() => 'El usurio ya se encuentra autorizado');
          }
          return throwError(() => 'Ups algo salió mal');
        })
      );
  }
}
