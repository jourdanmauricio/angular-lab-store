import { NgModule } from '@angular/core';
import { WebsiteRoutingModule } from './website-routing.module';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './pages/register/register.component';
import { ChangePasswordDialogComponent } from './components/change-password-dialog/change-password-dialog.component';
import { RecoveryPasswordComponent } from './pages/recovery-password/recovery-password.component';

@NgModule({
  declarations: [HomeComponent, LayoutComponent, RegisterComponent, ChangePasswordDialogComponent, RecoveryPasswordComponent],
  imports: [WebsiteRoutingModule, CommonModule, SharedModule],
})
export class WebsiteModule {}
