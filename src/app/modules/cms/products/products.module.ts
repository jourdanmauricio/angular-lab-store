import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';

// Shared Modules
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '@modules/material/material.module';

import { ProductsComponent } from './pages/products/products.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
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
import { AttributesComponent } from './components/properties/attributes/attributes.component';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { VarAttributesComponent } from './components/properties/variations/var-attributes/var-attributes.component';
import { VarPicturesComponent } from './components/properties/variations/var-pictures/var-pictures.component';
import { DndDirective } from './components/properties/variations/var-pictures/dnd.directive';
import { FeaturesComponent } from './components/properties/features/features.component';
import { StatusComponent } from './components/properties/status/status.component';
import { QuantityComponent } from './components/properties/quantity/quantity.component';

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
    AttributesComponent,
    VarAttributesComponent,
    VarPicturesComponent,
    DndDirective,
    FeaturesComponent,
    StatusComponent,
    QuantityComponent,
  ],
  imports: [
    NgSelectModule,
    FormsModule,
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
  ],
})
export class ProductsModule {}
