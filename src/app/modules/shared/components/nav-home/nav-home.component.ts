import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';
import { AuthService } from 'src/app/services/auth.service';
// import { CategoriesService } from 'src/app/services/categories.service';
import { User } from 'src/models/user.model';
// import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-nav-home',
  templateUrl: './nav-home.component.html',
  styleUrls: ['./nav-home.component.scss'],
})
export class NavHomeComponent implements OnInit {
  activeMenu = false;

  counter = 0;
  profile: User | null = null;
  // categories: Category[] = [];

  constructor(
    private storeService: StoreService,
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
  }

  login() {
    this.router.navigate(['login']);
  }

  logout() {
    this.authService.logout();
    this.profile = null;
    this.router.navigate(['/home']);
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
