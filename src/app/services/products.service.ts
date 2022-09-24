import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiToken } from '@core/interceptors/token.interceptor';
import { catchError, map, switchMap } from 'rxjs/operators';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { environment } from 'environments/environment';
// Models
import {
  IProdUpdDto,
  IProductDto,
  UserMl,
  IProduct,
  IProdCreateDto,
  ICategory,
  IProductWeb,
  IProdWebUpdDto,
} from '../models/index';
// Services
import { CategoriesService } from './categories.service';
import { LocalStorageService } from './local-storage.service';
import { UsersService } from './users.service';
import {
  IProductMl,
  IProdMlUpdDto,
  IProdMlCreateDto,
} from '@models/product/IProductMl';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  // Product State
  private currentProduct = new BehaviorSubject<IProductDto | null>(null);
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
    private categoriesService: CategoriesService
  ) {
    this.usersService.userMl$.subscribe((data) => (this.userMl = data));
  }

  setProduct(product: IProductDto) {
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
    const newProd: IProdCreateDto = {
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
      video_id: data.video_id,
    };

    return this.http.post<IProductDto>(`${this.apiUrl}/products`, newProd, {
      context: apiToken('API'),
    });
  }

  updateProduct(id: number, data: IProdUpdDto) {
    const updProd = {
      attributes: data.attributes,
      title: data.title,
      seller_custom_field: data.seller_custom_field,
      price: data.price,
      available_quantity: data.available_quantity,
      status: data.status,
      description: data.description,
      pictures: data.pictures,
      listing_type_id: data.listing_type_id,
      condition: data.condition,
      thumbnail: data.thumbnail,
      category_id: data.category_id,
      sale_terms: data.sale_terms,
      variations: data.variations,
      video_id: data.video_id,
    };

    return this.http.put<IProductDto>(
      `${this.apiUrl}/products/${id}`,
      updProd,
      {
        context: apiToken('API'),
      }
    );
  }

  /* ###################### LOCAL ML ###################### */

  getProductsMl() {
    return this.http.get<IProductMl[]>(`${this.apiUrl}/productsml`, {
      context: apiToken('API'),
    });
  }

  updateProductMl(data: IProdMlUpdDto) {
    return this.http.put<IProductMl>(
      `${this.apiUrl}/productsml/${data.id}`,
      data,
      {
        context: apiToken('API'),
      }
    );
  }

  createProductMl(data: IProdMlCreateDto) {
    return this.http.post<IProductMl>(`${this.apiUrl}/productsMl`, data, {
      context: apiToken('API'),
    });
  }

  /* ##################### LOCAL WEB ###################### */

  createProductWeb(data: IProductWeb) {
    return this.http.post<IProductWeb>(`${this.apiUrl}/productsweb`, data, {
      context: apiToken('API'),
    });
  }

  updateProductWeb(data: IProdWebUpdDto) {
    return this.http.put<IProductMl>(
      `${this.apiUrl}/productsweb/${data.id}`,
      data,
      {
        context: apiToken('API'),
      }
    );
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
            )}&attributes=id,attributes,title,price,category_id,title,thumbnail,listing_type_id,condition,available_quantity,sold_quantity,status,permalink,pictures,sale_terms,variations,start_time,seller_custom_field,video_id&include_attributes=all`,
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

  updateMlProd(id: string, data: IProdUpdDto) {
    return this.http.put<IProduct>(`${this.apiUrlMl}/items/${id}`, data, {
      context: apiToken('ML'),
    });
  }

  updateMlProdDescription(id: string, data: IProdUpdDto) {
    return this.http.put<IProduct>(
      `${this.apiUrlMl}/items/${id}/description?api_version=2`,
      data,
      {
        context: apiToken('ML'),
      }
    );
  }

  /* ####################### SERVICE ###################### */

  getMlAllProducts() {
    const newCategory$ = new Observable((observer) => {
      forkJoin([
        this.getMlProductsDetail(),
        this.categoriesService.getCategories(),
        this.getProductsMl(),
      ]).subscribe((result) => {
        const newCats: string[] = [];
        const mlProductsMl: IProduct[] = result[0];
        const categories: ICategory[] = result[1];
        const productsMl: IProductMl[] = result[2];
        mlProductsMl.forEach((mlProd) => {
          const updMlProd: IProductMl = {
            id: mlProd.id,
            seller_custom_field: mlProd.seller_custom_field,
            price: mlProd.price,
            available_quantity: mlProd.available_quantity,
            status: mlProd.status,
            permalink: mlProd.permalink,
            start_time: mlProd.start_time,
            variations: mlProd.variations,
          };
          const found = productsMl.find((prodMl) => prodMl.id === mlProd.id);
          if (found) {
            updMlProd.prod_id = found!.prod_id;
            this.updateProductMl(updMlProd as IProductMl)
              .subscribe
              // (res) =>
              // console.log('price:', typeof res.price, res.price)
              ();
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
                      this.createProductMl(updMlProd as IProductMl)
                    )
                  )
                  .subscribe();
              }
            } else {
              this.createProduct(newItemsPrice as IProduct)
                .pipe(map((prod) => (updMlProd.prod_id = prod.id)))
                .pipe(
                  switchMap(() => this.createProductMl(updMlProd as IProductMl))
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

  updateMlLocalService(id: string, bodyMl: any, currentProd: IProductDto) {
    return this.updateMlProd(id, bodyMl).pipe(
      map((prodMl) => {
        // Variations
        prodMl.variations.forEach((variation) => {
          let found = currentProd.variations.find(
            (prodVar) => prodVar.id === variation.id
          );
          if (found) {
            variation.price = found.price;
            variation.available_quantity = found.available_quantity;
          }
        });
        return {
          ...prodMl,
          status: currentProd.status,
          available_quantity: currentProd.available_quantity,
          price: currentProd.price,
        };
      }),

      switchMap((newProdMl: IProduct) =>
        this.updateProduct(currentProd.id, newProdMl)
      )
    );
  }

  updateMlLocalProdDescriptionService(
    mlId: string,
    id: number,
    bodyMlDescription: any,
    description: string
  ) {
    return this.updateMlProdDescription(mlId, bodyMlDescription).pipe(
      map((prodMl) => ({
        ...prodMl,
        description,
      })),
      switchMap((newProd: IProdUpdDto) => this.updateProduct(id, newProd))
    );
  }

  updateMlLocalMlService(mlId: string, id: number, bodyMl: any) {
    return this.updateMlProd(mlId, bodyMl).pipe(
      map((prodMl) => ({
        id: prodMl.id,
        status: prodMl.status,
        available_quantity: prodMl.available_quantity,
        prod_id: id,
        seller_custom_field: prodMl.seller_custom_field,
        price: parseFloat(prodMl.price),
        permalink: prodMl.permalink,
        variations: prodMl.variations,
      })),
      switchMap((newProdMl: IProdMlUpdDto) => this.updateProductMl(newProdMl))
    );
  }
}
