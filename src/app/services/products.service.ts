import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiToken } from '../interceptors/token.interceptor';
import { catchError, map, switchMap } from 'rxjs/operators';
import { forkJoin, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
// Models
import { UserMl } from '../models/userMl.model';
import { ApiProduct, CreateProductDto, Product } from '../models/product.model';
// Services
import { UserMlService } from './user-ml.service';
import { ProductsMlService } from './products-ml.service';
import { CategoriesService } from './categories.service';
import { Category } from '../models/category.model';
import { ProductMl } from '../models/productML.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrlMl = `${environment.API_URL_ML}`;
  private apiUrl = `${environment.API_URL}/api/v1`;
  userMl: UserMl | null = null;
  mlItems: ApiProduct[] = [];
  categories: string[] = [];

  constructor(
    private http: HttpClient,
    private userMlService: UserMlService,
    private categoriesService: CategoriesService,
    private productsMlService: ProductsMlService
  ) {
    this.userMlService.userMl$.subscribe((data) => (this.userMl = data));
  }

  /* ######################## LOCAL ####################### */

  getProducts() {
    return this.http.get<any>(`${this.apiUrl}/products`, {
      context: apiToken('API'),
    });
  }

  createProduct(data: ApiProduct) {
    const newProd: CreateProductDto = {
      // ml_id: data.id,
      attributes: data.attributes,
      title: data.title,
      seller_custom_field: data.seller_custom_field,
      price: data.price,
      available_quantity: data.available_quantity,
      sold_quantity: data.sold_quantity,
      status: data.status,
      description: data.description,
      pictures: data.pictures,
      listing_type_id: data.listing_type_id,
      condition: data.condition,
      thumbnail: data.thumbnail,
      category_id: data.category_id,
      start_time: data.start_time,
      sale_terms: data.sale_terms,
      variations: data.variations,
    };

    return this.http.post<Product>(`${this.apiUrl}/products`, newProd, {
      context: apiToken('API'),
    });
  }

  /* ######################### ML ######################### */
  getMlQuantityItems() {
    return this.http
      .get<any>(`${this.apiUrlMl}/users/${this.userMl?.id}/items/search`, {
        context: apiToken('ML'),
      })
      .pipe(
        map((res) => {
          return {
            quantity: res.paging.total,
            limit: res.paging.limit,
          };
        })
      );
  }

  getMlProds(items: string[]) {
    const req_items = [];
    const iteraciones = Math.ceil(items.length / 20);
    for (let i = 0; i < iteraciones; i++) {
      req_items.push(
        this.http
          .get<any>(
            `${this.apiUrlMl}/items?ids=${items.splice(
              0,
              20
            )}&attributes=id,attributes,title,price,category_id,title,thumbnail,listing_type_id,condition,available_quantity,sold_quantity,status,permalink,pictures,sale_terms,variations,start_time,seller_custom_field`,
            {
              context: apiToken('ML'),
            }
          )
          .pipe(map((res) => res.map((item: any) => item.body)))
      );
    }
    return forkJoin(req_items).pipe(map((results) => results.flat()));
  }

  getMlItems(quantity: number, limit: number) {
    const offsets = [];
    for (let i = 0; i < quantity; i = i + limit)
      offsets.push(
        this.http
          .get<any>(
            `${this.apiUrlMl}/users/${
              this.userMl!.id
            }/items/search?limit=${limit}&offset=${i}`,
            {
              context: apiToken('ML'),
            }
          )
          .pipe(map((res) => res.results))
      );
    return forkJoin(offsets);
  }

  getMlDescriptions(prod: ApiProduct) {
    return this.http
      .get(`${this.apiUrlMl}/items/${prod.id}/description`, {
        context: apiToken('ML'),
      })
      .pipe(
        map((res: any) => {
          prod.description = res.plain_text;
          return prod;
        }),
        catchError((err) => {
          return of(prod);
        })
      );
  }
  /* ####################### SERVICE ###################### */

  getMlAllProducts() {
    console.log('Download');
    const newCategory$ = new Observable((observer) => {
      forkJoin([
        this.getMlProductsDetail(),
        this.categoriesService.getCategories(),
        this.productsMlService.getProductsMl(),
      ]).subscribe((result) => {
        const newCats: string[] = [];
        const mlProductsMl: ApiProduct[] = result[0];
        const categories: Category[] = result[1];
        const productsMl: ProductMl[] = result[2];
        console.log('mlProductsMl', mlProductsMl);
        console.log('cats', categories);
        console.log('productsMl', productsMl);
        mlProductsMl.forEach((mlProd) => {
          const updMlProd: ProductMl = {
            id: mlProd.id,
            seller_custom_field: mlProd.seller_custom_field,
            price: mlProd.price.toString(),
            available_quantity: mlProd.available_quantity,
            status: mlProd.status,
            permalink: mlProd.permalink,
            start_time: mlProd.start_time,
            variations: mlProd.variations,
          };
          const found = productsMl.find((prodMl) => prodMl.id === mlProd.id);
          if (found) {
            (updMlProd.prod_id = found!.prod_id),
              this.productsMlService
                .updateProductMl(updMlProd as ProductMl)
                .subscribe();
            return;
          }

          this.getMlDescriptions(mlProd).subscribe((mlProdDesc) => {
            // Copio newItems para modificar el precio
            const newItemsPrice = JSON.parse(JSON.stringify(mlProdDesc));
            // TODO: Modificar el precio en base a settings

            let index = categories.findIndex(
              (cat: Category) => cat.id === newItemsPrice.category_id
            );
            // // CAMBIAR POR ===
            if (index === -1) {
              if (!newCats.includes(newItemsPrice.category_id)) {
                newCats.push(newItemsPrice.category_id);
                this.categoriesService
                  .getCategoryMl(newItemsPrice.category_id)
                  .pipe(
                    switchMap((newCat) =>
                      this.categoriesService.createCategory(newCat as Category)
                    ),
                    switchMap(() =>
                      this.createProduct(newItemsPrice as ApiProduct).pipe(
                        map((prod) => (updMlProd.prod_id = prod.id))
                      )
                    ),
                    switchMap(() =>
                      this.productsMlService.createProductMl(
                        updMlProd as ProductMl
                      )
                    )
                  )
                  .subscribe();
              }
            } else {
              this.createProduct(newItemsPrice as ApiProduct)
                .pipe(map((prod) => (updMlProd.prod_id = prod.id)))
                .pipe(
                  switchMap(() =>
                    this.productsMlService.createProductMl(
                      updMlProd as ProductMl
                    )
                  )
                )
                .subscribe();
            }
          });
        });
        observer.next();
      });
    });
    return newCategory$;
  }

  getMlProductsDetail() {
    return this.getMlQuantityItems().pipe(
      switchMap((quantity) =>
        this.getMlItems(quantity.quantity, quantity.limit)
      ),
      switchMap((items) => this.getMlProds(items.flat()))
    );
  }
}