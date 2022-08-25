import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContext,
  HttpContextToken,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { TokenService } from '../services/token.service';

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
  constructor(private tokenService: TokenService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
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
    return next.handle(request);
  }
}
