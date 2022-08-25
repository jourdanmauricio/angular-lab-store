import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'nav-cms',
  templateUrl: './nav-cms.component.html',
  styleUrls: ['./nav-cms.component.scss'],
})
export class NavCmsComponent implements OnInit {
  @Output() menu = new EventEmitter();

  counter = 0;
  profile: User | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((data) => (this.profile = data));
  }

  toggleMenu() {
    this.menu.emit();
  }

  logout() {
    this.authService.logout();
    this.profile = null;
    this.router.navigate(['/login']);
  }

  goProfile() {
    this.router.navigate(['profile']);
  }
}
