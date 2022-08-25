import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpStatusCode,
} from '@angular/common/http';
import { TokenService } from '../services/token.service';
import { environment } from 'src/environments/environment';
import { AuthMl } from '../models/ML/authMl.model';

@Injectable({
  providedIn: 'root',
})
export class AuthMlService {
  private apiUrlMl = `${environment.API_URL_ML}`;
  token = '';

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  changeCodeForToken(code: string) {
    const data = {
      grant_type: 'authorization_code',
      client_id: environment.ML_APP_ID,
      client_secret: environment.ML_SECRET,
      code: code,
      redirect_uri: `${environment.FRONT_END_URI}/meli-callback`,
    };

    console.log('callback', `${environment.FRONT_END_URI}/meli-callback`);

    let headers = new HttpHeaders();
    headers = headers.set('accept', 'application/json');
    headers = headers.set('content-type', 'application/x-www-form-urlencoded');

    return this.http.post<AuthMl>(`${this.apiUrlMl}/oauth/token`, data, {
      headers,
    });
  }
}
