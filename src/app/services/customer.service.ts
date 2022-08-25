import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {
  createCustomerDto,
  Customer,
  updateCustomerDto,
} from '../models/customer.model';
import { catchError, throwError } from 'rxjs';
import { apiToken } from '../interceptors/token.interceptor';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiUrl = `${environment.API_URL}/api/v1`;

  constructor(private http: HttpClient) {}

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
}
