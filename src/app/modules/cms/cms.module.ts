import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsRoutingModule } from './cms-routing.module';

// Shared Modules
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
// Pages
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { QuestionsComponent } from './pages/questions/questions.component';
import { OrdersComponent } from './pages/orders/orders.component';
// Components
import { LayoutComponent } from './components/layout/layout.component';
import { NavCmsComponent } from './components/nav-cms/nav-cms.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ModalNewCategoryComponent } from './components/categories/modal-new-category/modal-new-category.component';
import { ModalEditCategoryComponent } from './components/categories/modal-edit-category/modal-edit-category.component';

@NgModule({
  declarations: [
    DashboardComponent,
    LayoutComponent,
    NavCmsComponent,
    UsersComponent,
    QuestionsComponent,
    OrdersComponent,
    CategoriesComponent,
    ModalNewCategoryComponent,
    ModalEditCategoryComponent,
  ],
  imports: [CommonModule, CmsRoutingModule, SharedModule, MaterialModule],
})
export class CmsModule {}
