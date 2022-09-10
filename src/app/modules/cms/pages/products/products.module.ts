import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';

// Shared Modules
import { SharedModule } from '../../../shared/shared.module';
import { MaterialModule } from '../../../material/material.module';

import { ProductsComponent } from './products.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { TitleComponent } from './components/properties/title/title.component';
import { SkuComponent } from './components/properties/sku/sku.component';
import { CategoryComponent } from './components/category/category.component';
import { CategorySearchComponent } from './components/category/category-search/category-search.component';
import { CategoryPredictorComponent } from './components/category/category-predictor/category-predictor.component';
import { CategoryUsedComponent } from './components/category/category-used/category-used.component';
import { CategoryTreeComponent } from './components/category/category-tree/category-tree.component';
import { PropertiesComponent } from './components/properties/properties.component';
import { VariationsComponent } from './components/properties/variations/variations.component';
import { VariationsCombinationsComponent } from './components/properties/variations/variations-combinations/variations-combinations.component';
import { AddCustomAttribComponent } from './components/properties/variations/add-custom-attrib/add-custom-attrib.component';
import { VariationsTableComponent } from './components/properties/variations/variations-table/variations-table.component';
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
    VariationsComponent,
    VariationsCombinationsComponent,
    AddCustomAttribComponent,
    VariationsTableComponent,
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
