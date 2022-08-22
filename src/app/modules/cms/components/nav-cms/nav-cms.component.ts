import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { StoreService } from 'src/app/services/store.service';
import { AuthService } from 'src/app/services/auth.service';
// import { CategoriesService } from 'src/app/services/categories.service';
import { User } from 'src/models/user.model';
// import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'nav-cms',
  templateUrl: './nav-cms.component.html',
  styleUrls: ['./nav-cms.component.scss'],
})
export class NavCmsComponent implements OnInit {
  activeMenu = false;

  counter = 0;
  profile: User | null = null;
  // categories: Category[] = [];

  constructor(
    // private storeService: StoreService,
    private authService: AuthService,
    // private categoriesService: CategoriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.storeService.myCart$.subscribe((products) => {
    //   this.counter = products.length;
    // });
    // this.getAllCategories();
    this.authService.user$.subscribe((data) => (this.profile = data));
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
    console.log('Toggle', this.activeMenu);
  }

  login() {
    this.authService
      .loginAndGetProfile('admin@mail.com', 'admin123')
      .subscribe(() => {
        this.router.navigate(['/profile']);
      });
  }

  logout() {
    this.authService.logout();
    this.profile = null;
    this.router.navigate(['/login']);
  }

  goProfile() {
    this.router.navigate(['profile']);
  }

  // getAllCategories() {
  //   this.categoriesService
  //     .getAll()
  //     .subscribe((data) => (this.categories = data));
  // }
}
