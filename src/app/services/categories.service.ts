import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { apiToken } from '@core/interceptors/token.interceptor';
import { ICategory } from '@models/index';
import { forkJoin, map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private apiUrl = `${environment.API_URL}/api/v1`;
  private apiUrlMl = `${environment.API_URL_ML}`;

  constructor(private http: HttpClient) {}

  /* ######################## LOCAL ####################### */

  getCategories() {
    return this.http
      .get<any>(`${this.apiUrl}/categories`, {
        context: apiToken('API'),
      })
      .pipe(map((resCats) => resCats.results));
  }

  getCategory(id: string) {
    return this.http.get<ICategory>(`${this.apiUrl}/categories/${id}`, {
      context: apiToken('API'),
    });
  }

  createCategory(category: ICategory) {
    return this.http.post<ICategory>(`${this.apiUrl}/categories`, category, {
      context: apiToken('API'),
    });
  }

  updateCategory(category: ICategory) {
    return this.http.put<ICategory>(
      `${this.apiUrl}/categories/${category.id}`,
      category,
      {
        context: apiToken('API'),
      }
    );
  }

  deleteCategory(id: string) {
    return this.http.delete<ICategory>(`${this.apiUrl}/categories/${id}`, {
      context: apiToken('API'),
    });
  }

  /* ######################### ML ######################### */

  getCategoriesPpalMl() {
    return this.http.get<any[]>(`${this.apiUrlMl}/sites/MLA/categories`);
  }

  getCategoryMl(id: string) {
    const newCategory$ = new Observable((observer) => {
      const category = this.http.get<any>(`${this.apiUrlMl}/categories/${id}`);
      const attributes = this.http.get<any>(
        `${this.apiUrlMl}/categories/${id}/attributes`
      );
      const tecSpecs = this.http.get<any>(
        `${this.apiUrlMl}/categories/${id}/technical_specs/input`
      );

      forkJoin([category, attributes, tecSpecs]).subscribe((result) => {
        let full_name: string = '';
        result[0].path_from_root.forEach((parent: any, index: number) => {
          full_name += index === 0 ? parent.name : ` / ${parent.name}`;
        });

        console.log('RESULT', result[0]);

        const newCategory: ICategory = {
          id: result[0].id,
          name: result[0].name,
          full_name: full_name,
          path_from_root: result[0].path_from_root,
          children_categories: result[0].children_categories,
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

  getCatIdPredMl(description: string) {
    return this.http
      .get<any>(
        `${this.apiUrlMl}/sites/MLA/domain_discovery/search?q=${description}`
      )
      .pipe(map((cats) => cats.map((cat: any) => cat.category_id)));
  }

  getCategoriesPredictor(description: string) {
    const myObservable$ = new Observable((observer) => {
      this.getCatIdPredMl(description)
        .pipe(
          map((categories) => {
            const request: Observable<string>[] = [];
            categories.forEach((cat: any) => {
              request.push(
                this.http.get<any>(`${this.apiUrlMl}/categories/${cat}`)
              );
            });
            return forkJoin(request).subscribe((res) => {
              observer.next(res.flat());
              observer.complete();
            });
          })
        )
        .subscribe();
    });
    return myObservable$;
  }

  /* ####################### SERVICE ###################### */

  getAndCreateCategory(id: string) {
    return this.getCategoryMl(id).pipe(
      map((category: any) => {
        delete category.children_categories;
        return category;
      }),
      switchMap((newCat: any) => this.createCategory(newCat as ICategory))
    );
  }
}
