import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { MaterialModule } from '../../material/material.module';
import { SharedModule } from '@shared/shared.module';
// Components
import { CategoriesComponent } from './pages/categories/categories.component';
import { ModalEditCategoryComponent } from './components/modal-edit-category/modal-edit-category.component';
import { ModalNewCategoryComponent } from './components/modal-new-category/modal-new-category.component';

@NgModule({
  declarations: [
    CategoriesComponent,
    ModalEditCategoryComponent,
    ModalNewCategoryComponent,
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    MaterialModule,
    SharedModule,
  ],
})
export class CategoriesModule {}
