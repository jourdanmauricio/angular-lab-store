import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { AuthStateModel, Logout } from 'app/store/auth/auth.actions';
import { AuthState } from 'app/store/auth/auth.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'nav-cms',
  templateUrl: './nav-cms.component.html',
  styleUrls: ['./nav-cms.component.scss'],
})
export class NavCmsComponent implements OnInit {
  @Output() menu = new EventEmitter();

  counter = 0;
  @Select(AuthState) user$!: Observable<AuthStateModel>;

  constructor(private router: Router, private store: Store) {}

  ngOnInit(): void {}

  toggleMenu() {
    this.menu.emit();
  }

  logout() {
    this.store.dispatch(new Logout());
    this.router.navigate(['/home']);
  }

  goProfile() {
    this.router.navigate(['profile']);
  }
}
