import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthMl } from '../models/ML/authMl.model';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserMlService {
  private apiUrlMl = `${environment.API_URL_ML}`;

  constructor(private http: HttpClient) {}

  getMlUser(user_id: number) {
    return this.http.get<any>(`${this.apiUrlMl}/users/${user_id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.NotFound) {
          return throwError(() => 'Not found');
        }
        return throwError(() => error);
      })
    );
  }
}
