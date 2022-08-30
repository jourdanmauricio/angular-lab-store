import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpStatusCode,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Auth, AuthChangePasswordDto } from '../models/auth.model';
import { BehaviorSubject, catchError, switchMap, tap, throwError } from 'rxjs';
import { TokenService } from './token.service';
import { User } from 'src/app/models/user.model';
import { apiToken } from '../interceptors/token.interceptor';
import { UserMlService } from './user-ml.service';
import { AuthMl } from '../models/authMl.model';
import { createUseMlDto } from '../models/userMl.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.API_URL}/api/v1`;
  private apiUrlMl = `${environment.API_URL_ML}`;
  token = '';
  credentials!: AuthMl;

  private user = new BehaviorSubject<User | null>(null);
  user$ = this.user.asObservable();

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private userMlService: UserMlService
  ) {}

  login(email: string, password: string) {
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
      .get<User>(`${this.apiUrl}/users/profile`, { context: apiToken('API') })
      .pipe(
        tap((user) => {
          console.log('user', user);
          this.user.next(user);
        })
      );
  }

  loginAndGetProfile(user: string, password: string) {
    return this.login(user, password)
      .pipe(
        switchMap(() => this.getProfile()),
        switchMap(() => this.userMlService.getApiUserMl())
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
    this.tokenService.removeItem('tokenMl');
    this.tokenService.removeItem('refreshTokenMl');
    this.user.next(null);
  }

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
          return this.userMlService.getMlUserMl(res.user_id);
        }),
        switchMap((resUserMl) => {
          if (nickname !== resUserMl.nickname) {
            return throwError(
              () => 'El nickname no coincide con el usuario logueado en ML'
            );
          }
          this.tokenService.saveItem('tokenMl', this.credentials.access_token);
          this.tokenService.saveItem(
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
          return this.userMlService.createApiUserMl(userMl);
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
