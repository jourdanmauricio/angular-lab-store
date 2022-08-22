import { NgModule } from '@angular/core';
import { WebsiteRoutingModule } from './website-routing.module';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
// import { NavHomeComponent } from '../shared/components/nav-home/nav-home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [HomeComponent, LayoutComponent],
  imports: [WebsiteRoutingModule, CommonModule, SharedModule],
})
export class WebsiteModule {}
