import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/website/pages/login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AdminGuard } from './guards/admin.guard';
import { LayoutComponent } from './modules/website/components/layout/layout.component';
import { ProfileComponent } from './modules/shared/components/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/website/website.module').then((m) => m.WebsiteModule),
  },
  { path: 'login', component: LoginComponent },
  // { path: 'profile', component: ProfileComponent },
  {
    path: 'cms',
    canActivate: [AdminGuard],
    loadChildren: () =>
      import('./modules/cms/cms.module').then((m) => m.CmsModule),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
