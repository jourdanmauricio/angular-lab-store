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

@NgModule({
  declarations: [ProductsComponent, EditProductComponent, TitleComponent, SkuComponent],
  imports: [CommonModule, ProductsRoutingModule, SharedModule, MaterialModule],
})
export class ProductsModule {}
