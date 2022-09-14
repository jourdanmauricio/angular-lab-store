import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';

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
      {
        path: 'auth',
        loadChildren: () =>
          import('../../modules/auth/auth.module').then((m) => m.AuthModule),
      },
      {
        path: 'profile',
        // canActivate: [AuthGuard],
        component: ProfileComponent,
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebsiteRoutingModule {}
