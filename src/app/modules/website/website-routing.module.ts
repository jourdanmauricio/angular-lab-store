import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from 'src/app/modules/website/pages/login/login.component';
import { ProfileComponent } from '../shared/components/profile/profile.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
// import { MycartComponent } from './pages/mycart/mycart.component';
// import { RegisterComponent } from './pages/register/register.component';
// import { RecoveryComponent } from './pages/recovery/recovery.component';
// import { ProfileComponent } from './pages/profile/profile.component';
// import { ProductDetailComponent } from './pages/product-detail/product-detail.component';

// import { AuthGuard } from '../guards/auth.guard';
// import { ExitGuard } from '../guards/exit.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      // {
      //   path: 'category',
      //   loadChildren: () =>
      //     import('./pages/category/category.module').then(
      //       (m) => m.CategoryModule
      //     ),
      // },
      // {
      //   path: 'product/:id',
      //   component: ProductDetailComponent,
      // },
      // {
      //   path: 'my-cart',
      //   component: MycartComponent,
      // },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'profile',
        // canActivate: [AuthGuard],
        component: ProfileComponent,
      },
      // {
      //   path: 'register',
      //   canDeactivate: [ExitGuard],
      //   component: RegisterComponent,
      // },
      // {
      //   path: 'recovery',
      //   component: RecoveryComponent,
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebsiteRoutingModule {}
