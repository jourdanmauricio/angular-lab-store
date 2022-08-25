import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  isExpanded: boolean = true;
  profile: User | null = null;
  showMenu: boolean = true;
  side: 'push' | 'over' | 'side' = 'side';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((data) => (this.profile = data));
    //Total hack
    window.onresize = (e) => {
      this.checkMenu();
    };
    this.checkMenu();
  }

  onToggleMenu() {
    this.showMenu = !this.showMenu;
  }

  checkMenu() {
    var w = window.innerWidth;
    if (w > 768) {
      this.showMenu = true;
      this.side = 'side';
    } else {
      this.showMenu = false;
      this.side = 'over';
    }
  }
}
