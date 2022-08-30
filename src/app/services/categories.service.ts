import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { apiToken } from '../interceptors/token.interceptor';
import { Category } from '../models/category.model';
import { forkJoin, map, Observable, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private apiUrl = `${environment.API_URL}/api/v1`;
  private apiUrlMl = `${environment.API_URL_ML}`;

  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http
      .get<any>(`${this.apiUrl}/categories`, {
        context: apiToken('API'),
      })
      .pipe(map((resCats) => resCats.results));
    // .pipe(
    //   catchError((error: HttpErrorResponse) => {
    //     if (error.status === HttpStatusCode.NotFound) {
    //       return throwError(() => 'Not found');
    //     }
    //     return throwError(() => 'Ups algo salió mal');
    //   })
    // );
  }

  createCategory(category: Category) {
    return this.http.post<Category>(`${this.apiUrl}/categories`, category, {
      context: apiToken('API'),
    });
  }

  getCategoryMl(id: string) {
    const newCategory$ = new Observable((observer) => {
      const category = this.http.get<any>(`${this.apiUrlMl}/categories/${id}`);
      const attributes = this.http.get<any>(
        `${this.apiUrlMl}/categories/${id}/attributes`
      );
      const tecSpecs = this.http.get<any>(
        `${this.apiUrlMl}/categories/${id}//technical_specs/input`
      );

      forkJoin([category, attributes, tecSpecs]).subscribe((result) => {
        let full_name: string = '';
        result[0].path_from_root.forEach((parent: any, index: number) => {
          full_name += index === 0 ? parent.name : ` / ${parent.name}`;
        });

        const newCategory: Category = {
          id: result[0].id,
          name: result[0].name,
          full_name: full_name,
          path_from_root: result[0].path_from_root,
          // children_categories: result[0].children_categories,
          settings: result[0].settings,
          picture: result[0].picture,
          attributes: result[1],
          attributes_oblg: result[2],
          description_web: result[0].name,
        };
        observer.next(newCategory);
      });
    });
    return newCategory$;
  }
}
