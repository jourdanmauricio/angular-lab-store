import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from 'src/app/_animations';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { Store } from '@ngrx/store';
import {
  isAuthenticated,
  getUser,
} from 'src/app/state/selectors/user.selector';
import { Observable } from 'rxjs';
import { logout } from 'src/app/state/actions/user.actions';

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
  user: User | null = null;
  isAuthenticated$!: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private store: Store<any>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store.select(getUser).subscribe((user) => (this.user = user));
    this.isAuthenticated$ = this.store.select(isAuthenticated);
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login() {
    this.router.navigate(['login']);
  }

  logout() {
    // dispath logout
    this.store.dispatch(logout());
    // this.authService.logout();
    // this.user = null; //    TODO: ACTION;
    // this.router.navigate(['/home']);
  }

  goProfile() {
    this.router.navigate(['profile']);
  }
}
