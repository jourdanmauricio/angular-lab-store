import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from '@core/_animations';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IAuthState } from '@models/index';
import { Logout } from 'app/store/auth/auth.actions';
import { AuthState } from 'app/store/auth/auth.state';

@Component({
  selector: 'app-nav-home',
  templateUrl: './nav-home.component.html',
  styleUrls: ['./nav-home.component.scss'],
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' },
})
export class NavHomeComponent implements OnInit {
  activeMenu = false;
  counter = 0;

  constructor(
    private authService: AuthService,
    private store: Store,
    private router: Router
  ) {}

  @Select(AuthState) user$!: Observable<IAuthState>;
  @Select(AuthState.isAuthenticated) isAuthenticated$!: Observable<boolean>;

  ngOnInit(): void {}

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login() {
    this.router.navigate(['auth/login']);
  }

  logout() {
    this.store.dispatch(new Logout());
  }

  goProfile() {
    this.router.navigate(['profile']);
  }
}
