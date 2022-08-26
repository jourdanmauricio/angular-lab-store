import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthMl } from '../models/ML/authMl.model';
import { catchError, throwError } from 'rxjs';
import { createUseMlDto, UserMl } from '../models/ML/userMl.model';
import { apiToken } from '../interceptors/token.interceptor';

@Injectable({
  providedIn: 'root',
})
export class UserMlService {
  private apiUrlMl = `${environment.API_URL_ML}`;
  private apiUrl = `${environment.API_URL}/api/v1`;

  constructor(private http: HttpClient) {}

  getUserMl(user_id: number) {
    return this.http.get<any>(`${this.apiUrlMl}/users/${user_id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.NotFound) {
          return throwError(() => 'Not found');
        }
        return throwError(() => error);
      })
    );
  }

  createUserMl(data: createUseMlDto) {
    return this.http.post<any>(`${this.apiUrl}/usersMl`, data, {
      context: apiToken('API'),
    });
  }
}
