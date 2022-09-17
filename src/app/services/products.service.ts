import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiToken } from '@core/interceptors/token.interceptor';
import { catchError, map, switchMap } from 'rxjs/operators';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { environment } from 'environments/environment';
// Models
import { UserMl } from '../models/index';
import { IProduct, CreateProductDto, Product } from '../models/index';
// Services
import { ProductsMlService } from './products-ml.service';
import { CategoriesService } from './categories.service';
import { ICategory } from '@models/index';
import { ProductMl } from '../models/index';
import { LocalStorageService } from './local-storage.service';
import { UsersService } from './users.service';
import { CurrentProdState } from 'app/store/currentProd/currentProd.state';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  // Product State
  private currentProduct = new BehaviorSubject<Product | null>(null);
  currentProduct$ = this.currentProduct.asObservable();

  // Environment
  private apiUrlMl = `${environment.API_URL_ML}`;
  private apiUrl = `${environment.API_URL}/api/v1`;

  // Variables
  userMl: UserMl | null = null;
  mlItems: IProduct[] = [];
  categories: string[] = [];

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private usersService: UsersService,
    private categoriesService: CategoriesService,
    private productsMlService: ProductsMlService
  ) {
    this.usersService.userMl$.subscribe((data) => (this.userMl = data));
  }

  setProduct(product: Product) {
    this.localStorageService.saveItem('currentProd', JSON.stringify(product));
    this.currentProduct.next(product);
  }

  updateCurrentProduct(property: any) {
    let newValue;
    this.currentProduct.subscribe((res) => {
      newValue = { ...res, ...property };
    });
    // this.currentProduct.next(newValue);
  }

  /* ######################## LOCAL ####################### */

  getProducts() {
    return this.http.get<any>(`${this.apiUrl}/products`, {
      context: apiToken('API'),
    });
  }

  getProduct(id: string) {
    return this.http.get<IProduct>(`${this.apiUrl}/products/${id}`, {
      context: apiToken('API'),
    });
  }

  createProduct(data: IProduct) {
    const newProd: CreateProductDto = {
      // ml_id: data.id,
      attributes: data.attributes,
      title: data.title,
      seller_custom_field: data.seller_custom_field,
      price: data.price,
      // permalink: data.permalink,
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
            )}&attributes=id,attributes,title,price,category_id,title,thumbnail,listing_type_id,condition,available_quantity,sold_quantity,status,permalink,pictures,sale_terms,variations,start_time,seller_custom_field&include_attributes=all`,
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

  getMlDescriptions(prod: IProduct) {
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

  createImage(formData: FormData) {
    const token = this.localStorageService.getItem('tokenMl');
    let headers = new HttpHeaders();
    // headers = headers.set('content-type', 'multipart/form-data');
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.post<any>(`${this.apiUrlMl}/pictures`, formData, {
      headers,
    });
  }
  /* ####################### SERVICE ###################### */

  getMlAllProducts() {
    const newCategory$ = new Observable((observer) => {
      forkJoin([
        this.getMlProductsDetail(),
        this.categoriesService.getCategories(),
        this.productsMlService.getProductsMl(),
      ]).subscribe((result) => {
        const newCats: string[] = [];
        const mlProductsMl: IProduct[] = result[0];
        const categories: ICategory[] = result[1];
        const productsMl: ProductMl[] = result[2];
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
              (cat: ICategory) => cat.id === newItemsPrice.category_id
            );
            if (index === -1) {
              if (!newCats.includes(newItemsPrice.category_id)) {
                newCats.push(newItemsPrice.category_id);
                this.categoriesService
                  .getCategoryMl(newItemsPrice.category_id)
                  .pipe(
                    switchMap((newCat) =>
                      this.categoriesService.createCategory(newCat as ICategory)
                    ),
                    switchMap(() =>
                      this.createProduct(newItemsPrice as IProduct).pipe(
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
              this.createProduct(newItemsPrice as IProduct)
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
        observer.complete();
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
