import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';

// Shared Modules
import { SharedModule } from '../../../shared/shared.module';
import { MaterialModule } from '../../../material/material.module';

import { ProductsComponent } from './products.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { TitleComponent } from './components/title/title.component';
import { SkuComponent } from './components/sku/sku.component';
import { CategoryComponent } from './components/category/category.component';
import { CategorySearchComponent } from './components/category-search/category-search.component';
import { CategoryPredictorComponent } from './components/category-predictor/category-predictor.component';
import { CategoryUsedComponent } from './components/category-used/category-used.component';
import { CategoryTreeComponent } from './components/category-tree/category-tree.component';
import { PropertiesComponent } from './components/properties/properties.component';
// import { AppModule } from 'src/app/app.module';

@NgModule({
  declarations: [
    ProductsComponent,
    EditProductComponent,
    TitleComponent,
    SkuComponent,
    CategoryComponent,
    CategorySearchComponent,
    CategoryPredictorComponent,
    CategoryUsedComponent,
    CategoryTreeComponent,
    PropertiesComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    MaterialModule,
    // AppModule,
  ],
})
export class ProductsModule {}
