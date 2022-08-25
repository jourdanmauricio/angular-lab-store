import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmsRoutingModule } from './cms-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LayoutComponent } from './components/layout/layout.component';
import { NavCmsComponent } from './components/nav-cms/nav-cms.component';
import { UsersComponent } from './pages/users/users.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { QuestionsComponent } from './pages/questions/questions.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ConfMlComponent } from './components/settings/conf-ml/conf-ml.component';
import { MeliCallbackComponent } from '../website/pages/meli-callback/meli-callback.component';

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
    MeliCallbackComponent,
  ],
  imports: [CommonModule, CmsRoutingModule, SharedModule],
})
export class CmsModule {}
