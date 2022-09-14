import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsRoutingModule } from './cms-routing.module';

// Shared Modules
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '@modules/material/material.module';
// Pages
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { QuestionsComponent } from './pages/questions/questions.component';
import { OrdersComponent } from './pages/orders/orders.component';
// Components
import { LayoutComponent } from './components/layout/layout.component';
import { NavCmsComponent } from './components/nav-cms/nav-cms.component';

@NgModule({
  declarations: [
    DashboardComponent,
    LayoutComponent,
    NavCmsComponent,
    UsersComponent,
    QuestionsComponent,
    OrdersComponent,
  ],
  imports: [CommonModule, CmsRoutingModule, MaterialModule, SharedModule], //
})
export class CmsModule {}
