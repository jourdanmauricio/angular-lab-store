import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from 'src/app/_animations';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' },
})
export class LayoutComponent implements OnInit {
  isExpanded: boolean = true;
  showMenu: boolean = true;
  side: 'push' | 'over' | 'side' = 'side';

  constructor(private usersService: UsersService) {}
  ngOnInit(): void {
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
