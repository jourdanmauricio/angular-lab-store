import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContext,
  HttpContextToken,
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

import { TokenService } from '../services/token.service';
import { environment } from 'src/environments/environment';
import { updateUserMlDto } from '../models/userMl.model';
import { UserMlService } from '../services/user-ml.service';

const TYPE_TOKEN = new HttpContextToken<string>(() => '');

export function apiToken(app: string) {
  if (app === 'API') {
    return new HttpContext().set(TYPE_TOKEN, 'token');
  } else {
    return new HttpContext().set(TYPE_TOKEN, 'tokenMl');
  }
}

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private tokenService: TokenService,
    private http: HttpClient,
    private userMlService: UserMlService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const type = request.context.get(TYPE_TOKEN);
    if (type === 'token' || type === 'tokenMl') {
      const token = this.tokenService.getItem(type);
      if (token) {
        const authReq = request.clone({
          headers: request.headers.set('Authorization', `Bearer ${token}`),
        });
        request = authReq;
      }
    }
    return next.handle(request).pipe(
      catchError((err) => {
        return throwError(() => {
          if (err.status === 401) {
            if (
              err.error.message === 'Invalid token' ||
              err.error.message === 'expired_token'
            ) {
              const refreshToken = this.tokenService.getItem('refreshTokenMl');
              console.log('ref', refreshToken);

              const data = {
                grant_type: 'refresh_token',
                client_id: environment.ML_APP_ID, // variables.mlAppId,
                client_secret: environment.ML_SECRET,
                refresh_token: refreshToken,
              };
              let headers = new HttpHeaders();
              headers = headers.set('content-type', 'application/json');
              headers = headers.set(
                'content-type',
                'application/x-www-form-urlencoded'
              );

              return this.http
                .post<any>(`${environment.API_URL_ML}/oauth/token`, data, {
                  headers,
                })
                .subscribe((res) => {
                  const id = res.user_id;
                  delete res.user_id;

                  this.userMlService.updateUserMl(id, res).subscribe((res2) => {
                    console.log('RES2', res2);
                    const authReq = request.clone({
                      headers: request.headers.set(
                        'Authorization',
                        `Bearer ${res.access_token}`
                      ),
                    });

                    console.log('authReq', authReq);
                    return next.handle(authReq).subscribe();
                  });
                });
            }
          }
          // console.log('ERRORRR INTERCEPTOR', err);
          return err;
        });
      })
    );
  }
}
