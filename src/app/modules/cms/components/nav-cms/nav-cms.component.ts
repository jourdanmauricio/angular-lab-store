import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Logout } from 'app/store/auth/auth.actions';

@Component({
  selector: 'nav-cms',
  templateUrl: './nav-cms.component.html',
  styleUrls: ['./nav-cms.component.scss'],
})
export class NavCmsComponent implements OnInit {
  @Output() menu = new EventEmitter();

  counter = 0;
  email: string | undefined = undefined;

  constructor(private router: Router, private store: Store) {}

  ngOnInit(): void {
    // this.store.select(getUser).subscribe((user) => (this.email = user?.email));
  }

  toggleMenu() {
    this.menu.emit();
  }

  logout() {
    this.store.dispatch(new Logout());
    this.router.navigate(['/login']);
  }

  goProfile() {
    this.router.navigate(['profile']);
  }
}
