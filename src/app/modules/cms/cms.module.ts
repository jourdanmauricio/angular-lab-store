import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsRoutingModule } from './cms-routing.module';

// Shared Modules
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
// Pages
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { QuestionsComponent } from './pages/questions/questions.component';
import { OrdersComponent } from './pages/orders/orders.component';
// Components
import { LayoutComponent } from './components/layout/layout.component';
import { NavCmsComponent } from './components/nav-cms/nav-cms.component';
import { ConfMlComponent } from './components/settings/conf-ml/conf-ml.component';

@NgModule({
  declarations: [
    DashboardComponent,
    LayoutComponent,
    NavCmsComponent,
    UsersComponent,
    SettingsComponent,
    QuestionsComponent,
    OrdersComponent,
    ConfMlComponent,
  ],
  imports: [CommonModule, CmsRoutingModule, SharedModule, MaterialModule], // , MaterialModule
})
export class CmsModule {}
