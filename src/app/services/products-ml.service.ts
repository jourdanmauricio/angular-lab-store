import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiToken } from '@core/interceptors/token.interceptor';
import { environment } from 'environments/environment';
import { ProductMl } from '../models/index';

@Injectable({
  providedIn: 'root',
})
export class ProductsMlService {
  private apiUrl = `${environment.API_URL}/api/v1`;

  constructor(private http: HttpClient) {}

  getProductsMl() {
    return this.http.get<ProductMl[]>(`${this.apiUrl}/productsml`, {
      context: apiToken('API'),
    });
  }

  updateProductMl(data: ProductMl) {
    return this.http.put<ProductMl>(
      `${this.apiUrl}/productsml/${data.id}`,
      data,
      {
        context: apiToken('API'),
      }
    );
  }

  createProductMl(data: ProductMl) {
    return this.http.post<ProductMl>(`${this.apiUrl}/productsml`, data, {
      context: apiToken('API'),
    });
  }
}
