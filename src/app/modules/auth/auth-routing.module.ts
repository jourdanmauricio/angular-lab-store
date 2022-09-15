import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeliCallbackComponent } from './pages/meli-callback/meli-callback.component';
import { RecoveryPasswordComponent } from './pages/recovery-password/recovery-password.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        // canDeactivate: [ExitGuard],
        component: RegisterComponent,
      },
      {
        path: 'recovery-password',
        component: RecoveryPasswordComponent,
      },
      {
        path: 'meli-callback',
        component: MeliCallbackComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
