import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmsRoutingModule } from './cms-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LayoutComponent } from './components/layout/layout.component';
import { NavCmsComponent } from './components/nav-cms/nav-cms.component';

@NgModule({
  declarations: [DashboardComponent, LayoutComponent, NavCmsComponent],
  imports: [CommonModule, CmsRoutingModule, SharedModule],
})
export class CmsModule {}
