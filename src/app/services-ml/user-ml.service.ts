import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthMl } from '../models/ML/authMl.model';
import { catchError, throwError } from 'rxjs';
import { UserMl } from '../models/ML/userMl.model';

@Injectable({
  providedIn: 'root',
})
export class UserMlService {
  private apiUrlMl = `${environment.API_URL_ML}`;
  private apiUrl = `${environment.API_URL}`;

  constructor(private http: HttpClient) {}

  getUserMl(user_id: number) {
    return this.http.get<UserMl>(`${this.apiUrlMl}/users/${user_id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.NotFound) {
          return throwError(() => 'Not found');
        }
        return throwError(() => error);
      })
    );
  }

  createUserMl(data: UserMl) {
    return this.http.post<UserMl>(`${this.apiUrl}/usersMl`, data);
  }
}
