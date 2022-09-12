import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebsiteRoutingModule } from './website-routing.module';

// Shared Modules
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '../material/material.module';
// Pages
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { RecoveryPasswordComponent } from './pages/recovery-password/recovery-password.component';
import { MeliCallbackComponent } from './pages/meli-callback/meli-callback.component';
import { ProfileComponent } from './pages/profile/profile.component';
// Components
import { LayoutComponent } from './components/layout/layout.component';
import { NavHomeComponent } from './components/nav-home/nav-home.component';
import { ChangePasswordDialogComponent } from './components/change-password-dialog/change-password-dialog.component';

@NgModule({
  declarations: [
    HomeComponent,
    LayoutComponent,
    LoginComponent,
    RegisterComponent,
    ChangePasswordDialogComponent,
    RecoveryPasswordComponent,
    MeliCallbackComponent,
    ProfileComponent,
    NavHomeComponent,
  ],
  imports: [WebsiteRoutingModule, CommonModule, MaterialModule, SharedModule], //
})
export class WebsiteModule {}
