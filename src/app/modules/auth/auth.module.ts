import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '@shared/shared.module';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RecoveryPasswordComponent } from './pages/recovery-password/recovery-password.component';
import { MeliCallbackComponent } from './pages/meli-callback/meli-callback.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    RecoveryPasswordComponent,
    MeliCallbackComponent,
  ],
  imports: [CommonModule, AuthRoutingModule, MaterialModule, SharedModule],
})
export class AuthModule {}
